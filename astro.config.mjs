import { defineConfig } from 'astro/config';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

// https://astro.build/config
export default defineConfig({
  site: isGitHubPages
    ? 'https://maurizio-gif.github.io'
    : 'https://www.tcambrosiano.com',
  base: isGitHubPages ? '/WebSite-TCA' : undefined,
});
