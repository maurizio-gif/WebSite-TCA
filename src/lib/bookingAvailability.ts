// Converte l'entry CMS "disponibilita" (appuntamenti.md) in un oggetto
// serializzabile in JSON, passato al client script via attributo data-* da
// LeadModal.astro e LeadFormInline.astro.
//
// Nel CMS gli orari sono espressi in forma leggibile per chi li compila
// (giorno della settimana come 'lun'…'dom', date come oggetti Date gestiti da
// Astro Content Collections). Qui diventano la forma comoda per il client:
// orari indicizzati per Date.getDay() (0 = domenica) ed eccezioni/chiusure
// indicizzate per data ISO "YYYY-MM-DD".
//
// I campi arrivano opzionali dal tipo generato da astro:content: i fallback
// riproducono la configurazione storica (tutti i giorni 10:30–19:00, slot da
// 20' per la richiamata e 30' per la visita), così il form resta funzionante
// anche se una voce non fosse ancora stata compilata.

export interface Fascia {
  dalle: string;
  alle: string;
}

// In ingresso ogni campo può mancare: il tipo generato da astro:content li dà
// tutti opzionali, e nel CMS una riga appena aggiunta è effettivamente vuota
// finché non la si compila.
interface FasciaInput {
  dalle?: string | null;
  alle?: string | null;
}

interface OrarioGiorno {
  giorno?: 'lun' | 'mar' | 'mer' | 'gio' | 'ven' | 'sab' | 'dom' | null;
  fasce?: (FasciaInput | null)[] | null;
}

interface Eccezione {
  data?: Date | null;
  nota?: string | null;
  fasce?: (FasciaInput | null)[] | null;
}

interface TipoAppuntamento {
  attivo?: boolean | null;
  data_inizio?: Date | null;
  giorni_avanti?: number | null;
  durata_slot?: number | null;
  orari?: (OrarioGiorno | null)[] | null;
  eccezioni?: (Eccezione | null)[] | null;
}

interface DisponibilitaData {
  telefonico?: TipoAppuntamento | null;
  sede?: TipoAppuntamento | null;
  chiusure?: ({ data?: Date | null; nota?: string | null } | null)[] | null;
}

export interface TipoAppuntamentoJSON {
  attivo: boolean;
  dataInizio: string;
  giorniAvanti: number;
  durataSlot: number;
  /** Fasce orarie per indice Date.getDay() — 0 = domenica. Giorno assente = chiuso. */
  orari: Record<number, Fascia[]>;
  /** Fasce che sostituiscono quelle settimanali su una data. Array vuoto = chiuso. */
  eccezioni: Record<string, Fascia[]>;
}

export interface BookingAvailability {
  telefonico: TipoAppuntamentoJSON;
  sede: TipoAppuntamentoJSON;
  chiusure: string[];
}

// Indici di Date.getDay(): domenica = 0.
const GIORNO_INDEX: Record<string, number> = {
  dom: 0, lun: 1, mar: 2, mer: 3, gio: 4, ven: 5, sab: 6,
};

const DEFAULT_DATA_INIZIO = new Date(Date.UTC(2026, 7, 8));
const DEFAULT_FASCIA: Fascia = { dalle: '10:30', alle: '19:00' };

function isoDate(d: Date): string {
  return d.toISOString().split('T')[0];
}

// Scarta le fasce incomplete (un campo lasciato vuoto nel CMS): meglio
// ignorarle che generare slot con orari indefiniti.
function fasceValide(fasce: (FasciaInput | null)[] | null | undefined): Fascia[] {
  return (fasce ?? [])
    .filter((f): f is { dalle: string; alle: string } => !!f && !!f.dalle && !!f.alle)
    .map((f) => ({ dalle: f.dalle, alle: f.alle }));
}

// Tutti i giorni della settimana aperti sulla fascia indicata: è la
// configurazione usata finora, e resta il comportamento se il CMS non
// specifica orari.
function orariDefault(): Record<number, Fascia[]> {
  const orari: Record<number, Fascia[]> = {};
  for (let g = 0; g < 7; g++) orari[g] = [{ ...DEFAULT_FASCIA }];
  return orari;
}

function tipo(d: TipoAppuntamento | null | undefined, durataDefault: number, giorniDefault: number): TipoAppuntamentoJSON {
  const orariCms = (d?.orari ?? []).filter((o): o is OrarioGiorno => !!o && !!o.giorno);

  let orari: Record<number, Fascia[]>;
  if (orariCms.length === 0) {
    orari = orariDefault();
  } else {
    orari = {};
    for (const o of orariCms) {
      const idx = GIORNO_INDEX[o.giorno as string];
      if (idx === undefined) continue;
      // Più voci per lo stesso giorno: le fasce si sommano invece di
      // sovrascriversi, così duplicare una riga per errore non fa sparire orari.
      orari[idx] = (orari[idx] ?? []).concat(fasceValide(o.fasce));
    }
  }

  const eccezioni: Record<string, Fascia[]> = {};
  for (const e of d?.eccezioni ?? []) {
    if (!e || !e.data) continue;
    eccezioni[isoDate(e.data)] = fasceValide(e.fasce);
  }

  return {
    attivo: d?.attivo ?? true,
    dataInizio: isoDate(d?.data_inizio ?? DEFAULT_DATA_INIZIO),
    giorniAvanti: d?.giorni_avanti ?? giorniDefault,
    durataSlot: d?.durata_slot ?? durataDefault,
    orari,
    eccezioni,
  };
}

export function bookingAvailability(d: DisponibilitaData): BookingAvailability {
  return {
    telefonico: tipo(d.telefonico, 20, 7),
    sede: tipo(d.sede, 30, 14),
    chiusure: (d.chiusure ?? [])
      .filter((c): c is { data: Date } => !!c && !!c.data)
      .map((c) => isoDate(c.data)),
  };
}
