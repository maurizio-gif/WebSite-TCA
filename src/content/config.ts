import { defineCollection, z } from 'astro:content';

const pagine = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hero_eyebrow: z.string().optional(),
    hero_titolo: z.string().optional(),
    hero_titolo_accent: z.string().optional(),
    hero_sottotitolo: z.string().optional(),
    hero_immagine: z.string().optional(),
    hero_immagine_alt: z.string().optional(),
  }),
});

// ─── EVENTI ───────────────────────────────────────────────────────────────────
// Ogni file .md in src/content/eventi/ rappresenta un evento.
// Gestibile da TinaCMS (vedi tina/config.ts → collection 'eventi').
//
// Per usarlo nel componente EventiHome.astro:
//   import { getCollection } from 'astro:content';
//   const eventi = await getCollection('eventi', ({ data }) => data.pubblicato);
// ─────────────────────────────────────────────────────────────────────────────
const eventi = defineCollection({
  type: 'content',
  schema: z.object({
    titolo: z.string(),
    data: z.date(),
    categoria: z.enum(['Torneo', 'Clinic', 'Evento', 'Camp']),
    descrizione: z.string(),
    luogo: z.string().optional(),
    iscrizioniHref: z.string().optional(),
    pubblicato: z.boolean().default(true),
    // Versione inglese (opzionale): se assente si usa il fallback italiano
    titolo_en: z.string().optional(),
    descrizione_en: z.string().optional(),
    luogo_en: z.string().optional(),
    corpo_en: z.string().optional(),
  }),
});

// ─── NEWS CLUB LIFE ───────────────────────────────────────────────────────────
// Articoli della bacheca Club Life. Ogni file .md in src/content/news/ è una
// news; il body (markdown) è il testo italiano, corpo_en quello inglese.
// Gestibile da TinaCMS → collection 'news'.
// ─────────────────────────────────────────────────────────────────────────────
const news = defineCollection({
  type: 'content',
  schema: z.object({
    titolo: z.string(),
    data: z.date(),
    categoria: z.string(),
    sintesi: z.string(),
    immagine: z.string(),
    immagine_alt: z.string(),
    pubblicato: z.boolean().default(true),
    // Versione inglese (opzionale): se assente si usa il fallback italiano
    titolo_en: z.string().optional(),
    categoria_en: z.string().optional(),
    sintesi_en: z.string().optional(),
    immagine_alt_en: z.string().optional(),
    corpo_en: z.string().optional(),
  }),
});

// ─── HELP DESK ────────────────────────────────────────────────────────────────
// Guide della knowledge base Club Life. Ogni file .md in src/content/helpdesk/
// è una guida; il body (markdown) è il testo italiano, corpo_en quello inglese
// (un paragrafo per riga vuota, grassetti con **doppi asterischi**).
// Le categorie (id + etichette) restano definite in src/data/helpDesk.ts.
// Gestibile da TinaCMS → collection 'helpdesk'.
// ─────────────────────────────────────────────────────────────────────────────
const helpdesk = defineCollection({
  type: 'content',
  schema: z.object({
    titolo: z.string(),
    categoria: z.enum(['iscrizioni', 'prenotazioni', 'app', 'pagamenti', 'regolamento', 'scuola']),
    sintesi: z.string(),
    tags: z.array(z.string()).default([]),
    aggiornato: z.date(),
    // Versione inglese (opzionale): se assente si usa il fallback italiano
    titolo_en: z.string().optional(),
    sintesi_en: z.string().optional(),
    tags_en: z.array(z.string()).optional(),
    corpo_en: z.string().optional(),
  }),
});

// ─── SERVIZI CLUB LIFE ────────────────────────────────────────────────────────
// Card della sezione "Servizi e Partner" di Club Life. Ogni file .md in
// src/content/servizi/ è una card; `ordine` controlla la posizione in griglia,
// `icon` sceglie una delle icone SVG definite in ClubLifeServizi.astro.
// Grassetti nel dettaglio con **doppi asterischi**.
// Gestibile da TinaCMS → collection 'servizi'.
// ─────────────────────────────────────────────────────────────────────────────
const servizi = defineCollection({
  type: 'content',
  schema: z.object({
    titolo: z.string(),
    ordine: z.number(),
    icon: z.enum(['coach', 'ballmachine', 'birthday', 'locker', 'shop', 'medical', 'graduation', 'briefcase']),
    desc: z.string(),
    dettaglio: z.string(),
    href: z.string().optional(),
    // Versione inglese (opzionale): se assente si usa il fallback italiano
    titolo_en: z.string().optional(),
    desc_en: z.string().optional(),
    dettaglio_en: z.string().optional(),
  }),
});

// ─── PLANNING CORSI ───────────────────────────────────────────────────────────
// Planning settimanale dei corsi di gruppo (pagina Preparazione Atletica).
// File unico (corsi.md) con la lista delle lezioni; il componente
// WeeklySchedule.astro raggruppa per giorno e ordina per orario.
// Gestibile da TinaCMS → collection 'planning'.
// ─────────────────────────────────────────────────────────────────────────────
const planning = defineCollection({
  type: 'content',
  schema: z.object({
    lezioni: z.array(z.object({
      giorno: z.enum(['lun', 'mar', 'mer', 'gio', 'ven', 'sab', 'dom']),
      ora: z.string(),
      categoria: z.enum(['S', 'B', 'E']),
      nome: z.string(),
    })),
  }),
});

// ─── INFO CLUB ────────────────────────────────────────────────────────────────
// File unico (club.md) con i dati pratici del Club mostrati in tutto il sito:
// orari, indirizzo, contatti. Gestibile da TinaCMS → collection 'info'.
// Usato da InfoPratiche.astro.
// ─────────────────────────────────────────────────────────────────────────────
const info = defineCollection({
  type: 'content',
  schema: z.object({
    indirizzo: z.string(),
    come_arrivare: z.string(),
    come_arrivare_en: z.string(),
    orari: z.string(),
    orari_en: z.string(),
    telefono: z.string(),
    email: z.string(),
  }),
});

export const collections = { pagine, eventi, news, helpdesk, servizi, planning, info };
