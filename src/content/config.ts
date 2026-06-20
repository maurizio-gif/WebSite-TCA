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
  }),
});

export const collections = { pagine, eventi };
