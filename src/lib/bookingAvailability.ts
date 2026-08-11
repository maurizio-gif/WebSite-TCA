// Converte i parametri di prenotazione dell'entry CMS "moduli" (date come
// oggetti Date, gestite da Astro Content Collections) in un oggetto
// serializzabile in JSON da passare al client script via attributo data-*.
// Usato da LeadModal.astro e LeadFormInline.astro.

// I campi arrivano opzionali dal tipo generato da astro:content per la
// collection "moduli" (vale anche per gli altri campi esistenti, es.
// camp_quota_soci): i fallback qui sotto rispecchiano quelli richiesti in
// Tina, così il form resta funzionante anche se un valore non fosse ancora
// stato compilato.
interface ModuliData {
  prenotazioni_data_inizio?: Date;
  prenotazioni_ora_apertura?: string;
  prenotazioni_ora_chiusura?: string;
  prenotazioni_durata_slot_richiamata?: number;
  prenotazioni_durata_slot_visita?: number;
  prenotazioni_giorni_avanti_richiamata?: number;
  prenotazioni_giorni_avanti_visita?: number;
  prenotazioni_date_chiuse?: Date[];
}

function isoDate(d: Date): string {
  return d.toISOString().split('T')[0];
}

export function bookingAvailability(d: ModuliData) {
  return {
    dataInizio: isoDate(d.prenotazioni_data_inizio ?? new Date(2026, 7, 8)),
    oraApertura: d.prenotazioni_ora_apertura ?? '10:30',
    oraChiusura: d.prenotazioni_ora_chiusura ?? '19:00',
    durataRichiamata: d.prenotazioni_durata_slot_richiamata ?? 20,
    durataVisita: d.prenotazioni_durata_slot_visita ?? 30,
    giorniRichiamata: d.prenotazioni_giorni_avanti_richiamata ?? 7,
    giorniVisita: d.prenotazioni_giorni_avanti_visita ?? 14,
    dateChiuse: (d.prenotazioni_date_chiuse ?? [new Date(2026, 7, 15)]).map(isoDate),
  };
}
