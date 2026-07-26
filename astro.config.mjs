import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkBreaks from 'remark-breaks';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

// https://astro.build/config
export default defineConfig({
  site: isGitHubPages
    ? 'https://maurizio-gif.github.io'
    : 'https://www.tcambrosiano.com',
  base: isGitHubPages ? '/WebSite-TCA' : undefined,
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    // Un solo a-capo (senza riga vuota) nel corpo markdown (news, eventi,
    // help desk) diventa un <br> invece di essere ignorato: chi scrive da
    // Tina si aspetta che l'a-capo premuto in editor resti visibile.
    remarkPlugins: [remarkBreaks],
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'it',
        locales: { it: 'it', en: 'en' },
      },
    }),
  ],
});
