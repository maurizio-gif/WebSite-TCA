// ─────────────────────────────────────────────────────────────────────────
// Link verso piattaforme esterne — unica fonte di verità per ogni URL che
// punta a un servizio di terze parti (PerfectGym, Playtomic, store app).
// Centralizzati qui: un cambio di URL richiede una modifica in un solo
// file invece di un find-and-replace nel codice.
// ─────────────────────────────────────────────────────────────────────────

const PERFECTGYM_PORTAL = 'https://tcambrosiano.perfectgym.com/clientportal2';

// Dominio di produzione del pannello: è `crm.`, non `app.`. Il sottodominio
// sbagliato non fa errore visibile — la fetch di disponibilità muore in DNS e
// fetchOccupati (src/lib/leadForm.client.js) ripiega volutamente su "nessuno
// slot occupato", quindi il form torna a offrire anche gli orari già presi in
// agenda senza che nulla lo segnali.
// Sovrascrivibile con PUBLIC_APPTCA_URL in un .env locale (gitignorato): serve
// a puntare il form eventi al CRM in esecuzione in locale, altrimenti l'unico
// modo di provare il flusso completo sarebbe deployare. In produzione la
// variabile non c'è e vale il dominio reale.
const APPTCA_URL = import.meta.env.PUBLIC_APPTCA_URL ?? 'https://crm.tcambrosiano.com';

export const appTca = {
  // Endpoint pubblico e senza autenticazione (AppTCA/app/api/disponibilita):
  // risponde solo con data/ora/durata degli impegni già in agenda, mai dati
  // personali. Usato dal form di richiamata/visita per non offrire in
  // prenotazione un orario già occupato (vedi src/lib/leadForm.client.js).
  disponibilita: `${APPTCA_URL}/api/disponibilita`,

  // Prenotazione eventi (AppTCA/app/api/eventi/*), usata da
  // src/lib/eventoForm.client.js. Anche questi endpoint sono pubblici e non
  // restituiscono mai dati personali: la disponibilità è solo un conteggio di
  // posti, la verifica risponde con il solo bit "questa email è socio" (lo
  // stesso che il webhook n8n del form contatti già restituisce), e la
  // prenotazione rilegge quota e capienza lato server invece di fidarsi del
  // browser.
  eventi: {
    disponibilita: (slug: string) => `${APPTCA_URL}/api/eventi/${encodeURIComponent(slug)}/disponibilita`,
    verifica: `${APPTCA_URL}/api/eventi/verifica`,
    prenotazione: `${APPTCA_URL}/api/eventi/prenotazione`,
  },
};

export const perfectGym = {
  login: `${PERFECTGYM_PORTAL}/#/Login`,
  register: `${PERFECTGYM_PORTAL}/#/Registration`,
  classBooking: (lang: 'it' | 'en' = 'it') => `${PERFECTGYM_PORTAL}/?lang=${lang}#/Classes/1/Calendar`,
};

export const playtomic = {
  club: 'https://playtomic.com/clubs/club-ambrosiano-tennis',
  tennisCourt: 'https://playtomic.io/tennis-club-ambrosiano/5440b3ab-1500-4d62-8c9b-6a8b96949501?q=TENNIS~2022-12-08~~~',
  padelCourt: 'https://playtomic.io/club-ambrosiano-padel/3c5b3aaa-85e7-41dc-838e-e72899aae1cd?q=PADEL~2024-10-23~~~',
};

export const memberApp = {
  // Smart link OneLink: risolve automaticamente su App Store o Google Play
  smartLink: 'https://onelink.to/7vfvz2',
  appleUrl: 'https://apps.apple.com/it/app/club-ambrosiano/id1583896957',
  androidUrl: 'https://play.google.com/store/apps/details?id=com.perfectgym.perfectgymgo2.ambrosiano',
};
