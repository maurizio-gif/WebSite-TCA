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
    // Versione inglese (opzionale): se assente si usa il fallback italiano
    title_en: z.string().optional(),
    description_en: z.string().optional(),
    hero_eyebrow_en: z.string().optional(),
    hero_titolo_en: z.string().optional(),
    hero_titolo_accent_en: z.string().optional(),
    hero_sottotitolo_en: z.string().optional(),
    hero_immagine_alt_en: z.string().optional(),
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
    // CTA opzionale nel popup della news: il pulsante appare solo se c'è il link
    cta_label: z.string().optional(),
    cta_href: z.string().optional(),
    // Versione inglese (opzionale): se assente si usa il fallback italiano
    titolo_en: z.string().optional(),
    categoria_en: z.string().optional(),
    sintesi_en: z.string().optional(),
    immagine_alt_en: z.string().optional(),
    corpo_en: z.string().optional(),
    cta_label_en: z.string().optional(),
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

// ─── CORPO PAGINA: STORIA ─────────────────────────────────────────────────────
// Contenuto sotto l'hero della pagina Storia (timeline + "Il club oggi").
// File unico, gestibile da TinaCMS → collection 'corpoStoria'.
// ─────────────────────────────────────────────────────────────────────────────
const corpoStoria = defineCollection({
  type: 'content',
  schema: z.object({
    sezione1_eyebrow: z.string(),
    sezione1_titolo: z.string(),
    sezione1_titolo_accent: z.string(),
    timeline: z.array(z.object({
      anno: z.string(),
      testo: z.string(),
      testo_en: z.string().optional(),
    })),
    sezione2_eyebrow: z.string(),
    sezione2_titolo: z.string(),
    sezione2_titolo_accent: z.string(),
    paragrafo1: z.string(),
    paragrafo2: z.string(),
    galleria: z.array(z.object({
      immagine: z.string(),
      alt: z.string(),
    })),
    // Versione inglese (opzionale): se assente si usa il fallback italiano
    sezione1_eyebrow_en: z.string().optional(),
    sezione1_titolo_en: z.string().optional(),
    sezione1_titolo_accent_en: z.string().optional(),
    sezione2_eyebrow_en: z.string().optional(),
    sezione2_titolo_en: z.string().optional(),
    sezione2_titolo_accent_en: z.string().optional(),
    paragrafo1_en: z.string().optional(),
    paragrafo2_en: z.string().optional(),
  }),
});

// ─── CORPO PAGINA: SUMMER CAMPS ───────────────────────────────────────────────
// Contenuto sotto l'hero della pagina Summer Camps (programma + date settimane).
// File unico, gestibile da TinaCMS → collection 'corpoSummerCamps'.
// ─────────────────────────────────────────────────────────────────────────────
const corpoSummerCamps = defineCollection({
  type: 'content',
  schema: z.object({
    sezione1_eyebrow: z.string(),
    sezione1_titolo: z.string(),
    sezione1_titolo_accent: z.string(),
    features: z.array(z.object({
      titolo: z.string(),
      testo: z.string(),
      titolo_en: z.string().optional(),
      testo_en: z.string().optional(),
    })),
    immagine1: z.string(),
    immagine1_alt: z.string(),
    immagine2: z.string(),
    immagine2_alt: z.string(),
    sezione2_eyebrow: z.string(),
    sezione2_titolo: z.string(),
    sezione2_titolo_accent: z.string(),
    settimane: z.array(z.object({
      settimana: z.string(),
      date: z.string(),
      settimana_en: z.string().optional(),
      date_en: z.string().optional(),
    })),
    // Versione inglese (opzionale): se assente si usa il fallback italiano
    sezione1_eyebrow_en: z.string().optional(),
    sezione1_titolo_en: z.string().optional(),
    sezione1_titolo_accent_en: z.string().optional(),
    immagine1_alt_en: z.string().optional(),
    immagine2_alt_en: z.string().optional(),
    sezione2_eyebrow_en: z.string().optional(),
    sezione2_titolo_en: z.string().optional(),
    sezione2_titolo_accent_en: z.string().optional(),
  }),
});

// ─── CORPO PAGINA: SCUOLA TENNIS ──────────────────────────────────────────────
// Contenuto sotto l'hero della pagina Scuola Tennis (livelli, iscrizione,
// metodo, tornei durante l'anno).
// File unico, gestibile da TinaCMS → collection 'corpoScuolaTennis'.
// ─────────────────────────────────────────────────────────────────────────────
const corpoScuolaTennis = defineCollection({
  type: 'content',
  schema: z.object({
    sezione1_eyebrow: z.string(),
    sezione1_titolo: z.string(),
    sezione1_titolo_accent: z.string(),
    sezione1_lead: z.string(),
    livelli: z.array(z.object({
      dot: z.enum(['rosso', 'arancio', 'verde', 'giallo']),
      nome: z.string(),
      tag: z.string(),
      range: z.string(),
      testo: z.string(),
      nome_en: z.string().optional(),
      tag_en: z.string().optional(),
      range_en: z.string().optional(),
      testo_en: z.string().optional(),
    })),
    livelli_footer_testo: z.string(),
    livelli_footer_link_label: z.string(),
    sezione2_eyebrow: z.string(),
    sezione2_titolo: z.string(),
    sezione2_titolo_accent: z.string(),
    iscrizione_cards: z.array(z.object({
      titolo: z.string(),
      tag: z.string(),
      testo: z.string(),
      titolo_en: z.string().optional(),
      tag_en: z.string().optional(),
      testo_en: z.string().optional(),
    })),
    iscrizione_cta_label: z.string(),
    sezione3_eyebrow: z.string(),
    sezione3_titolo: z.string(),
    sezione3_titolo_accent: z.string(),
    sezione3_badge: z.string(),
    sezione3_paragrafo1: z.string(),
    sezione3_paragrafo2: z.string(),
    sezione3_paragrafo3: z.string(),
    sezione3_immagine: z.string(),
    sezione3_immagine_alt: z.string(),
    sezione4_eyebrow: z.string(),
    sezione4_titolo: z.string(),
    sezione4_titolo_accent: z.string(),
    tornei: z.array(z.object({
      quando: z.string(),
      nome: z.string(),
      testo: z.string(),
      quando_en: z.string().optional(),
      nome_en: z.string().optional(),
      testo_en: z.string().optional(),
    })),
    sezione4_footer_testo: z.string(),
    // Versione inglese (opzionale): se assente si usa il fallback italiano
    sezione1_eyebrow_en: z.string().optional(),
    sezione1_titolo_en: z.string().optional(),
    sezione1_titolo_accent_en: z.string().optional(),
    sezione1_lead_en: z.string().optional(),
    livelli_footer_testo_en: z.string().optional(),
    livelli_footer_link_label_en: z.string().optional(),
    sezione2_eyebrow_en: z.string().optional(),
    sezione2_titolo_en: z.string().optional(),
    sezione2_titolo_accent_en: z.string().optional(),
    iscrizione_cta_label_en: z.string().optional(),
    sezione3_eyebrow_en: z.string().optional(),
    sezione3_titolo_en: z.string().optional(),
    sezione3_titolo_accent_en: z.string().optional(),
    sezione3_badge_en: z.string().optional(),
    sezione3_paragrafo1_en: z.string().optional(),
    sezione3_paragrafo2_en: z.string().optional(),
    sezione3_paragrafo3_en: z.string().optional(),
    sezione3_immagine_alt_en: z.string().optional(),
    sezione4_eyebrow_en: z.string().optional(),
    sezione4_titolo_en: z.string().optional(),
    sezione4_titolo_accent_en: z.string().optional(),
    sezione4_footer_testo_en: z.string().optional(),
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

export const collections = { pagine, eventi, news, helpdesk, servizi, planning, corpoStoria, corpoSummerCamps, corpoScuolaTennis, info };
