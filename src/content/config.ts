import { defineCollection, z } from 'astro:content';

// ─── PAGINE ───────────────────────────────────────────────────────────────────
// Un file .md per pagina in src/content/pagine/. Ogni file contiene SEO + hero
// (comuni a tutte le pagine) più, per le pagine che hanno contenuto strutturato
// sotto l'hero, i campi specifici di quella pagina (opzionali, popolati solo
// dove servono). In TinaCMS questo appare come UNA voce "Pagine" con un
// template dedicato per pagina (vedi tina/config.ts).
// ─────────────────────────────────────────────────────────────────────────────
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

    // ── Corpo pagina: Storia ──
    storia_sezione1_eyebrow: z.string().optional(),
    storia_sezione1_titolo: z.string().optional(),
    storia_sezione1_titolo_accent: z.string().optional(),
    storia_timeline: z.array(z.object({
      anno: z.string(),
      testo: z.string(),
      testo_en: z.string().optional(),
    })).optional(),
    storia_sezione2_eyebrow: z.string().optional(),
    storia_sezione2_titolo: z.string().optional(),
    storia_sezione2_titolo_accent: z.string().optional(),
    storia_paragrafo1: z.string().optional(),
    storia_paragrafo2: z.string().optional(),
    storia_galleria: z.array(z.object({
      immagine: z.string(),
      alt: z.string(),
    })).optional(),
    storia_sezione1_eyebrow_en: z.string().optional(),
    storia_sezione1_titolo_en: z.string().optional(),
    storia_sezione1_titolo_accent_en: z.string().optional(),
    storia_sezione2_eyebrow_en: z.string().optional(),
    storia_sezione2_titolo_en: z.string().optional(),
    storia_sezione2_titolo_accent_en: z.string().optional(),
    storia_paragrafo1_en: z.string().optional(),
    storia_paragrafo2_en: z.string().optional(),

    // ── Corpo pagina: Summer Camps ──
    camps_sezione1_eyebrow: z.string().optional(),
    camps_sezione1_titolo: z.string().optional(),
    camps_sezione1_titolo_accent: z.string().optional(),
    camps_features: z.array(z.object({
      titolo: z.string(),
      testo: z.string(),
      titolo_en: z.string().optional(),
      testo_en: z.string().optional(),
    })).optional(),
    camps_immagine1: z.string().optional(),
    camps_immagine1_alt: z.string().optional(),
    camps_immagine2: z.string().optional(),
    camps_immagine2_alt: z.string().optional(),
    camps_sezione2_eyebrow: z.string().optional(),
    camps_sezione2_titolo: z.string().optional(),
    camps_sezione2_titolo_accent: z.string().optional(),
    camps_settimane: z.array(z.object({
      settimana: z.string(),
      date: z.string(),
      settimana_en: z.string().optional(),
      date_en: z.string().optional(),
    })).optional(),
    camps_sezione1_eyebrow_en: z.string().optional(),
    camps_sezione1_titolo_en: z.string().optional(),
    camps_sezione1_titolo_accent_en: z.string().optional(),
    camps_immagine1_alt_en: z.string().optional(),
    camps_immagine2_alt_en: z.string().optional(),
    camps_sezione2_eyebrow_en: z.string().optional(),
    camps_sezione2_titolo_en: z.string().optional(),
    camps_sezione2_titolo_accent_en: z.string().optional(),

    // ── Corpo pagina: Scuola Tennis ──
    scuola_sezione1_eyebrow: z.string().optional(),
    scuola_sezione1_titolo: z.string().optional(),
    scuola_sezione1_titolo_accent: z.string().optional(),
    scuola_sezione1_lead: z.string().optional(),
    scuola_livelli: z.array(z.object({
      dot: z.enum(['rosso', 'arancio', 'verde', 'giallo']),
      nome: z.string(),
      tag: z.string(),
      range: z.string(),
      testo: z.string(),
      nome_en: z.string().optional(),
      tag_en: z.string().optional(),
      range_en: z.string().optional(),
      testo_en: z.string().optional(),
    })).optional(),
    scuola_livelli_footer_testo: z.string().optional(),
    scuola_livelli_footer_link_label: z.string().optional(),
    scuola_sezione2_eyebrow: z.string().optional(),
    scuola_sezione2_titolo: z.string().optional(),
    scuola_sezione2_titolo_accent: z.string().optional(),
    scuola_iscrizione_cards: z.array(z.object({
      titolo: z.string(),
      tag: z.string(),
      testo: z.string(),
      titolo_en: z.string().optional(),
      tag_en: z.string().optional(),
      testo_en: z.string().optional(),
    })).optional(),
    scuola_iscrizione_cta_label: z.string().optional(),
    scuola_sezione3_eyebrow: z.string().optional(),
    scuola_sezione3_titolo: z.string().optional(),
    scuola_sezione3_titolo_accent: z.string().optional(),
    scuola_sezione3_badge: z.string().optional(),
    scuola_sezione3_paragrafo1: z.string().optional(),
    scuola_sezione3_paragrafo2: z.string().optional(),
    scuola_sezione3_paragrafo3: z.string().optional(),
    scuola_sezione3_immagine: z.string().optional(),
    scuola_sezione3_immagine_alt: z.string().optional(),
    scuola_sezione4_eyebrow: z.string().optional(),
    scuola_sezione4_titolo: z.string().optional(),
    scuola_sezione4_titolo_accent: z.string().optional(),
    scuola_tornei: z.array(z.object({
      quando: z.string(),
      nome: z.string(),
      testo: z.string(),
      quando_en: z.string().optional(),
      nome_en: z.string().optional(),
      testo_en: z.string().optional(),
    })).optional(),
    scuola_sezione4_footer_testo: z.string().optional(),
    scuola_sezione1_eyebrow_en: z.string().optional(),
    scuola_sezione1_titolo_en: z.string().optional(),
    scuola_sezione1_titolo_accent_en: z.string().optional(),
    scuola_sezione1_lead_en: z.string().optional(),
    scuola_livelli_footer_testo_en: z.string().optional(),
    scuola_livelli_footer_link_label_en: z.string().optional(),
    scuola_sezione2_eyebrow_en: z.string().optional(),
    scuola_sezione2_titolo_en: z.string().optional(),
    scuola_sezione2_titolo_accent_en: z.string().optional(),
    scuola_iscrizione_cta_label_en: z.string().optional(),
    scuola_sezione3_eyebrow_en: z.string().optional(),
    scuola_sezione3_titolo_en: z.string().optional(),
    scuola_sezione3_titolo_accent_en: z.string().optional(),
    scuola_sezione3_badge_en: z.string().optional(),
    scuola_sezione3_paragrafo1_en: z.string().optional(),
    scuola_sezione3_paragrafo2_en: z.string().optional(),
    scuola_sezione3_paragrafo3_en: z.string().optional(),
    scuola_sezione3_immagine_alt_en: z.string().optional(),
    scuola_sezione4_eyebrow_en: z.string().optional(),
    scuola_sezione4_titolo_en: z.string().optional(),
    scuola_sezione4_titolo_accent_en: z.string().optional(),
    scuola_sezione4_footer_testo_en: z.string().optional(),

    // ── Corpo pagina: Personal Trainer ──
    pt_sezione1_eyebrow: z.string().optional(),
    pt_sezione1_titolo: z.string().optional(),
    pt_sezione1_titolo_accent: z.string().optional(),
    pt_sezione1_paragrafo1: z.string().optional(),
    pt_sezione1_paragrafo2: z.string().optional(),
    pt_stats: z.array(z.object({
      numero: z.string(),
      etichetta: z.string(),
      etichetta_en: z.string().optional(),
    })).optional(),
    pt_sezione2_eyebrow: z.string().optional(),
    pt_sezione2_titolo: z.string().optional(),
    pt_sezione2_titolo_accent: z.string().optional(),
    pt_trainers: z.array(z.object({
      nome: z.string(),
      foto: z.string().optional(),
      specializzazioni: z.array(z.string()),
      qualifiche: z.array(z.string()),
      lingue: z.array(z.string()).optional(),
      specializzazioni_en: z.array(z.string()).optional(),
      qualifiche_en: z.array(z.string()).optional(),
      lingue_en: z.array(z.string()).optional(),
    })).optional(),
    pt_sezione3_eyebrow: z.string().optional(),
    pt_sezione3_titolo: z.string().optional(),
    pt_sezione3_titolo_accent: z.string().optional(),
    pt_steps: z.array(z.object({
      titolo: z.string(),
      testo: z.string(),
      titolo_en: z.string().optional(),
      testo_en: z.string().optional(),
    })).optional(),
    pt_sezione4_titolo: z.string().optional(),
    pt_sezione4_sottotitolo: z.string().optional(),
    pt_sezione4_cta_label: z.string().optional(),
    pt_sezione1_eyebrow_en: z.string().optional(),
    pt_sezione1_titolo_en: z.string().optional(),
    pt_sezione1_titolo_accent_en: z.string().optional(),
    pt_sezione1_paragrafo1_en: z.string().optional(),
    pt_sezione1_paragrafo2_en: z.string().optional(),
    pt_sezione2_eyebrow_en: z.string().optional(),
    pt_sezione2_titolo_en: z.string().optional(),
    pt_sezione2_titolo_accent_en: z.string().optional(),
    pt_sezione3_eyebrow_en: z.string().optional(),
    pt_sezione3_titolo_en: z.string().optional(),
    pt_sezione3_titolo_accent_en: z.string().optional(),
    pt_sezione4_titolo_en: z.string().optional(),
    pt_sezione4_sottotitolo_en: z.string().optional(),
    pt_sezione4_cta_label_en: z.string().optional(),

    // ── Corpo pagina: Preparazione Atletica ──
    prep_sala_eyebrow: z.string().optional(),
    prep_sala_titolo: z.string().optional(),
    prep_sala_titolo_accent: z.string().optional(),
    prep_sala_paragrafo1: z.string().optional(),
    prep_sala_paragrafo2: z.string().optional(),
    prep_sala_slideshow: z.array(z.object({
      immagine: z.string(),
      alt: z.string(),
      alt_en: z.string().optional(),
    })).optional(),
    prep_sala_features: z.array(z.object({
      titolo: z.string(),
      testo: z.string(),
      titolo_en: z.string().optional(),
      testo_en: z.string().optional(),
    })).optional(),
    prep_sala_cta_label: z.string().optional(),
    prep_corsi_eyebrow: z.string().optional(),
    prep_corsi_titolo: z.string().optional(),
    prep_corsi_titolo_accent: z.string().optional(),
    prep_corsi_sub: z.string().optional(),
    prep_categorie: z.array(z.object({
      id: z.enum(['endurance', 'strength', 'balance']),
      label: z.string(),
      desc: z.string(),
      color: z.string(),
      desc_en: z.string().optional(),
      corsi: z.array(z.object({
        nome: z.string(),
        durata: z.string(),
        intensita: z.number().min(1).max(3),
        livello: z.string(),
        desc: z.string(),
        immagine: z.string(),
        nome_en: z.string().optional(),
        livello_en: z.string().optional(),
        desc_en: z.string().optional(),
      })),
    })).optional(),
    prep_calendario_eyebrow: z.string().optional(),
    prep_calendario_titolo: z.string().optional(),
    prep_calendario_titolo_accent: z.string().optional(),
    prep_calendario_sub: z.string().optional(),
    prep_sala_eyebrow_en: z.string().optional(),
    prep_sala_titolo_en: z.string().optional(),
    prep_sala_titolo_accent_en: z.string().optional(),
    prep_sala_paragrafo1_en: z.string().optional(),
    prep_sala_paragrafo2_en: z.string().optional(),
    prep_sala_cta_label_en: z.string().optional(),
    prep_corsi_eyebrow_en: z.string().optional(),
    prep_corsi_titolo_en: z.string().optional(),
    prep_corsi_titolo_accent_en: z.string().optional(),
    prep_corsi_sub_en: z.string().optional(),
    prep_calendario_eyebrow_en: z.string().optional(),
    prep_calendario_titolo_en: z.string().optional(),
    prep_calendario_titolo_accent_en: z.string().optional(),
    prep_calendario_sub_en: z.string().optional(),

    // ── Corpo pagina: Tennis ──
    tennis_campi_eyebrow: z.string().optional(),
    tennis_campi_titolo: z.string().optional(),
    tennis_campi_titolo_accent: z.string().optional(),
    tennis_campi: z.array(z.object({
      titolo: z.string(),
      testo: z.string(),
      titolo_en: z.string().optional(),
      testo_en: z.string().optional(),
    })).optional(),
    tennis_soci_eyebrow: z.string().optional(),
    tennis_soci_titolo: z.string().optional(),
    tennis_soci_titolo_accent: z.string().optional(),
    tennis_soci_testo: z.string().optional(),
    tennis_corsi_eyebrow: z.string().optional(),
    tennis_corsi_titolo: z.string().optional(),
    tennis_corsi_titolo_accent: z.string().optional(),
    tennis_corsi_intro: z.string().optional(),
    tennis_corsi_livelli: z.array(z.object({
      titolo: z.string(),
      testo: z.string(),
      titolo_en: z.string().optional(),
      testo_en: z.string().optional(),
    })).optional(),
    tennis_corsi_cta_label: z.string().optional(),
    tennis_campi_eyebrow_en: z.string().optional(),
    tennis_campi_titolo_en: z.string().optional(),
    tennis_campi_titolo_accent_en: z.string().optional(),
    tennis_soci_eyebrow_en: z.string().optional(),
    tennis_soci_titolo_en: z.string().optional(),
    tennis_soci_titolo_accent_en: z.string().optional(),
    tennis_soci_testo_en: z.string().optional(),
    tennis_corsi_eyebrow_en: z.string().optional(),
    tennis_corsi_titolo_en: z.string().optional(),
    tennis_corsi_titolo_accent_en: z.string().optional(),
    tennis_corsi_intro_en: z.string().optional(),
    tennis_corsi_cta_label_en: z.string().optional(),

    // ── Corpo pagina: Agonistica ──
    agonistica_metodo_eyebrow: z.string().optional(),
    agonistica_metodo_titolo: z.string().optional(),
    agonistica_metodo_titolo_accent: z.string().optional(),
    agonistica_metodo_lead: z.string().optional(),
    agonistica_metodo_immagine1: z.string().optional(),
    agonistica_metodo_immagine1_alt: z.string().optional(),
    agonistica_metodo_immagine2: z.string().optional(),
    agonistica_metodo_immagine2_alt: z.string().optional(),
    agonistica_metodo_pillars: z.array(z.object({
      titolo: z.string(),
      testo: z.string(),
      titolo_en: z.string().optional(),
      testo_en: z.string().optional(),
    })).optional(),
    agonistica_metodo_quote: z.string().optional(),
    agonistica_punti_chiave_titolo: z.string().optional(),
    agonistica_punti_chiave: z.array(z.object({
      testo: z.string(),
      testo_en: z.string().optional(),
    })).optional(),
    agonistica_metodo_eyebrow_en: z.string().optional(),
    agonistica_metodo_titolo_en: z.string().optional(),
    agonistica_metodo_titolo_accent_en: z.string().optional(),
    agonistica_metodo_lead_en: z.string().optional(),
    agonistica_metodo_immagine1_alt_en: z.string().optional(),
    agonistica_metodo_immagine2_alt_en: z.string().optional(),
    agonistica_metodo_quote_en: z.string().optional(),
    agonistica_punti_chiave_titolo_en: z.string().optional(),
    agonistica_eyebrow: z.string().optional(),
    agonistica_titolo: z.string().optional(),
    agonistica_titolo_accent: z.string().optional(),
    agonistica_step: z.array(z.object({
      titolo: z.string(),
      testo: z.string(),
      titolo_en: z.string().optional(),
      testo_en: z.string().optional(),
    })).optional(),
    agonistica_eyebrow_en: z.string().optional(),
    agonistica_titolo_en: z.string().optional(),
    agonistica_titolo_accent_en: z.string().optional(),

    // ── Corpo pagina: Torneo Avvenire ──
    torneo_quote_testo: z.string().optional(),
    torneo_quote_autore: z.string().optional(),
    torneo_storia_eyebrow: z.string().optional(),
    torneo_storia_titolo: z.string().optional(),
    torneo_storia_titolo_accent: z.string().optional(),
    torneo_storia_paragrafo1: z.string().optional(),
    torneo_storia_paragrafo2: z.string().optional(),
    torneo_stats: z.array(z.object({
      numero: z.string(),
      label: z.string(),
      label_en: z.string().optional(),
    })).optional(),
    torneo_alumni_eyebrow: z.string().optional(),
    torneo_alumni_titolo: z.string().optional(),
    torneo_alumni_titolo_accent: z.string().optional(),
    torneo_alumni_intro: z.string().optional(),
    torneo_galleria_eyebrow: z.string().optional(),
    torneo_galleria_titolo: z.string().optional(),
    torneo_galleria_titolo_accent: z.string().optional(),
    torneo_prossima_eyebrow: z.string().optional(),
    torneo_prossima_titolo: z.string().optional(),
    torneo_prossima_titolo_accent: z.string().optional(),
    torneo_prossima_testo: z.string().optional(),
    torneo_quote_testo_en: z.string().optional(),
    torneo_quote_autore_en: z.string().optional(),
    torneo_storia_eyebrow_en: z.string().optional(),
    torneo_storia_titolo_en: z.string().optional(),
    torneo_storia_titolo_accent_en: z.string().optional(),
    torneo_storia_paragrafo1_en: z.string().optional(),
    torneo_storia_paragrafo2_en: z.string().optional(),
    torneo_alumni_eyebrow_en: z.string().optional(),
    torneo_alumni_titolo_en: z.string().optional(),
    torneo_alumni_titolo_accent_en: z.string().optional(),
    torneo_alumni_intro_en: z.string().optional(),
    torneo_galleria_eyebrow_en: z.string().optional(),
    torneo_galleria_titolo_en: z.string().optional(),
    torneo_galleria_titolo_accent_en: z.string().optional(),
    torneo_prossima_eyebrow_en: z.string().optional(),
    torneo_prossima_titolo_en: z.string().optional(),
    torneo_prossima_titolo_accent_en: z.string().optional(),
    torneo_prossima_testo_en: z.string().optional(),

    // ── Corpo pagina: Regolamento del Club ──
    regolamento_body: z.string().optional(),
    regolamento_body_en: z.string().optional(),

    // ── Corpo pagina: Privacy Policy ──
    privacy_body: z.string().optional(),
    privacy_body_en: z.string().optional(),

    // ── Corpo pagina: Partners ──
    partners_lista: z.array(z.object({
      nome: z.string(),
      descrizione: z.string(),
      descrizione_en: z.string().optional(),
      logo: z.string(),
      sito: z.string(),
    })).optional(),
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

// ─── MEMBERSHIP (tabella prezzi) ──────────────────────────────────────────────
// Tabella abbonamenti Silver/Gold/Platinum, condivisa da tennis,
// preparazione-atletica e personal-trainer. File unico.
// Ogni riga ha un "tipo" per colonna che determina lo stile della cella:
// incluso (verde), parziale (ambra), valore (numero/giorni), check (icona).
// Gestibile da TinaCMS → collection 'membership'.
// ─────────────────────────────────────────────────────────────────────────────
const rigaMembership = z.object({
  feature: z.string(),
  feature_tooltip: z.string().optional(),
  silver_tipo: z.enum(['incluso', 'parziale', 'valore', 'check']),
  silver_valore: z.string().optional(),
  gold_tipo: z.enum(['incluso', 'parziale', 'valore', 'check']),
  gold_valore: z.string().optional(),
  platinum_tipo: z.enum(['incluso', 'parziale', 'valore', 'check']),
  platinum_valore: z.string().optional(),
  feature_en: z.string().optional(),
  feature_tooltip_en: z.string().optional(),
  silver_valore_en: z.string().optional(),
  gold_valore_en: z.string().optional(),
  platinum_valore_en: z.string().optional(),
});

const membership = defineCollection({
  type: 'content',
  schema: z.object({
    titolo: z.string(),
    titolo_accent: z.string(),
    sottotitolo: z.string(),
    silver_nome: z.string(),
    gold_nome: z.string(),
    platinum_nome: z.string(),
    platinum_badge: z.string(),
    cta_label: z.string(),
    categorie: z.array(z.object({
      label: z.string(),
      label_en: z.string().optional(),
      righe: z.array(rigaMembership),
    })),
    // Versione inglese (opzionale): se assente si usa il fallback italiano
    titolo_en: z.string().optional(),
    titolo_accent_en: z.string().optional(),
    sottotitolo_en: z.string().optional(),
    platinum_badge_en: z.string().optional(),
    cta_label_en: z.string().optional(),
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

// ─── DOCUMENTI LEGALI ──────────────────────────────────────────────────────────
// File unico (documenti.md) con i PDF legali linkati dal footer (sezione
// "Legal"). Ogni campo è il percorso del PDF in public/legal/, sostituibile
// da TinaCMS caricando un nuovo file. Gestibile da TinaCMS → collection 'legal'.
// ─────────────────────────────────────────────────────────────────────────────
const legal = defineCollection({
  type: 'content',
  schema: z.object({
    codice_condotta: z.string().optional(),
    nomina_responsabile: z.string().optional(),
  }),
});

export const collections = { pagine, eventi, news, helpdesk, servizi, planning, membership, info, legal };
