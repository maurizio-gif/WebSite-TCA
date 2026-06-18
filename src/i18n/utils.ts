import { it } from './it';
import { en } from './en';

export type Lang = 'it' | 'en';

const translations = { it, en } as const;

/** Rileva la lingua dall'URL (pathname). */
export function getLangFromUrl(url: URL): Lang {
  const segments = url.pathname.split('/').filter(Boolean);
  // Con GitHub Pages base '/WebSite-TCA', il primo segmento può essere 'WebSite-TCA'
  // quindi controlliamo sia il primo che il secondo
  if (segments[0] === 'en' || segments[1] === 'en') return 'en';
  return 'it';
}

/** Restituisce l'oggetto traduzioni per la lingua data. */
export function useTranslations(lang: Lang) {
  return translations[lang];
}

/**
 * Restituisce il path localizzato.
 * IT  → path invariato  (es. '/tennis')
 * EN  → '/en' + path    (es. '/en/tennis')
 */
export function getLocalePath(lang: Lang, path: string): string {
  if (lang === 'it') return path;
  const clean = path === '/' ? '' : path;
  return `/en${clean}`;
}

/**
 * Dato il pathname corrente (senza base), calcola i path
 * per lo switcher IT ↔ EN.
 */
export function getAlternatePath(pathname: string): { it: string; en: string } {
  // Normalizza: rimuovi eventuale trailing slash (tranne root)
  const p = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;

  if (p.startsWith('/en')) {
    const itPath = p.slice(3) || '/';
    return { it: itPath, en: p };
  }
  const enPath = p === '/' ? '/en' : `/en${p}`;
  return { it: p, en: enPath };
}
