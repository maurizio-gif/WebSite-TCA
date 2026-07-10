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
      {
        name: "pagine",
        label: "Pagine",
        path: "src/content/pagine",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titolo SEO",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Descrizione SEO",
            required: true,
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "hero_eyebrow",
            label: "Hero \u2014 eyebrow"
          },
          {
            type: "string",
            name: "hero_titolo",
            label: "Hero \u2014 titolo"
          },
          {
            type: "string",
            name: "hero_titolo_accent",
            label: "Hero \u2014 titolo (parte evidenziata in rosso)"
          },
          {
            type: "string",
            name: "hero_sottotitolo",
            label: "Hero \u2014 sottotitolo",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "hero_immagine",
            label: "Hero \u2014 percorso immagine (es. /nome-file.avif in public/)"
          },
          {
            type: "string",
            name: "hero_immagine_alt",
            label: "Hero \u2014 testo alternativo immagine"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Contenuto pagina",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
