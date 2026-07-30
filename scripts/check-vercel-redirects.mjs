#!/usr/bin/env node
// Controllo statico su vercel.json: individua regole di redirect che
// combaciano anche con se stesse e generano un loop infinito.
//
// Il bug: ":param*" (path-to-regexp/Vercel) significa "zero o più segmenti",
// quindi una regola come "/agonistica/:path*" -> "/agonistica" combacia
// ANCHE con "/agonistica" nudo (zero segmenti) e lo reindirizza verso se
// stesso — pagina irraggiungibile, loop infinito nel browser. È successo
// due volte in questo repo (/agonistica e /tennis, poi /news) prima che
// qualcuno se ne accorgesse navigando il sito in produzione.
//
// Il fix è quasi sempre ":param+" (uno o più segmenti): la regola continua
// a normalizzare i sotto-path legacy senza combaciare col path nudo, che
// nel frattempo è diventato una pagina vera del sito.
//
// Uso: node scripts/check-vercel-redirects.mjs
// (richiamato anche da .github/workflows/ci.yml su ogni PR)

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const vercelJsonPath = fileURLToPath(new URL('../vercel.json', import.meta.url));
const config = JSON.parse(readFileSync(vercelJsonPath, 'utf8'));
const redirects = config.redirects ?? [];

let hasError = false;

redirects.forEach((rule, i) => {
  const { source, destination } = rule;
  if (typeof source !== 'string' || typeof destination !== 'string') return;

  // Isola i pattern che terminano con "/:nome*" (zero o più segmenti).
  const match = source.match(/^(.*)\/:[A-Za-z0-9_]+\*$/);
  if (!match) return;

  const bareSourcePath = match[1];
  if (destination === bareSourcePath) {
    hasError = true;
    console.error(
      `✗ redirect #${i}: "${source}" -> "${destination}"\n` +
      `  ":*" combacia anche con "${bareSourcePath}" nudo (zero segmenti): la regola lo ` +
      `reindirizza verso se stesso, loop infinito.\n` +
      `  Fix: usa ":path+" al posto di ":path*" se "${bareSourcePath}" deve restare raggiungibile.\n`
    );
  }
});

if (hasError) {
  console.error(`Controllo redirect vercel.json fallito (${redirects.length} regole controllate).`);
  process.exit(1);
}

console.log(`✓ vercel.json: ${redirects.length} redirect controllati, nessun self-loop trovato.`);
