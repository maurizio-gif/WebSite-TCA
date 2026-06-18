import { defineCollection, z } from 'astro:content';

const pagine = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hero_eyebrow: z.string().optional(),
    hero_titolo: z.string().optional(),
    hero_sottotitolo: z.string().optional(),
    hero_cta_primario: z.string().optional(),
    hero_cta_secondario: z.string().optional(),
    hero_immagine: z.string().optional(),
  }),
});

export const collections = { pagine };
