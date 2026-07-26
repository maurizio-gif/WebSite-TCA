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
  vite: {
    build: {
      // Soglia sotto la quale Astro incorpora i CSS nell'HTML invece di
      // linkarli (build.inlineStylesheets è 'auto' di default).
      // 16 KB include i due fogli di pagina (~9 e ~14 KB), che così non
      // costano più un round trip in blocco al rendering, ma resta sotto il
      // bundle condiviso (~48 KB): quello va tenuto esterno, perché è lo
      // stesso su tutte le pagine e deve restare in cache tra una e l'altra.
      // Nessun effetto sulle immagini: stanno in public/, non passano dal
      // bundler, quindi non rischiano di finire inlineate in base64.
      assetsInlineLimit: 16384,
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
