// ─────────────────────────────────────────────────────────────────────────
// Link verso piattaforme esterne — unica fonte di verità per ogni URL che
// punta a un servizio di terze parti (PerfectGym, Playtomic, store app).
// Centralizzati qui: un cambio di URL richiede una modifica in un solo
// file invece di un find-and-replace nel codice.
// ─────────────────────────────────────────────────────────────────────────

const PERFECTGYM_PORTAL = 'https://tcambrosiano.perfectgym.com/clientportal2';

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
