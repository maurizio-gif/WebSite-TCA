import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';
import fs from 'node:fs';
import path from 'node:path';
import { it } from '../i18n/it';
import { perfectGym } from '../data/links';

// Feed dei contenuti pubblicati, generato dalla build per il CRM
// (AppTCA → /dashboard/newsletter, lib/newsletter.ts).
//
// Il sito è statico: il CRM non può interrogare i .md di src/content/, quindi
// la build pubblica qui — in una sola risposta — news, eventi, servizi, promo
// e pagine già normalizzati (titolo, data, sintesi, paragrafi del corpo,
// immagine e URL assoluti, CTA). Da lì la segreteria compone la newsletter
// scegliendo le voci una per una, senza toccare né il sito né l'AI.
//
// Perché i paragrafi e non il markdown: chi monta l'email deve poter dire
// "di questa news prendo i primi due capoversi". Il corpo arriva quindi già
// ripulito dal markdown e spezzato in capoversi, pronti da selezionare.
//
// Solo italiano: la newsletter del club esce in italiano (i campi _en del
// sito restano al sito). Se un giorno servisse la versione EN, si aggiunge
// qui un secondo blocco di voci, senza cambiare il CRM.

const ESTENSIONI_EMAIL_SAFE = ['.jpg', '.jpeg', '.png', '.gif'];
const DIR_PUBLIC = path.resolve('public');

// Un percorso già codificato ('%20') non corrisponde al nome del file su
// disco: si decodifica per cercarlo, e si ricodifica per pubblicarne l'URL.
// Su una stringa non codificata decodeURIComponent è innocuo, tranne quando
// contiene un '%' isolato — in quel caso lancia, e si tiene l'originale.
function decodifica(percorso: string): string {
  try {
    return decodeURIComponent(percorso);
  } catch {
    return percorso;
  }
}

// Le immagini del sito sono spesso .avif/.webp: perfette sul sito, invisibili
// in Outlook e in gran parte dei client di posta. Quando accanto al file c'è
// lo stesso scatto in .jpg/.png (è il caso di diverse foto in public/) la
// newsletter usa quello; altrimenti la voce parte segnalata come non sicura e
// il CRM lascia scegliere un'altra immagine.
function immagineEmail(percorso: string): { percorso: string; sicura: boolean } {
  // I percorsi salvati da Tina sono a volte già codificati per l'URL
  // ('/Tennis%20Adulti.avif'): senza decodificarli il file non si trova su
  // disco e il gemello .jpg accanto resterebbe invisibile. Il percorso torna
  // decodificato, e la codifica per l'URL la applica urlImmagine().
  const decodificato = decodifica(percorso);
  const estensione = path.extname(decodificato).toLowerCase();
  if (ESTENSIONI_EMAIL_SAFE.includes(estensione)) return { percorso: decodificato, sicura: true };

  const senzaEstensione = decodificato.slice(0, decodificato.length - estensione.length);
  for (const alternativa of ESTENSIONI_EMAIL_SAFE) {
    const candidato = `${senzaEstensione}${alternativa}`;
    if (fs.existsSync(path.join(DIR_PUBLIC, candidato.replace(/^\//, '')))) {
      return { percorso: candidato, sicura: true };
    }
  }
  return { percorso: decodificato, sicura: false };
}

// Elenco delle foto già pubblicate sul sito e utilizzabili in email: serve
// alle voci che non hanno un'immagine propria (eventi, promo), così la
// segreteria ne sceglie una senza dover caricare file da nessuna parte.
function galleriaEmailSafe(): string[] {
  if (!fs.existsSync(DIR_PUBLIC)) return [];
  return fs
    .readdirSync(DIR_PUBLIC, { withFileTypes: true })
    .filter((voce) => voce.isFile() && ESTENSIONI_EMAIL_SAFE.includes(path.extname(voce.name).toLowerCase()))
    .map((voce) => `/${voce.name}`)
    .sort((a, b) => a.localeCompare(b, 'it'));
}

// Da markdown a capoversi di testo semplice. Copre i costrutti che il
// marketing usa davvero da Tina (titoli, liste, grassetto, link, immagini,
// citazioni): il resto viene ripulito, perché in email quel testo finisce
// dentro un <p> costruito dal CRM, non in un renderer markdown.
function paragrafiDaMarkdown(corpo: string | undefined): string[] {
  if (!corpo) return [];
  return corpo
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .split(/\n\s*\n/)
    .map((blocco) =>
      blocco
        .split('\n')
        .map((riga) =>
          riga
            .trim()
            .replace(/^#{1,6}\s+/, '')
            .replace(/^>\s?/, '')
            .replace(/^[-*+]\s+/, '• ')
            .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
            .replace(/(\*\*|__)(.*?)\1/g, '$2')
            .replace(/(\*|_)(.*?)\1/g, '$2')
            .replace(/`([^`]+)`/g, '$1')
            // Caratteri protetti in markdown (\* per un asterisco letterale):
            // senza questo il backslash finirebbe nel testo dell'email.
            .replace(/\\([\\`*_{}\[\]()#+\-.!>])/g, '$1')
        )
        .filter(Boolean)
        .join(' ')
        .replace(/\s{2,}/g, ' ')
        .trim()
    )
    .filter(Boolean);
}

type Voce = {
  id: string;
  tipo: 'news' | 'evento' | 'servizio' | 'promo' | 'pagina';
  titolo: string;
  categoria: string | null;
  data: string | null;
  sintesi: string;
  paragrafi: string[];
  luogo: string | null;
  immagine: string | null;
  immagineAlt: string | null;
  immagineEmailSafe: boolean;
  url: string;
  ctaLabel: string | null;
  ctaHref: string | null;
  note: string | null;
};

// Pagine offerte come link nella newsletter (il "vai a vedere sul sito"):
// solo quelle che il marketing linka davvero, non tutte le rotte del sito.
const PAGINE_LINKABILI = [
  'iscrizioni',
  'scuola-tennis',
  'padel',
  'tennis',
  'preparazione-atletica',
  'summer-camps',
  'club-life',
  'planning',
  'torneo-avvenire',
  'personal-trainer',
  'contatti',
] as const;

export const GET: APIRoute = async ({ site }) => {
  // Stesso ragionamento del manifest eventi: gli URL finiscono in un'email
  // già spedita, quindi devono essere assoluti e puntare al sito da cui il
  // contenuto arriva (produzione o preview GitHub Pages, base incluso).
  const origine = (site?.toString() ?? 'https://www.tcambrosiano.com').replace(/\/+$/, '');
  const base = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '');
  const assoluto = (percorso: string) => `${origine}${base}${percorso}`;
  // Le foto del Club hanno nomi con spazi e parentesi ('/DSC07297 (2).jpg'):
  // in un src di email uno spazio non codificato rompe l'immagine in diversi
  // client, quindi l'URL delle immagini si pubblica sempre codificato.
  const urlImmagine = (percorso: string) => `${origine}${base}${encodeURI(decodifica(percorso))}`;

  const voci: Voce[] = [];

  // ── News ────────────────────────────────────────────────────────────────
  const news = await getCollection('news', ({ data }) => data.pubblicato);
  for (const entry of news) {
    const foto = immagineEmail(entry.data.immagine);
    voci.push({
      id: `news:${entry.slug}`,
      tipo: 'news',
      titolo: entry.data.titolo,
      categoria: entry.data.categoria,
      data: entry.data.data.toISOString(),
      sintesi: entry.data.sintesi,
      paragrafi: paragrafiDaMarkdown(entry.body),
      luogo: null,
      immagine: urlImmagine(foto.percorso),
      immagineAlt: entry.data.immagine_alt,
      immagineEmailSafe: foto.sicura,
      url: assoluto(`/news/${entry.slug}`),
      ctaLabel: entry.data.cta_label ?? null,
      ctaHref: entry.data.cta_href
        ? entry.data.cta_href.startsWith('/')
          ? assoluto(entry.data.cta_href)
          : entry.data.cta_href
        : null,
      note: null,
    });
  }

  // ── Eventi ──────────────────────────────────────────────────────────────
  // Gli eventi non hanno un'immagine propria in TinaCMS: la newsletter ne
  // fa a meno oppure prende una foto dalla galleria (campo "immagini").
  const eventi = await getCollection('eventi', ({ data }) => data.pubblicato);
  for (const entry of eventi) {
    const prenotabile = entry.data.prenotazioniAttive;
    voci.push({
      id: `evento:${entry.slug}`,
      tipo: 'evento',
      titolo: entry.data.titolo,
      categoria: entry.data.categoria,
      data: entry.data.data.toISOString(),
      sintesi: entry.data.descrizione,
      paragrafi: paragrafiDaMarkdown(entry.body),
      // Campo a sé e non solo dentro "note": nella card evento della
      // newsletter il luogo ha una sua riga accanto alla categoria.
      luogo: entry.data.luogo ?? null,
      immagine: null,
      immagineAlt: null,
      immagineEmailSafe: true,
      url: assoluto(`/eventi/${entry.slug}`),
      ctaLabel: prenotabile ? 'Prenota il tuo posto' : entry.data.iscrizioniHref ? 'Iscriviti' : null,
      ctaHref: prenotabile
        ? assoluto(`/eventi/${entry.slug}`)
        : entry.data.iscrizioniHref || null,
      note: [
        entry.data.luogo ? `Luogo: ${entry.data.luogo}` : null,
        prenotabile
          ? `Prenotazione online attiva — quota soci € ${entry.data.quotaSocio}, non soci € ${entry.data.quotaNonSocio}`
          : null,
      ]
        .filter(Boolean)
        .join(' · ') || null,
    });
  }

  // ── Servizi ─────────────────────────────────────────────────────────────
  const servizi = await getCollection('servizi');
  for (const entry of servizi.sort((a, b) => a.data.ordine - b.data.ordine)) {
    voci.push({
      id: `servizio:${entry.slug}`,
      tipo: 'servizio',
      titolo: entry.data.titolo,
      categoria: 'Servizi',
      data: null,
      sintesi: entry.data.desc,
      paragrafi: [entry.data.dettaglio, ...paragrafiDaMarkdown(entry.body)].filter(Boolean),
      luogo: null,
      immagine: null,
      immagineAlt: null,
      immagineEmailSafe: true,
      url: entry.data.href
        ? entry.data.href.startsWith('/')
          ? assoluto(entry.data.href)
          : entry.data.href
        : assoluto('/club-life#servizi'),
      ctaLabel: null,
      ctaHref: null,
      note: null,
    });
  }

  // ── Promo attiva ────────────────────────────────────────────────────────
  // La promo vive nel banner del sito (PromoBanner.astro + i18n/it.ts):
  // pubblicarla qui evita che in newsletter finisca uno sconto diverso da
  // quello che il visitatore legge sul sito.
  const scadenzaPromo = new Date('2026-09-15T23:59:59+02:00');
  if (Date.now() <= scadenzaPromo.getTime()) {
    voci.push({
      id: 'promo:restart-2026',
      tipo: 'promo',
      titolo: `${it.promo.badge} ${it.promo.title}`,
      categoria: it.promo.eyebrow,
      data: scadenzaPromo.toISOString(),
      sintesi: it.promo.text,
      paragrafi: [it.promo.text, it.promo.deadline],
      luogo: null,
      immagine: null,
      immagineAlt: null,
      immagineEmailSafe: true,
      url: assoluto('/iscrizioni'),
      ctaLabel: it.promo.cta,
      ctaHref: perfectGym.register,
      note: it.promo.deadline,
    });
  }

  // ── Pagine del sito (solo come link) ────────────────────────────────────
  for (const slug of PAGINE_LINKABILI) {
    const entry = await getEntry('pagine', slug);
    if (!entry) continue;
    const foto = entry.data.hero_immagine ? immagineEmail(entry.data.hero_immagine) : null;
    voci.push({
      id: `pagina:${slug}`,
      tipo: 'pagina',
      titolo: entry.data.hero_titolo ?? entry.data.title,
      categoria: 'Pagina del sito',
      data: null,
      sintesi: entry.data.hero_sottotitolo ?? entry.data.description,
      paragrafi: entry.data.hero_sottotitolo ? [entry.data.hero_sottotitolo] : [entry.data.description],
      luogo: null,
      immagine: foto ? urlImmagine(foto.percorso) : null,
      immagineAlt: entry.data.hero_immagine_alt ?? entry.data.title,
      immagineEmailSafe: foto ? foto.sicura : true,
      url: assoluto(`/${slug}`),
      ctaLabel: 'Scopri di più',
      ctaHref: assoluto(`/${slug}`),
      note: null,
    });
  }

  const corpo = {
    generatoIl: new Date().toISOString(),
    sito: `${origine}${base}`,
    // Foto già online e visibili in email, per le voci che non ne hanno una.
    immagini: galleriaEmailSafe().map((percorso) => ({
      nome: percorso.replace(/^\//, ''),
      url: urlImmagine(percorso),
    })),
    voci,
  };

  return new Response(JSON.stringify(corpo, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
