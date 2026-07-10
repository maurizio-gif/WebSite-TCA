// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.VERCEL_GIT_COMMIT_REF || process.env.GITHUB_BRANCH || process.env.HEAD || "main",
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      // Le immagini del sito vivono direttamente in public/ (root)
      mediaRoot: "",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      // ─── EVENTI ────────────────────────────────────────────────────────────
      // Il marketing può aggiungere eventi da qui: https://app.tina.io
      // Ogni evento è un file .md in src/content/eventi/
      // ───────────────────────────────────────────────────────────────────────
      {
        name: "eventi",
        label: "Eventi",
        path: "src/content/eventi",
        format: "md",
        fields: [
          {
            type: "string",
            name: "titolo",
            label: "Titolo evento",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "data",
            label: "Data",
            required: true,
            ui: { dateFormat: "DD/MM/YYYY" }
          },
          {
            type: "string",
            name: "categoria",
            label: "Categoria",
            required: true,
            options: ["Torneo", "Clinic", "Evento", "Camp"]
          },
          {
            type: "string",
            name: "descrizione",
            label: "Descrizione breve",
            required: true,
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "luogo",
            label: "Luogo (es. Campo 3, Club House)"
          },
          {
            type: "string",
            name: "iscrizioniHref",
            label: "Link iscrizioni (URL)"
          },
          {
            type: "boolean",
            name: "pubblicato",
            label: "Pubblicato"
          },
          {
            type: "string",
            name: "titolo_en",
            label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)"
          },
          {
            type: "string",
            name: "descrizione_en",
            label: "\u{1F1EC}\u{1F1E7} Descrizione breve (inglese)",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "luogo_en",
            label: "\u{1F1EC}\u{1F1E7} Luogo (inglese)"
          },
          {
            type: "string",
            name: "corpo_en",
            label: "\u{1F1EC}\u{1F1E7} Dettagli evento (inglese)",
            ui: { component: "textarea" }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Dettagli evento (italiano)",
            isBody: true
          }
        ]
      },
      // ─── SERVIZI CLUB LIFE ─────────────────────────────────────────────────
      // Card della sezione "Servizi e Partner" di Club Life.
      // Ogni servizio è un file .md in src/content/servizi/
      // ───────────────────────────────────────────────────────────────────────
      {
        name: "servizi",
        label: "Servizi Club Life",
        path: "src/content/servizi",
        format: "md",
        fields: [
          {
            type: "string",
            name: "titolo",
            label: "Titolo",
            isTitle: true,
            required: true
          },
          {
            type: "number",
            name: "ordine",
            label: "Ordine nella griglia (1 = primo)",
            required: true
          },
          {
            type: "string",
            name: "icon",
            label: "Icona",
            required: true,
            options: [
              { value: "coach", label: "Preparatore (persona)" },
              { value: "ballmachine", label: "Macchina lanciapalline" },
              { value: "birthday", label: "Compleanno (torta)" },
              { value: "locker", label: "Armadietti" },
              { value: "shop", label: "Shop (borsa)" },
              { value: "medical", label: "Medico (scudo con croce)" },
              { value: "graduation", label: "Studio (tocco di laurea)" },
              { value: "briefcase", label: "Corporate (valigetta)" }
            ]
          },
          {
            type: "string",
            name: "desc",
            label: "Descrizione breve (nella card)",
            required: true,
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "dettaglio",
            label: "Dettaglio (nel popup) \u2014 grassetto con **doppi asterischi**",
            required: true,
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "href",
            label: "Link di approfondimento (opzionale, es. /personal-trainer)"
          },
          {
            type: "string",
            name: "titolo_en",
            label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)"
          },
          {
            type: "string",
            name: "desc_en",
            label: "\u{1F1EC}\u{1F1E7} Descrizione breve (inglese)",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "dettaglio_en",
            label: "\u{1F1EC}\u{1F1E7} Dettaglio (inglese)",
            ui: { component: "textarea" }
          }
        ]
      },
      // ─── PLANNING CORSI ────────────────────────────────────────────────────
      // Planning settimanale dei corsi di gruppo (pagina Preparazione
      // Atletica). File unico: ogni riga è una lezione.
      // ───────────────────────────────────────────────────────────────────────
      {
        name: "planning",
        label: "Planning Corsi",
        path: "src/content/planning",
        format: "md",
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          {
            type: "object",
            name: "lezioni",
            label: "Lezioni",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.giorno && item?.ora ? `${(item.giorno || "").toUpperCase()} ${item.ora} \u2014 ${item.nome || ""}` : "Nuova lezione"
              })
            },
            fields: [
              {
                type: "string",
                name: "giorno",
                label: "Giorno",
                required: true,
                options: [
                  { value: "lun", label: "Luned\xEC" },
                  { value: "mar", label: "Marted\xEC" },
                  { value: "mer", label: "Mercoled\xEC" },
                  { value: "gio", label: "Gioved\xEC" },
                  { value: "ven", label: "Venerd\xEC" },
                  { value: "sab", label: "Sabato" },
                  { value: "dom", label: "Domenica" }
                ]
              },
              {
                type: "string",
                name: "ora",
                label: "Orario (es. 09:15)",
                required: true
              },
              {
                type: "string",
                name: "categoria",
                label: "Categoria",
                required: true,
                options: [
                  { value: "S", label: "Strength" },
                  { value: "B", label: "Balance" },
                  { value: "E", label: "Endurance" }
                ]
              },
              {
                type: "string",
                name: "nome",
                label: "Nome corso",
                required: true
              }
            ]
          }
        ]
      },
      // ─── MEMBERSHIP (tabella prezzi) ────────────────────────────────────────
      // Tabella abbonamenti Silver/Gold/Platinum, condivisa da tennis,
      // preparazione-atletica e personal-trainer.
      // ───────────────────────────────────────────────────────────────────────
      {
        name: "membership",
        label: "Tabella Membership",
        path: "src/content/membership",
        format: "md",
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          { type: "string", name: "titolo", label: "Titolo (prima parte)", required: true },
          { type: "string", name: "titolo_accent", label: "Titolo (parte evidenziata in rosso)", required: true },
          { type: "string", name: "sottotitolo", label: "Sottotitolo", required: true, ui: { component: "textarea" } },
          { type: "string", name: "silver_nome", label: 'Nome livello 1 (es. "Silver")', required: true },
          { type: "string", name: "gold_nome", label: 'Nome livello 2 (es. "Gold")', required: true },
          { type: "string", name: "platinum_nome", label: 'Nome livello 3 (es. "Platinum")', required: true },
          { type: "string", name: "platinum_badge", label: 'Badge sul livello 3 (es. "Pi\xF9 completo")', required: true },
          { type: "string", name: "cta_label", label: "Testo pulsante (in ogni colonna)", required: true },
          {
            type: "object",
            name: "categorie",
            label: "Categorie e righe della tabella",
            list: true,
            required: true,
            ui: {
              itemProps: (item) => ({ label: item?.label || "Nuova categoria" })
            },
            fields: [
              { type: "string", name: "label", label: 'Nome categoria (es. "Accesso ai campi")', required: true },
              { type: "string", name: "label_en", label: "\u{1F1EC}\u{1F1E7} Nome categoria (inglese)" },
              {
                type: "object",
                name: "righe",
                label: "Righe",
                list: true,
                required: true,
                ui: {
                  itemProps: (item) => ({ label: item?.feature || "Nuova riga" })
                },
                fields: [
                  { type: "string", name: "feature", label: "Nome caratteristica", required: true },
                  { type: "string", name: "feature_tooltip", label: "Tooltip (opzionale, icona info)" },
                  {
                    type: "string",
                    name: "silver_tipo",
                    label: "Livello 1 \u2014 tipo cella",
                    required: true,
                    options: [
                      { value: "incluso", label: "Incluso (verde)" },
                      { value: "parziale", label: "Parziale/sconto (ambra)" },
                      { value: "valore", label: 'Valore testuale (es. "4 giorni")' },
                      { value: "check", label: "Solo icona di spunta" }
                    ]
                  },
                  { type: "string", name: "silver_valore", label: 'Livello 1 \u2014 testo cella (non serve per "check")' },
                  {
                    type: "string",
                    name: "gold_tipo",
                    label: "Livello 2 \u2014 tipo cella",
                    required: true,
                    options: [
                      { value: "incluso", label: "Incluso (verde)" },
                      { value: "parziale", label: "Parziale/sconto (ambra)" },
                      { value: "valore", label: "Valore testuale" },
                      { value: "check", label: "Solo icona di spunta" }
                    ]
                  },
                  { type: "string", name: "gold_valore", label: 'Livello 2 \u2014 testo cella (non serve per "check")' },
                  {
                    type: "string",
                    name: "platinum_tipo",
                    label: "Livello 3 \u2014 tipo cella",
                    required: true,
                    options: [
                      { value: "incluso", label: "Incluso (verde)" },
                      { value: "parziale", label: "Parziale/sconto (ambra)" },
                      { value: "valore", label: "Valore testuale" },
                      { value: "check", label: "Solo icona di spunta" }
                    ]
                  },
                  { type: "string", name: "platinum_valore", label: 'Livello 3 \u2014 testo cella (non serve per "check")' },
                  { type: "string", name: "feature_en", label: "\u{1F1EC}\u{1F1E7} Nome caratteristica (inglese)" },
                  { type: "string", name: "feature_tooltip_en", label: "\u{1F1EC}\u{1F1E7} Tooltip (inglese)" },
                  { type: "string", name: "silver_valore_en", label: "\u{1F1EC}\u{1F1E7} Livello 1 \u2014 testo cella (inglese)" },
                  { type: "string", name: "gold_valore_en", label: "\u{1F1EC}\u{1F1E7} Livello 2 \u2014 testo cella (inglese)" },
                  { type: "string", name: "platinum_valore_en", label: "\u{1F1EC}\u{1F1E7} Livello 3 \u2014 testo cella (inglese)" }
                ]
              }
            ]
          },
          { type: "string", name: "titolo_en", label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)" },
          { type: "string", name: "titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Titolo evidenziato (inglese)" },
          { type: "string", name: "sottotitolo_en", label: "\u{1F1EC}\u{1F1E7} Sottotitolo (inglese)", ui: { component: "textarea" } },
          { type: "string", name: "platinum_badge_en", label: "\u{1F1EC}\u{1F1E7} Badge livello 3 (inglese)" },
          { type: "string", name: "cta_label_en", label: "\u{1F1EC}\u{1F1E7} Testo pulsante (inglese)" }
        ]
      },
      // ─── INFO CLUB ─────────────────────────────────────────────────────────
      // File unico con orari, indirizzo e contatti del Club.
      // Le modifiche si riflettono su tutte le pagine (sezione "Vieni a trovarci").
      // ───────────────────────────────────────────────────────────────────────
      {
        name: "info",
        label: "Informazioni Club",
        path: "src/content/info",
        format: "md",
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          {
            type: "string",
            name: "indirizzo",
            label: "Indirizzo",
            required: true
          },
          {
            type: "string",
            name: "come_arrivare",
            label: "Come arrivare",
            required: true
          },
          {
            type: "string",
            name: "come_arrivare_en",
            label: "\u{1F1EC}\u{1F1E7} Come arrivare (inglese)",
            required: true
          },
          {
            type: "string",
            name: "orari",
            label: "Orari Club (una riga per fascia)",
            required: true,
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "orari_en",
            label: "\u{1F1EC}\u{1F1E7} Orari Club (inglese)",
            required: true,
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "telefono",
            label: "Telefono",
            required: true
          },
          {
            type: "string",
            name: "email",
            label: "Email",
            required: true
          }
        ]
      },
      // ─── HELP DESK ─────────────────────────────────────────────────────────
      // Guide della knowledge base Club Life (sezione Help Desk).
      // Ogni guida è un file .md in src/content/helpdesk/
      // ───────────────────────────────────────────────────────────────────────
      {
        name: "helpdesk",
        label: "Help Desk",
        path: "src/content/helpdesk",
        format: "md",
        fields: [
          {
            type: "string",
            name: "titolo",
            label: "Titolo",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "categoria",
            label: "Categoria",
            required: true,
            options: [
              { value: "iscrizioni", label: "Iscrizioni & Tesseramento" },
              { value: "prenotazioni", label: "Prenotazioni" },
              { value: "app", label: "App & Area Riservata" },
              { value: "pagamenti", label: "Pagamenti & Ricevute" },
              { value: "regolamento", label: "Regolamento" },
              { value: "scuola", label: "Scuola Tennis" }
            ]
          },
          {
            type: "string",
            name: "sintesi",
            label: "Sintesi (anteprima nella card)",
            required: true,
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "tags",
            label: "Tag (per la ricerca)",
            list: true
          },
          {
            type: "datetime",
            name: "aggiornato",
            label: "Ultimo aggiornamento",
            required: true,
            ui: { dateFormat: "DD/MM/YYYY" }
          },
          {
            type: "string",
            name: "titolo_en",
            label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)"
          },
          {
            type: "string",
            name: "sintesi_en",
            label: "\u{1F1EC}\u{1F1E7} Sintesi (inglese)",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "tags_en",
            label: "\u{1F1EC}\u{1F1E7} Tag (inglese)",
            list: true
          },
          {
            type: "string",
            name: "corpo_en",
            label: "\u{1F1EC}\u{1F1E7} Testo guida (inglese) \u2014 un paragrafo per riga vuota, grassetto con **doppi asterischi**",
            ui: { component: "textarea" }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Testo guida (italiano)",
            isBody: true
          }
        ]
      },
      // ─── NEWS CLUB LIFE ────────────────────────────────────────────────────
      // Articoli della bacheca Club Life (carosello "News dal Club").
      // Ogni news è un file .md in src/content/news/
      // ───────────────────────────────────────────────────────────────────────
      {
        name: "news",
        label: "News Club Life",
        path: "src/content/news",
        format: "md",
        fields: [
          {
            type: "string",
            name: "titolo",
            label: "Titolo",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "data",
            label: "Data",
            required: true,
            ui: { dateFormat: "DD/MM/YYYY" }
          },
          {
            type: "string",
            name: "categoria",
            label: "Categoria (es. Corsi, Scuola Tennis)",
            required: true
          },
          {
            type: "string",
            name: "sintesi",
            label: "Sintesi (anteprima nella card)",
            required: true,
            ui: { component: "textarea" }
          },
          {
            type: "image",
            name: "immagine",
            label: "Immagine",
            required: true
          },
          {
            type: "string",
            name: "immagine_alt",
            label: "Testo alternativo immagine",
            required: true
          },
          {
            type: "boolean",
            name: "pubblicato",
            label: "Pubblicato"
          },
          {
            type: "string",
            name: "cta_label",
            label: "Pulsante \u2014 testo (es. Iscriviti ora)"
          },
          {
            type: "string",
            name: "cta_href",
            label: "Pulsante \u2014 link (URL esterno o percorso interno, es. /contatti). Il pulsante appare solo se compilato."
          },
          {
            type: "string",
            name: "titolo_en",
            label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)"
          },
          {
            type: "string",
            name: "categoria_en",
            label: "\u{1F1EC}\u{1F1E7} Categoria (inglese)"
          },
          {
            type: "string",
            name: "cta_label_en",
            label: "\u{1F1EC}\u{1F1E7} Pulsante \u2014 testo (inglese)"
          },
          {
            type: "string",
            name: "sintesi_en",
            label: "\u{1F1EC}\u{1F1E7} Sintesi (inglese)",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "immagine_alt_en",
            label: "\u{1F1EC}\u{1F1E7} Testo alternativo immagine (inglese)"
          },
          {
            type: "string",
            name: "corpo_en",
            label: "\u{1F1EC}\u{1F1E7} Testo articolo (inglese) \u2014 un paragrafo per riga vuota",
            ui: { component: "textarea" }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Testo articolo (italiano)",
            isBody: true
          }
        ]
      },
      // ─── PAGINE ──────────────────────────────────────────────────────────────
      // Una voce unica "Pagine" con un template per pagina: cliccandola si apre
      // l'elenco di tutte le pagine del sito, ognuna con SEO + hero (comuni a
      // tutte) più i propri campi di corpo pagina, dove presenti.
      // ───────────────────────────────────────────────────────────────────────
      (() => {
        const heroSeoFields = [
          { type: "string", name: "title", label: "Titolo SEO", isTitle: true, required: true },
          { type: "string", name: "description", label: "Descrizione SEO", required: true, ui: { component: "textarea" } },
          { type: "string", name: "hero_eyebrow", label: "Hero \u2014 eyebrow" },
          { type: "string", name: "hero_titolo", label: "Hero \u2014 titolo" },
          { type: "string", name: "hero_titolo_accent", label: "Hero \u2014 titolo (parte evidenziata in rosso)" },
          { type: "string", name: "hero_sottotitolo", label: "Hero \u2014 sottotitolo", ui: { component: "textarea" } },
          { type: "string", name: "hero_immagine", label: "Hero \u2014 percorso immagine (es. /nome-file.avif in public/)" },
          { type: "string", name: "hero_immagine_alt", label: "Hero \u2014 testo alternativo immagine" },
          { type: "string", name: "title_en", label: "\u{1F1EC}\u{1F1E7} Titolo SEO (inglese)" },
          { type: "string", name: "description_en", label: "\u{1F1EC}\u{1F1E7} Descrizione SEO (inglese)", ui: { component: "textarea" } },
          { type: "string", name: "hero_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Hero \u2014 eyebrow (inglese)" },
          { type: "string", name: "hero_titolo_en", label: "\u{1F1EC}\u{1F1E7} Hero \u2014 titolo (inglese)" },
          { type: "string", name: "hero_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Hero \u2014 titolo evidenziato (inglese)" },
          { type: "string", name: "hero_sottotitolo_en", label: "\u{1F1EC}\u{1F1E7} Hero \u2014 sottotitolo (inglese)", ui: { component: "textarea" } },
          { type: "string", name: "hero_immagine_alt_en", label: "\u{1F1EC}\u{1F1E7} Hero \u2014 testo alternativo immagine (inglese)" }
        ];
        return {
          name: "pagine",
          label: "Pagine",
          path: "src/content/pagine",
          format: "md",
          templates: [
            {
              name: "generica",
              label: "Pagina generica (solo SEO + Hero)",
              fields: [...heroSeoFields]
            },
            {
              name: "storia",
              label: "Storia",
              fields: [
                ...heroSeoFields,
                { type: "string", name: "storia_sezione1_eyebrow", label: 'Sezione 1 \u2014 eyebrow (es. "La timeline")', required: true },
                { type: "string", name: "storia_sezione1_titolo", label: "Sezione 1 \u2014 titolo", required: true },
                { type: "string", name: "storia_sezione1_titolo_accent", label: "Sezione 1 \u2014 titolo (parte evidenziata in rosso)", required: true },
                {
                  type: "object",
                  name: "storia_timeline",
                  label: "Timeline",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.anno ? `${item.anno} \u2014 ${item.testo || ""}` : "Nuova voce" }) },
                  fields: [
                    { type: "string", name: "anno", label: "Anno", required: true },
                    { type: "string", name: "testo", label: "Testo", required: true, ui: { component: "textarea" } },
                    { type: "string", name: "testo_en", label: "\u{1F1EC}\u{1F1E7} Testo (inglese)", ui: { component: "textarea" } }
                  ]
                },
                { type: "string", name: "storia_sezione2_eyebrow", label: 'Sezione 2 \u2014 eyebrow (es. "Il club oggi")', required: true },
                { type: "string", name: "storia_sezione2_titolo", label: "Sezione 2 \u2014 titolo", required: true },
                { type: "string", name: "storia_sezione2_titolo_accent", label: "Sezione 2 \u2014 titolo (parte evidenziata in rosso)", required: true },
                { type: "string", name: "storia_paragrafo1", label: "Paragrafo 1 \u2014 grassetto con **doppi asterischi**", required: true, ui: { component: "textarea" } },
                { type: "string", name: "storia_paragrafo2", label: "Paragrafo 2 \u2014 grassetto con **doppi asterischi**", required: true, ui: { component: "textarea" } },
                {
                  type: "object",
                  name: "storia_galleria",
                  label: "Galleria immagini",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.alt || "Immagine" }) },
                  fields: [
                    { type: "image", name: "immagine", label: "Immagine", required: true },
                    { type: "string", name: "alt", label: "Testo alternativo", required: true }
                  ]
                },
                { type: "string", name: "storia_sezione1_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 eyebrow (inglese)" },
                { type: "string", name: "storia_sezione1_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 titolo (inglese)" },
                { type: "string", name: "storia_sezione1_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "storia_sezione2_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione 2 \u2014 eyebrow (inglese)" },
                { type: "string", name: "storia_sezione2_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione 2 \u2014 titolo (inglese)" },
                { type: "string", name: "storia_sezione2_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione 2 \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "storia_paragrafo1_en", label: "\u{1F1EC}\u{1F1E7} Paragrafo 1 (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "storia_paragrafo2_en", label: "\u{1F1EC}\u{1F1E7} Paragrafo 2 (inglese)", ui: { component: "textarea" } }
              ]
            },
            {
              name: "summer_camps",
              label: "Summer Camps",
              fields: [
                ...heroSeoFields,
                { type: "string", name: "camps_sezione1_eyebrow", label: "Sezione 1 \u2014 eyebrow", required: true },
                { type: "string", name: "camps_sezione1_titolo", label: "Sezione 1 \u2014 titolo", required: true },
                { type: "string", name: "camps_sezione1_titolo_accent", label: "Sezione 1 \u2014 titolo evidenziato", required: true },
                {
                  type: "object",
                  name: "camps_features",
                  label: "Caratteristiche del programma",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.titolo || "Nuova caratteristica" }) },
                  fields: [
                    { type: "string", name: "titolo", label: "Titolo", required: true },
                    { type: "string", name: "testo", label: "Testo", required: true, ui: { component: "textarea" } },
                    { type: "string", name: "titolo_en", label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)" },
                    { type: "string", name: "testo_en", label: "\u{1F1EC}\u{1F1E7} Testo (inglese)", ui: { component: "textarea" } }
                  ]
                },
                { type: "image", name: "camps_immagine1", label: "Immagine 1 (grande)", required: true },
                { type: "string", name: "camps_immagine1_alt", label: "Immagine 1 \u2014 testo alternativo", required: true },
                { type: "image", name: "camps_immagine2", label: "Immagine 2 (piccola)", required: true },
                { type: "string", name: "camps_immagine2_alt", label: "Immagine 2 \u2014 testo alternativo", required: true },
                { type: "string", name: "camps_sezione2_eyebrow", label: "Sezione 2 \u2014 eyebrow", required: true },
                { type: "string", name: "camps_sezione2_titolo", label: "Sezione 2 \u2014 titolo", required: true },
                { type: "string", name: "camps_sezione2_titolo_accent", label: "Sezione 2 \u2014 titolo evidenziato", required: true },
                {
                  type: "object",
                  name: "camps_settimane",
                  label: "Settimane disponibili",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.settimana ? `${item.settimana} \u2014 ${item.date || ""}` : "Nuova settimana" }) },
                  fields: [
                    { type: "string", name: "settimana", label: 'Settimana (es. "1\xAA Settimana")', required: true },
                    { type: "string", name: "date", label: 'Date (es. "8 \u2013 12 Giugno 2026")', required: true },
                    { type: "string", name: "settimana_en", label: '\u{1F1EC}\u{1F1E7} Settimana (inglese, es. "Week 1")' },
                    { type: "string", name: "date_en", label: "\u{1F1EC}\u{1F1E7} Date (inglese)" }
                  ]
                },
                { type: "string", name: "camps_sezione1_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 eyebrow (inglese)" },
                { type: "string", name: "camps_sezione1_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 titolo (inglese)" },
                { type: "string", name: "camps_sezione1_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "camps_immagine1_alt_en", label: "\u{1F1EC}\u{1F1E7} Immagine 1 \u2014 alt (inglese)" },
                { type: "string", name: "camps_immagine2_alt_en", label: "\u{1F1EC}\u{1F1E7} Immagine 2 \u2014 alt (inglese)" },
                { type: "string", name: "camps_sezione2_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione 2 \u2014 eyebrow (inglese)" },
                { type: "string", name: "camps_sezione2_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione 2 \u2014 titolo (inglese)" },
                { type: "string", name: "camps_sezione2_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione 2 \u2014 titolo evidenziato (inglese)" }
              ]
            },
            {
              name: "scuola_tennis",
              label: "Scuola Tennis",
              fields: [
                ...heroSeoFields,
                { type: "string", name: "scuola_sezione1_eyebrow", label: "Sezione 1 \u2014 eyebrow", required: true },
                { type: "string", name: "scuola_sezione1_titolo", label: "Sezione 1 \u2014 titolo", required: true },
                { type: "string", name: "scuola_sezione1_titolo_accent", label: "Sezione 1 \u2014 titolo evidenziato", required: true },
                { type: "string", name: "scuola_sezione1_lead", label: "Sezione 1 \u2014 testo introduttivo", required: true, ui: { component: "textarea" } },
                {
                  type: "object",
                  name: "scuola_livelli",
                  label: "Livelli (percorso a colori)",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.nome || "Nuovo livello" }) },
                  fields: [
                    {
                      type: "string",
                      name: "dot",
                      label: "Colore",
                      required: true,
                      options: [
                        { value: "rosso", label: "Rosso" },
                        { value: "arancio", label: "Arancio" },
                        { value: "verde", label: "Verde" },
                        { value: "giallo", label: "Giallo" }
                      ]
                    },
                    { type: "string", name: "nome", label: "Nome livello", required: true },
                    { type: "string", name: "tag", label: 'Tag (es. "Mini Tennis")', required: true },
                    { type: "string", name: "range", label: "Fascia et\xE0", required: true },
                    { type: "string", name: "testo", label: "Testo", required: true, ui: { component: "textarea" } },
                    { type: "string", name: "nome_en", label: "\u{1F1EC}\u{1F1E7} Nome (inglese)" },
                    { type: "string", name: "tag_en", label: "\u{1F1EC}\u{1F1E7} Tag (inglese)" },
                    { type: "string", name: "range_en", label: "\u{1F1EC}\u{1F1E7} Fascia et\xE0 (inglese)" },
                    { type: "string", name: "testo_en", label: "\u{1F1EC}\u{1F1E7} Testo (inglese)", ui: { component: "textarea" } }
                  ]
                },
                { type: "string", name: "scuola_livelli_footer_testo", label: "Testo dopo i livelli (prima del link)", required: true },
                { type: "string", name: "scuola_livelli_footer_link_label", label: "Etichetta link (verso /agonistica)", required: true },
                { type: "string", name: "scuola_sezione2_eyebrow", label: "Sezione 2 \u2014 eyebrow", required: true },
                { type: "string", name: "scuola_sezione2_titolo", label: "Sezione 2 \u2014 titolo", required: true },
                { type: "string", name: "scuola_sezione2_titolo_accent", label: "Sezione 2 \u2014 titolo evidenziato", required: true },
                {
                  type: "object",
                  name: "scuola_iscrizione_cards",
                  label: "Card iscrizione",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.titolo || "Nuova card" }) },
                  fields: [
                    { type: "string", name: "titolo", label: "Titolo", required: true },
                    { type: "string", name: "tag", label: 'Tag (es. "Nati nel 2020 e 2021")', required: true },
                    { type: "string", name: "testo", label: "Testo", required: true, ui: { component: "textarea" } },
                    { type: "string", name: "titolo_en", label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)" },
                    { type: "string", name: "tag_en", label: "\u{1F1EC}\u{1F1E7} Tag (inglese)" },
                    { type: "string", name: "testo_en", label: "\u{1F1EC}\u{1F1E7} Testo (inglese)", ui: { component: "textarea" } }
                  ]
                },
                { type: "string", name: "scuola_iscrizione_cta_label", label: "Testo pulsante iscrizione", required: true },
                { type: "string", name: "scuola_sezione3_eyebrow", label: "Sezione 3 \u2014 eyebrow", required: true },
                { type: "string", name: "scuola_sezione3_titolo", label: "Sezione 3 \u2014 titolo", required: true },
                { type: "string", name: "scuola_sezione3_titolo_accent", label: "Sezione 3 \u2014 titolo evidenziato", required: true },
                { type: "string", name: "scuola_sezione3_badge", label: 'Sezione 3 \u2014 badge (es. "Vavassori Tennis Academy...")', required: true },
                { type: "string", name: "scuola_sezione3_paragrafo1", label: "Sezione 3 \u2014 paragrafo 1 (**grassetto**)", required: true, ui: { component: "textarea" } },
                { type: "string", name: "scuola_sezione3_paragrafo2", label: "Sezione 3 \u2014 paragrafo 2", required: true, ui: { component: "textarea" } },
                { type: "string", name: "scuola_sezione3_paragrafo3", label: "Sezione 3 \u2014 paragrafo 3 (**grassetto**)", required: true, ui: { component: "textarea" } },
                { type: "image", name: "scuola_sezione3_immagine", label: "Sezione 3 \u2014 immagine", required: true },
                { type: "string", name: "scuola_sezione3_immagine_alt", label: "Sezione 3 \u2014 immagine, testo alternativo", required: true },
                { type: "string", name: "scuola_sezione4_eyebrow", label: "Sezione 4 \u2014 eyebrow", required: true },
                { type: "string", name: "scuola_sezione4_titolo", label: "Sezione 4 \u2014 titolo", required: true },
                { type: "string", name: "scuola_sezione4_titolo_accent", label: "Sezione 4 \u2014 titolo evidenziato", required: true },
                {
                  type: "object",
                  name: "scuola_tornei",
                  label: "Tornei durante l'anno",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.nome || "Nuovo torneo" }) },
                  fields: [
                    { type: "string", name: "quando", label: 'Quando (es. "Dicembre")', required: true },
                    { type: "string", name: "nome", label: "Nome torneo", required: true },
                    { type: "string", name: "testo", label: "Testo", required: true, ui: { component: "textarea" } },
                    { type: "string", name: "quando_en", label: "\u{1F1EC}\u{1F1E7} Quando (inglese)" },
                    { type: "string", name: "nome_en", label: "\u{1F1EC}\u{1F1E7} Nome (inglese)" },
                    { type: "string", name: "testo_en", label: "\u{1F1EC}\u{1F1E7} Testo (inglese)", ui: { component: "textarea" } }
                  ]
                },
                { type: "string", name: "scuola_sezione4_footer_testo", label: "Testo finale (FITP Junior Program, **grassetto**)", required: true, ui: { component: "textarea" } },
                { type: "string", name: "scuola_sezione1_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 eyebrow (inglese)" },
                { type: "string", name: "scuola_sezione1_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 titolo (inglese)" },
                { type: "string", name: "scuola_sezione1_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "scuola_sezione1_lead_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 testo introduttivo (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "scuola_livelli_footer_testo_en", label: "\u{1F1EC}\u{1F1E7} Testo dopo i livelli (inglese)" },
                { type: "string", name: "scuola_livelli_footer_link_label_en", label: "\u{1F1EC}\u{1F1E7} Etichetta link (inglese)" },
                { type: "string", name: "scuola_sezione2_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione 2 \u2014 eyebrow (inglese)" },
                { type: "string", name: "scuola_sezione2_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione 2 \u2014 titolo (inglese)" },
                { type: "string", name: "scuola_sezione2_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione 2 \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "scuola_iscrizione_cta_label_en", label: "\u{1F1EC}\u{1F1E7} Testo pulsante iscrizione (inglese)" },
                { type: "string", name: "scuola_sezione3_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione 3 \u2014 eyebrow (inglese)" },
                { type: "string", name: "scuola_sezione3_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione 3 \u2014 titolo (inglese)" },
                { type: "string", name: "scuola_sezione3_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione 3 \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "scuola_sezione3_badge_en", label: "\u{1F1EC}\u{1F1E7} Sezione 3 \u2014 badge (inglese)" },
                { type: "string", name: "scuola_sezione3_paragrafo1_en", label: "\u{1F1EC}\u{1F1E7} Sezione 3 \u2014 paragrafo 1 (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "scuola_sezione3_paragrafo2_en", label: "\u{1F1EC}\u{1F1E7} Sezione 3 \u2014 paragrafo 2 (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "scuola_sezione3_paragrafo3_en", label: "\u{1F1EC}\u{1F1E7} Sezione 3 \u2014 paragrafo 3 (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "scuola_sezione3_immagine_alt_en", label: "\u{1F1EC}\u{1F1E7} Sezione 3 \u2014 immagine, alt (inglese)" },
                { type: "string", name: "scuola_sezione4_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione 4 \u2014 eyebrow (inglese)" },
                { type: "string", name: "scuola_sezione4_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione 4 \u2014 titolo (inglese)" },
                { type: "string", name: "scuola_sezione4_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione 4 \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "scuola_sezione4_footer_testo_en", label: "\u{1F1EC}\u{1F1E7} Testo finale (inglese)", ui: { component: "textarea" } }
              ]
            },
            {
              name: "personal_trainer",
              label: "Personal Trainer",
              fields: [
                ...heroSeoFields,
                { type: "string", name: "pt_sezione1_eyebrow", label: "Sezione 1 \u2014 eyebrow", required: true },
                { type: "string", name: "pt_sezione1_titolo", label: "Sezione 1 \u2014 titolo", required: true },
                { type: "string", name: "pt_sezione1_titolo_accent", label: "Sezione 1 \u2014 titolo evidenziato", required: true },
                { type: "string", name: "pt_sezione1_paragrafo1", label: "Sezione 1 \u2014 paragrafo 1", required: true, ui: { component: "textarea" } },
                { type: "string", name: "pt_sezione1_paragrafo2", label: "Sezione 1 \u2014 paragrafo 2", required: true, ui: { component: "textarea" } },
                {
                  type: "object",
                  name: "pt_stats",
                  label: "Statistiche",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.numero ? `${item.numero} \u2014 ${item.etichetta || ""}` : "Nuova statistica" }) },
                  fields: [
                    { type: "string", name: "numero", label: `Numero/simbolo (es. "5", "1:1", "60'", "\u221E")`, required: true },
                    { type: "string", name: "etichetta", label: "Etichetta (una riga per fascia)", required: true, ui: { component: "textarea" } },
                    { type: "string", name: "etichetta_en", label: "\u{1F1EC}\u{1F1E7} Etichetta (inglese)", ui: { component: "textarea" } }
                  ]
                },
                { type: "string", name: "pt_sezione2_eyebrow", label: "Sezione 2 \u2014 eyebrow", required: true },
                { type: "string", name: "pt_sezione2_titolo", label: "Sezione 2 \u2014 titolo", required: true },
                { type: "string", name: "pt_sezione2_titolo_accent", label: "Sezione 2 \u2014 titolo evidenziato", required: true },
                {
                  type: "object",
                  name: "pt_trainers",
                  label: "Trainer",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.nome || "Nuovo trainer" }) },
                  fields: [
                    { type: "string", name: "nome", label: "Nome", required: true },
                    { type: "image", name: "foto", label: "Foto (se assente, mostra un placeholder col nome)" },
                    { type: "string", name: "specializzazioni", label: "Specializzazioni", list: true, required: true },
                    { type: "string", name: "qualifiche", label: "Qualifiche e certificazioni", list: true, required: true },
                    { type: "string", name: "lingue", label: "Lingue parlate (lascia vuoto per non mostrare la riga)", list: true },
                    { type: "string", name: "specializzazioni_en", label: "\u{1F1EC}\u{1F1E7} Specializzazioni (inglese)", list: true },
                    { type: "string", name: "qualifiche_en", label: "\u{1F1EC}\u{1F1E7} Qualifiche (inglese)", list: true },
                    { type: "string", name: "lingue_en", label: "\u{1F1EC}\u{1F1E7} Lingue (inglese)", list: true }
                  ]
                },
                { type: "string", name: "pt_sezione3_eyebrow", label: "Sezione 3 \u2014 eyebrow", required: true },
                { type: "string", name: "pt_sezione3_titolo", label: "Sezione 3 \u2014 titolo", required: true },
                { type: "string", name: "pt_sezione3_titolo_accent", label: "Sezione 3 \u2014 titolo evidenziato", required: true },
                {
                  type: "object",
                  name: "pt_steps",
                  label: "Come funziona \u2014 step",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.titolo || "Nuovo step" }) },
                  fields: [
                    { type: "string", name: "titolo", label: "Titolo", required: true },
                    { type: "string", name: "testo", label: "Testo", required: true, ui: { component: "textarea" } },
                    { type: "string", name: "titolo_en", label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)" },
                    { type: "string", name: "testo_en", label: "\u{1F1EC}\u{1F1E7} Testo (inglese)", ui: { component: "textarea" } }
                  ]
                },
                { type: "string", name: "pt_sezione4_titolo", label: "CTA finale \u2014 titolo", required: true },
                { type: "string", name: "pt_sezione4_sottotitolo", label: "CTA finale \u2014 sottotitolo", required: true, ui: { component: "textarea" } },
                { type: "string", name: "pt_sezione4_cta_label", label: "CTA finale \u2014 testo pulsante", required: true },
                { type: "string", name: "pt_sezione1_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 eyebrow (inglese)" },
                { type: "string", name: "pt_sezione1_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 titolo (inglese)" },
                { type: "string", name: "pt_sezione1_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "pt_sezione1_paragrafo1_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 paragrafo 1 (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "pt_sezione1_paragrafo2_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 paragrafo 2 (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "pt_sezione2_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione 2 \u2014 eyebrow (inglese)" },
                { type: "string", name: "pt_sezione2_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione 2 \u2014 titolo (inglese)" },
                { type: "string", name: "pt_sezione2_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione 2 \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "pt_sezione3_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione 3 \u2014 eyebrow (inglese)" },
                { type: "string", name: "pt_sezione3_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione 3 \u2014 titolo (inglese)" },
                { type: "string", name: "pt_sezione3_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione 3 \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "pt_sezione4_titolo_en", label: "\u{1F1EC}\u{1F1E7} CTA finale \u2014 titolo (inglese)" },
                { type: "string", name: "pt_sezione4_sottotitolo_en", label: "\u{1F1EC}\u{1F1E7} CTA finale \u2014 sottotitolo (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "pt_sezione4_cta_label_en", label: "\u{1F1EC}\u{1F1E7} CTA finale \u2014 testo pulsante (inglese)" }
              ]
            },
            {
              name: "preparazione_atletica",
              label: "Preparazione Atletica",
              fields: [
                ...heroSeoFields,
                { type: "string", name: "prep_sala_eyebrow", label: "Sala Attrezzi \u2014 eyebrow", required: true },
                { type: "string", name: "prep_sala_titolo", label: "Sala Attrezzi \u2014 titolo", required: true },
                { type: "string", name: "prep_sala_titolo_accent", label: "Sala Attrezzi \u2014 titolo evidenziato", required: true },
                { type: "string", name: "prep_sala_paragrafo1", label: "Sala Attrezzi \u2014 paragrafo 1 (**grassetto**)", required: true, ui: { component: "textarea" } },
                { type: "string", name: "prep_sala_paragrafo2", label: "Sala Attrezzi \u2014 paragrafo 2 (**grassetto**)", required: true, ui: { component: "textarea" } },
                {
                  type: "object",
                  name: "prep_sala_slideshow",
                  label: "Sala Attrezzi \u2014 slideshow foto",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.alt || "Foto" }) },
                  fields: [
                    { type: "image", name: "immagine", label: "Immagine", required: true },
                    { type: "string", name: "alt", label: "Testo alternativo", required: true },
                    { type: "string", name: "alt_en", label: "\u{1F1EC}\u{1F1E7} Testo alternativo (inglese)" }
                  ]
                },
                {
                  type: "object",
                  name: "prep_sala_features",
                  label: "Sala Attrezzi \u2014 caratteristiche (ordine fisso, icone in codice)",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.titolo || "Nuova caratteristica" }) },
                  fields: [
                    { type: "string", name: "titolo", label: "Titolo", required: true },
                    { type: "string", name: "testo", label: "Testo", required: true },
                    { type: "string", name: "titolo_en", label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)" },
                    { type: "string", name: "testo_en", label: "\u{1F1EC}\u{1F1E7} Testo (inglese)" }
                  ]
                },
                { type: "string", name: "prep_sala_cta_label", label: "Sala Attrezzi \u2014 testo link Personal Trainer", required: true },
                { type: "string", name: "prep_corsi_eyebrow", label: "Corsi di Gruppo \u2014 eyebrow", required: true },
                { type: "string", name: "prep_corsi_titolo", label: "Corsi di Gruppo \u2014 titolo", required: true },
                { type: "string", name: "prep_corsi_titolo_accent", label: "Corsi di Gruppo \u2014 titolo evidenziato", required: true },
                { type: "string", name: "prep_corsi_sub", label: "Corsi di Gruppo \u2014 testo introduttivo", required: true, ui: { component: "textarea" } },
                {
                  type: "object",
                  name: "prep_categorie",
                  label: "Categorie e corsi",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.label || "Nuova categoria" }) },
                  fields: [
                    {
                      type: "string",
                      name: "id",
                      label: "ID categoria (fisso, non cambiare)",
                      required: true,
                      options: [
                        { value: "endurance", label: "endurance" },
                        { value: "strength", label: "strength" },
                        { value: "balance", label: "balance" }
                      ]
                    },
                    { type: "string", name: "label", label: "Nome categoria", required: true },
                    { type: "string", name: "desc", label: "Descrizione categoria", required: true, ui: { component: "textarea" } },
                    { type: "string", name: "color", label: "Colore (hex, es. #B83A00)", required: true },
                    { type: "string", name: "desc_en", label: "\u{1F1EC}\u{1F1E7} Descrizione categoria (inglese)", ui: { component: "textarea" } },
                    {
                      type: "object",
                      name: "corsi",
                      label: "Corsi",
                      list: true,
                      required: true,
                      ui: { itemProps: (item) => ({ label: item?.nome || "Nuovo corso" }) },
                      fields: [
                        { type: "string", name: "nome", label: "Nome corso", required: true },
                        { type: "string", name: "durata", label: 'Durata (es. "60 min")', required: true },
                        { type: "number", name: "intensita", label: "Intensit\xE0 (numero da 1 a 3)", required: true },
                        { type: "string", name: "livello", label: 'Livello (es. "Tutti i livelli", "Intermedio")', required: true },
                        { type: "string", name: "desc", label: "Descrizione", required: true, ui: { component: "textarea" } },
                        { type: "image", name: "immagine", label: "Immagine", required: true },
                        { type: "string", name: "nome_en", label: "\u{1F1EC}\u{1F1E7} Nome corso (inglese)" },
                        { type: "string", name: "livello_en", label: "\u{1F1EC}\u{1F1E7} Livello (inglese)" },
                        { type: "string", name: "desc_en", label: "\u{1F1EC}\u{1F1E7} Descrizione (inglese)", ui: { component: "textarea" } }
                      ]
                    }
                  ]
                },
                { type: "string", name: "prep_calendario_eyebrow", label: "Calendario \u2014 eyebrow", required: true },
                { type: "string", name: "prep_calendario_titolo", label: "Calendario \u2014 titolo", required: true },
                { type: "string", name: "prep_calendario_titolo_accent", label: "Calendario \u2014 titolo evidenziato", required: true },
                { type: "string", name: "prep_calendario_sub", label: "Calendario \u2014 testo introduttivo", required: true },
                { type: "string", name: "prep_sala_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sala Attrezzi \u2014 eyebrow (inglese)" },
                { type: "string", name: "prep_sala_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sala Attrezzi \u2014 titolo (inglese)" },
                { type: "string", name: "prep_sala_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sala Attrezzi \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "prep_sala_paragrafo1_en", label: "\u{1F1EC}\u{1F1E7} Sala Attrezzi \u2014 paragrafo 1 (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "prep_sala_paragrafo2_en", label: "\u{1F1EC}\u{1F1E7} Sala Attrezzi \u2014 paragrafo 2 (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "prep_sala_cta_label_en", label: "\u{1F1EC}\u{1F1E7} Sala Attrezzi \u2014 testo link (inglese)" },
                { type: "string", name: "prep_corsi_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Corsi di Gruppo \u2014 eyebrow (inglese)" },
                { type: "string", name: "prep_corsi_titolo_en", label: "\u{1F1EC}\u{1F1E7} Corsi di Gruppo \u2014 titolo (inglese)" },
                { type: "string", name: "prep_corsi_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Corsi di Gruppo \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "prep_corsi_sub_en", label: "\u{1F1EC}\u{1F1E7} Corsi di Gruppo \u2014 testo introduttivo (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "prep_calendario_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Calendario \u2014 eyebrow (inglese)" },
                { type: "string", name: "prep_calendario_titolo_en", label: "\u{1F1EC}\u{1F1E7} Calendario \u2014 titolo (inglese)" },
                { type: "string", name: "prep_calendario_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Calendario \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "prep_calendario_sub_en", label: "\u{1F1EC}\u{1F1E7} Calendario \u2014 testo introduttivo (inglese)" }
              ]
            },
            {
              name: "tennis",
              label: "Tennis",
              fields: [
                ...heroSeoFields,
                { type: "string", name: "tennis_campi_eyebrow", label: "Sezione Campi \u2014 eyebrow", required: true },
                { type: "string", name: "tennis_campi_titolo", label: "Sezione Campi \u2014 titolo", required: true },
                { type: "string", name: "tennis_campi_titolo_accent", label: "Sezione Campi \u2014 titolo evidenziato", required: true },
                {
                  type: "object",
                  name: "tennis_campi",
                  label: "Tipi di campo (foto non gestita da qui)",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.titolo || "Nuovo campo" }) },
                  fields: [
                    { type: "string", name: "titolo", label: "Titolo", required: true },
                    { type: "string", name: "testo", label: "Testo", required: true },
                    { type: "string", name: "titolo_en", label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)" },
                    { type: "string", name: "testo_en", label: "\u{1F1EC}\u{1F1E7} Testo (inglese)" }
                  ]
                },
                { type: "string", name: "tennis_soci_eyebrow", label: "Sezione Soci \u2014 eyebrow", required: true },
                { type: "string", name: "tennis_soci_titolo", label: "Sezione Soci \u2014 titolo", required: true },
                { type: "string", name: "tennis_soci_titolo_accent", label: "Sezione Soci \u2014 titolo evidenziato", required: true },
                { type: "string", name: "tennis_soci_testo", label: "Sezione Soci \u2014 testo (**grassetto**)", required: true, ui: { component: "textarea" } },
                { type: "string", name: "tennis_corsi_eyebrow", label: "Sezione Corsi \u2014 eyebrow", required: true },
                { type: "string", name: "tennis_corsi_titolo", label: "Sezione Corsi \u2014 titolo", required: true },
                { type: "string", name: "tennis_corsi_titolo_accent", label: "Sezione Corsi \u2014 titolo evidenziato", required: true },
                { type: "string", name: "tennis_corsi_intro", label: "Sezione Corsi \u2014 testo introduttivo (**grassetto**)", required: true, ui: { component: "textarea" } },
                {
                  type: "object",
                  name: "tennis_corsi_livelli",
                  label: "Sezione Corsi \u2014 livelli",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.titolo || "Nuovo livello" }) },
                  fields: [
                    { type: "string", name: "titolo", label: "Titolo", required: true },
                    { type: "string", name: "testo", label: "Testo", required: true },
                    { type: "string", name: "titolo_en", label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)" },
                    { type: "string", name: "testo_en", label: "\u{1F1EC}\u{1F1E7} Testo (inglese)" }
                  ]
                },
                { type: "string", name: "tennis_corsi_cta_label", label: "Sezione Corsi \u2014 testo pulsante", required: true },
                { type: "string", name: "tennis_campi_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione Campi \u2014 eyebrow (inglese)" },
                { type: "string", name: "tennis_campi_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione Campi \u2014 titolo (inglese)" },
                { type: "string", name: "tennis_campi_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione Campi \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "tennis_soci_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione Soci \u2014 eyebrow (inglese)" },
                { type: "string", name: "tennis_soci_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione Soci \u2014 titolo (inglese)" },
                { type: "string", name: "tennis_soci_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione Soci \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "tennis_soci_testo_en", label: "\u{1F1EC}\u{1F1E7} Sezione Soci \u2014 testo (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "tennis_corsi_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione Corsi \u2014 eyebrow (inglese)" },
                { type: "string", name: "tennis_corsi_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione Corsi \u2014 titolo (inglese)" },
                { type: "string", name: "tennis_corsi_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione Corsi \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "tennis_corsi_intro_en", label: "\u{1F1EC}\u{1F1E7} Sezione Corsi \u2014 testo introduttivo (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "tennis_corsi_cta_label_en", label: "\u{1F1EC}\u{1F1E7} Sezione Corsi \u2014 testo pulsante (inglese)" }
              ]
            },
            {
              name: "agonistica",
              label: "Agonistica",
              fields: [
                ...heroSeoFields,
                { type: "string", name: "agonistica_eyebrow", label: "Eyebrow", required: true },
                { type: "string", name: "agonistica_titolo", label: "Titolo", required: true },
                { type: "string", name: "agonistica_titolo_accent", label: "Titolo evidenziato", required: true },
                {
                  type: "object",
                  name: "agonistica_step",
                  label: "Percorso \u2014 step",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.titolo || "Nuovo step" }) },
                  fields: [
                    { type: "string", name: "titolo", label: "Titolo", required: true },
                    { type: "string", name: "testo", label: "Testo", required: true },
                    { type: "string", name: "titolo_en", label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)" },
                    { type: "string", name: "testo_en", label: "\u{1F1EC}\u{1F1E7} Testo (inglese)" }
                  ]
                },
                { type: "string", name: "agonistica_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Eyebrow (inglese)" },
                { type: "string", name: "agonistica_titolo_en", label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)" },
                { type: "string", name: "agonistica_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Titolo evidenziato (inglese)" }
              ]
            },
            {
              name: "torneo_avvenire",
              label: "Torneo Avvenire",
              fields: [
                ...heroSeoFields,
                { type: "string", name: "torneo_quote_testo", label: "Citazione", required: true },
                { type: "string", name: "torneo_quote_autore", label: "Autore citazione", required: true },
                { type: "string", name: "torneo_storia_eyebrow", label: "Sezione Storia \u2014 eyebrow", required: true },
                { type: "string", name: "torneo_storia_titolo", label: "Sezione Storia \u2014 titolo", required: true },
                { type: "string", name: "torneo_storia_titolo_accent", label: "Sezione Storia \u2014 titolo evidenziato", required: true },
                { type: "string", name: "torneo_storia_paragrafo1", label: "Sezione Storia \u2014 paragrafo 1 (**grassetto**)", required: true, ui: { component: "textarea" } },
                { type: "string", name: "torneo_storia_paragrafo2", label: "Sezione Storia \u2014 paragrafo 2 (**grassetto**)", required: true, ui: { component: "textarea" } },
                {
                  type: "object",
                  name: "torneo_stats",
                  label: "Statistiche",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.numero ? `${item.numero} \u2014 ${item.label || ""}` : "Nuova statistica" }) },
                  fields: [
                    { type: "string", name: "numero", label: 'Numero (es. "60+", "U14")', required: true },
                    { type: "string", name: "label", label: "Etichetta", required: true },
                    { type: "string", name: "label_en", label: "\u{1F1EC}\u{1F1E7} Etichetta (inglese)" }
                  ]
                },
                { type: "string", name: "torneo_alumni_eyebrow", label: "Sezione Alumni \u2014 eyebrow", required: true },
                { type: "string", name: "torneo_alumni_titolo", label: "Sezione Alumni \u2014 titolo", required: true },
                { type: "string", name: "torneo_alumni_titolo_accent", label: "Sezione Alumni \u2014 titolo evidenziato", required: true },
                { type: "string", name: "torneo_alumni_intro", label: "Sezione Alumni \u2014 testo introduttivo", required: true, ui: { component: "textarea" } },
                { type: "string", name: "torneo_galleria_eyebrow", label: "Sezione Galleria \u2014 eyebrow", required: true },
                { type: "string", name: "torneo_galleria_titolo", label: "Sezione Galleria \u2014 titolo", required: true },
                { type: "string", name: "torneo_galleria_titolo_accent", label: "Sezione Galleria \u2014 titolo evidenziato", required: true },
                { type: "string", name: "torneo_prossima_eyebrow", label: "Sezione Prossima edizione \u2014 eyebrow", required: true },
                { type: "string", name: "torneo_prossima_titolo", label: "Sezione Prossima edizione \u2014 titolo", required: true },
                { type: "string", name: "torneo_prossima_titolo_accent", label: "Sezione Prossima edizione \u2014 titolo evidenziato", required: true },
                { type: "string", name: "torneo_prossima_testo", label: "Sezione Prossima edizione \u2014 testo", required: true, ui: { component: "textarea" } },
                { type: "string", name: "torneo_quote_testo_en", label: "\u{1F1EC}\u{1F1E7} Citazione (inglese)" },
                { type: "string", name: "torneo_quote_autore_en", label: "\u{1F1EC}\u{1F1E7} Autore citazione (inglese)" },
                { type: "string", name: "torneo_storia_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione Storia \u2014 eyebrow (inglese)" },
                { type: "string", name: "torneo_storia_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione Storia \u2014 titolo (inglese)" },
                { type: "string", name: "torneo_storia_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione Storia \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "torneo_storia_paragrafo1_en", label: "\u{1F1EC}\u{1F1E7} Sezione Storia \u2014 paragrafo 1 (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "torneo_storia_paragrafo2_en", label: "\u{1F1EC}\u{1F1E7} Sezione Storia \u2014 paragrafo 2 (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "torneo_alumni_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione Alumni \u2014 eyebrow (inglese)" },
                { type: "string", name: "torneo_alumni_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione Alumni \u2014 titolo (inglese)" },
                { type: "string", name: "torneo_alumni_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione Alumni \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "torneo_alumni_intro_en", label: "\u{1F1EC}\u{1F1E7} Sezione Alumni \u2014 testo introduttivo (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "torneo_galleria_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione Galleria \u2014 eyebrow (inglese)" },
                { type: "string", name: "torneo_galleria_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione Galleria \u2014 titolo (inglese)" },
                { type: "string", name: "torneo_galleria_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione Galleria \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "torneo_prossima_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione Prossima edizione \u2014 eyebrow (inglese)" },
                { type: "string", name: "torneo_prossima_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione Prossima edizione \u2014 titolo (inglese)" },
                { type: "string", name: "torneo_prossima_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione Prossima edizione \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "torneo_prossima_testo_en", label: "\u{1F1EC}\u{1F1E7} Sezione Prossima edizione \u2014 testo (inglese)", ui: { component: "textarea" } }
              ]
            }
          ]
        };
      })()
    ]
  }
});
export {
  config_default as default
};
