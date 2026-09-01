// Converte i parametri di prenotazione dell'entry CMS "moduli" (gruppo
// "Appuntamenti e disponibilità", con le date come oggetti Date gestite da
// Astro Content Collections) in un oggetto serializzabile in JSON da passare
// al client script via attributo data-*.
// Usato da LeadModal.astro e LeadFormInline.astro.

// I campi arrivano opzionali dal tipo generato da astro:content per la
// collection "moduli" (vale anche per gli altri campi esistenti, es.
// camp_quota_soci): i fallback qui sotto rispecchiano quelli richiesti in
// Tina, così il form resta funzionante anche se un valore non fosse ancora
// stato compilato.
interface Appuntamenti {
  data_inizio?: Date;
  ora_apertura?: string;
  ora_chiusura?: string;
  preavviso_minimo_ore?: number;
  durata_slot_richiamata?: number;
  durata_slot_visita?: number;
  giorni_avanti_richiamata?: number;
  giorni_avanti_visita?: number;
  date_chiuse?: Date[];
}

interface ModuliData {
  appuntamenti?: Appuntamenti;
}

function isoDate(d: Date): string {
  return d.toISOString().split('T')[0];
}

export function bookingAvailability(m: ModuliData) {
  const d = m.appuntamenti ?? {};
  return {
    dataInizio: isoDate(d.data_inizio ?? new Date(2026, 7, 8)),
    oraApertura: d.ora_apertura ?? '10:30',
    oraChiusura: d.ora_chiusura ?? '19:00',
    // Preavviso minimo espresso in minuti per il client (in Tina è in ore).
    preavvisoMinuti: (d.preavviso_minimo_ore ?? 2) * 60,
    durataRichiamata: d.durata_slot_richiamata ?? 20,
    durataVisita: d.durata_slot_visita ?? 30,
    giorniRichiamata: d.giorni_avanti_richiamata ?? 7,
    giorniVisita: d.giorni_avanti_visita ?? 14,
    dateChiuse: (d.date_chiuse ?? [new Date(2026, 7, 15)]).map(isoDate),
  };
}
