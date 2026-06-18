import { it } from './it';
import { en } from './en';

export type Lang = 'it' | 'en';

const translations = { it, en } as const;

/** Base URL senza trailing slash (es. '/WebSite-TCA' su GitHub Pages, '' su Netlify). */
const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');

/** Rileva la lingua dall'URL (pathname). */
export function getLangFromUrl(url: URL): Lang {
  const segments = url.pathname.split('/').filter(Boolean);
  // Con base '/WebSite-TCA' il segmento 0 è 'WebSite-TCA', il lang è al posto 1
  if (segments[0] === 'en' || segments[1] === 'en') return 'en';
  return 'it';
}

/** Restituisce l'oggetto traduzioni per la lingua data. */
export function useTranslations(lang: Lang) {
  return translations[lang];
}

/**
 * Restituisce il path localizzato CON base prefix (pronto per href).
 * IT + '/'        → '/WebSite-TCA/'   (o '/' su Netlify)
 * IT + '/tennis'  → '/WebSite-TCA/tennis'
 * EN + '/tennis'  → '/WebSite-TCA/en/tennis'
 */
export function getLocalePath(lang: Lang, path: string): string {
  const localePath = lang === 'it' ? path : `/en${path === '/' ? '' : path}`;
  if (localePath === '/') return base ? `${base}/` : '/';
  return `${base}${localePath}`;
}

/**
 * Prepende il base path a un path di public/ (immagini, loghi…).
 * '/logos/tca-logo.png' → '/WebSite-TCA/logos/tca-logo.png'
 */
export function publicUrl(path: string): string {
  return `${base}${path}`;
}

/**
 * Dato il pathname PULITO (senza base), restituisce i path
 * alternativi IT e EN (anch'essi senza base) per lo switcher.
 */
export function getAlternatePath(pathname: string): { it: string; en: string } {
  const p = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
  if (p.startsWith('/en')) {
    const itPath = p.slice(3) || '/';
    return { it: itPath, en: p };
  }
  const enPath = p === '/' ? '/en' : `/en${p}`;
  return { it: p, en: enPath };
}
