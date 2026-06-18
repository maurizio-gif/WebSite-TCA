import { defineConfig } from 'tinacms';

// Credenziali TinaCloud — aggiungile come variabili d'ambiente:
//   TINA_CLIENT_ID  →  Netlify: Site settings > Env vars
//                      GitHub:  Settings > Secrets > Actions
//   TINA_TOKEN      →  stessa posizione
// Ottienile su: https://app.tina.io

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.HEAD || 'main',
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
            name: 'hero_sottotitolo',
            label: 'Hero — sottotitolo',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'hero_cta_primario',
            label: 'Hero — CTA primario',
          },
          {
            type: 'string',
            name: 'hero_cta_secondario',
            label: 'Hero — CTA secondario',
          },
          {
            type: 'string',
            name: 'hero_immagine',
            label: 'Hero — nome file immagine',
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
