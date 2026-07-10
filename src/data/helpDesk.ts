// ─────────────────────────────────────────────────────────────────────────
// Help Desk — categorie della knowledge base "Club Life".
// Gli articoli vivono in src/content/helpdesk/ (collection 'helpdesk',
// gestibile da TinaCMS); qui restano solo le categorie, legate ai filtri
// del componente ClubLifeHelpDesk e al campo `categoria` della collection.
// Se aggiungi una categoria, aggiornala anche in tina/config.ts e
// src/content/config.ts.
// ─────────────────────────────────────────────────────────────────────────

export interface HelpDeskCategory {
  id: string;
  label: string;
  label_en: string;
}

export const helpDeskCategories: HelpDeskCategory[] = [
  { id: 'iscrizioni',   label: 'Iscrizioni & Tesseramento',  label_en: 'Membership & Registration' },
  { id: 'prenotazioni', label: 'Prenotazioni',               label_en: 'Bookings' },
  { id: 'app',          label: 'App & Area Riservata',       label_en: 'App & Member Area' },
  { id: 'pagamenti',    label: 'Pagamenti & Ricevute',       label_en: 'Payments & Receipts' },
  { id: 'regolamento',  label: 'Regolamento',                label_en: 'Club Rules' },
  { id: 'scuola',       label: 'Scuola Tennis',              label_en: 'Tennis School' },
];
