import { defineConfig } from 'tinacms';

// Credenziali TinaCloud — aggiungile come variabili d'ambiente:
//   TINA_CLIENT_ID  →  Vercel: Project Settings > Environment Variables
//   TINA_TOKEN      →  stessa posizione
// Ottienile su: https://app.tina.io

export default defineConfig({
  branch: process.env.VERCEL_GIT_COMMIT_REF || process.env.GITHUB_BRANCH || process.env.HEAD || 'main',
  clientId: process.env.TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [
      // ─── EVENTI ────────────────────────────────────────────────────────────
      // Il marketing può aggiungere eventi da qui: https://app.tina.io
      // Ogni evento è un file .md in src/content/eventi/
      // ───────────────────────────────────────────────────────────────────────
      {
        name: 'eventi',
        label: 'Eventi',
        path: 'src/content/eventi',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'titolo',
            label: 'Titolo evento',
            isTitle: true,
            required: true,
          },
          {
            type: 'datetime',
            name: 'data',
            label: 'Data',
            required: true,
            ui: { dateFormat: 'DD/MM/YYYY' },
          },
          {
            type: 'string',
            name: 'categoria',
            label: 'Categoria',
            required: true,
            options: ['Torneo', 'Clinic', 'Evento', 'Camp'],
          },
          {
            type: 'string',
            name: 'descrizione',
            label: 'Descrizione breve',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'luogo',
            label: 'Luogo (es. Campo 3, Club House)',
          },
          {
            type: 'string',
            name: 'iscrizioniHref',
            label: 'Link iscrizioni (URL)',
          },
          {
            type: 'boolean',
            name: 'pubblicato',
            label: 'Pubblicato',
          },
          {
            type: 'string',
            name: 'titolo_en',
            label: '🇬🇧 Titolo (inglese)',
          },
          {
            type: 'string',
            name: 'descrizione_en',
            label: '🇬🇧 Descrizione breve (inglese)',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'luogo_en',
            label: '🇬🇧 Luogo (inglese)',
          },
          {
            type: 'string',
            name: 'corpo_en',
            label: '🇬🇧 Dettagli evento (inglese)',
            ui: { component: 'textarea' },
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Dettagli evento (italiano)',
            isBody: true,
          },
        ],
      },
      // ─── INFO CLUB ─────────────────────────────────────────────────────────
      // File unico con orari, indirizzo e contatti del Club.
      // Le modifiche si riflettono su tutte le pagine (sezione "Vieni a trovarci").
      // ───────────────────────────────────────────────────────────────────────
      {
        name: 'info',
        label: 'Informazioni Club',
        path: 'src/content/info',
        format: 'md',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: 'string',
            name: 'indirizzo',
            label: 'Indirizzo',
            required: true,
          },
          {
            type: 'string',
            name: 'come_arrivare',
            label: 'Come arrivare',
            required: true,
          },
          {
            type: 'string',
            name: 'come_arrivare_en',
            label: '🇬🇧 Come arrivare (inglese)',
            required: true,
          },
          {
            type: 'string',
            name: 'orari',
            label: 'Orari Club (una riga per fascia)',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'orari_en',
            label: '🇬🇧 Orari Club (inglese)',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'telefono',
            label: 'Telefono',
            required: true,
          },
          {
            type: 'string',
            name: 'email',
            label: 'Email',
            required: true,
          },
        ],
      },
      {
        name: 'pagine',
        label: 'Pagine',
        path: 'src/content/pagine',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Titolo SEO',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Descrizione SEO',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'hero_eyebrow',
            label: 'Hero — eyebrow',
          },
          {
            type: 'string',
            name: 'hero_titolo',
            label: 'Hero — titolo',
          },
          {
            type: 'string',
            name: 'hero_titolo_accent',
            label: 'Hero — titolo (parte evidenziata in rosso)',
          },
          {
            type: 'string',
            name: 'hero_sottotitolo',
            label: 'Hero — sottotitolo',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'hero_immagine',
            label: 'Hero — percorso immagine (es. /nome-file.avif in public/)',
          },
          {
            type: 'string',
            name: 'hero_immagine_alt',
            label: 'Hero — testo alternativo immagine',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Contenuto pagina',
            isBody: true,
          },
        ],
      },
    ],
  },
});
