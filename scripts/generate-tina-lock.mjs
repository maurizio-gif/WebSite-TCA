#!/usr/bin/env node
// Rigenera lo schema TinaCMS e il file tina/tina-lock.json.
//
// PERCHÉ SERVE: "tinacms build" rigenera i file in tina/__generated__/ ma NON
// scrive tina/tina-lock.json — quel file lo produce solo "tinacms dev". È da
// lì però che TinaCloud legge lo schema per indicizzare i contenuti, e va
// committato. Senza questo passaggio si modifica config.ts, si deploya, e
// l'admin mostra "GraphQL Schema Mismatch" perché lo schema remoto è vecchio.
//
// Va eseguito ogni volta che si modificano i campi in tina/config.ts,
// committando i file che risultano modificati. La CI lo verifica
// (scripts/check-tina-lock.mjs).
//
// Uso: npm run tina:lock

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const generatedDir = join(repoRoot, 'tina', '__generated__');

// "tinacms build" pretende le credenziali presenti anche con
// --skip-cloud-checks (servono a comporre l'url dell'API). Se non sono
// nell'ambiente si usano segnaposto: senza contattare TinaCloud non vengono
// usate, e non finiscono nei file confrontati dalla CI.
const env = {
  ...process.env,
  TINA_CLIENT_ID: process.env.TINA_CLIENT_ID || '00000000-0000-0000-0000-000000000000',
  TINA_TOKEN: process.env.TINA_TOKEN || 'placeholder-local-schema-generation',
};

// Due file generati incorporano valori dipendenti dall'ambiente (url dell'API,
// token, un cacheDir col path assoluto). Rigenerandoli senza le credenziali
// reali vi finirebbero i segnaposto qui sopra, pronti per essere committati per
// sbaglio. Sono artefatti di sviluppo locale che nessun modulo importa e che la
// build di produzione rigenera, quindi si preservano: di una rigenerazione
// dello schema interessano solo i tipi, non questi valori.
const clientPath = join(generatedDir, 'client.ts');
const typesPath = join(generatedDir, 'types.ts');
const URL_RE = /url: "[^"]*"/;

const preservedClient = existsSync(clientPath) ? readFileSync(clientPath, 'utf8') : null;
const preservedTypesUrl = existsSync(typesPath)
  ? readFileSync(typesPath, 'utf8').match(URL_RE)?.[0] ?? null
  : null;

console.log('Rigenerazione schema Tina da tina/config.ts…');
execFileSync('npx', ['tinacms', 'build', '--skip-cloud-checks'], {
  cwd: repoRoot,
  env,
  stdio: 'inherit',
});

if (preservedClient !== null) {
  writeFileSync(clientPath, preservedClient);
}
if (preservedTypesUrl !== null && existsSync(typesPath)) {
  const fresh = readFileSync(typesPath, 'utf8');
  writeFileSync(typesPath, fresh.replace(URL_RE, preservedTypesUrl));
}

// Il lock è la concatenazione dei tre JSON generati: stessa logica usata dal
// CLI Tina quando lo scrive (@tinacms/cli, comando dev).
const parts = {
  schema: '_schema.json',
  lookup: '_lookup.json',
  graphql: '_graphql.json',
};

const payload = {};
for (const [key, filename] of Object.entries(parts)) {
  const path = join(generatedDir, filename);
  if (!existsSync(path)) {
    console.error(`✗ File generato mancante: tina/__generated__/${filename}`);
    console.error('  La rigenerazione dello schema non è andata a buon fine.');
    process.exit(1);
  }
  payload[key] = JSON.parse(readFileSync(path, 'utf8'));
}

const lockPath = join(repoRoot, 'tina', 'tina-lock.json');
const previous = existsSync(lockPath) ? readFileSync(lockPath, 'utf8') : null;
const content = JSON.stringify(payload);
writeFileSync(lockPath, content);

console.log(
  previous === content
    ? '\n✓ tina/tina-lock.json era già allineato.'
    : '\n✓ tina/tina-lock.json aggiornato — committalo insieme ai file in tina/__generated__/.'
);

// "tinacms build" ha ricostruito anche public/admin/ (~8 MB). La cartella è
// gitignorata, ma se resta nel workspace "astro check" la type-checka e va in
// out-of-memory: conviene rimuoverla prima di lanciare i controlli.
console.log(
  '\nNota: è stato ricostruito anche public/admin/ (bundle admin, gitignorato).\n' +
  '      Rimuovilo prima di "npm run check" se il type check esaurisce la memoria:\n' +
  '        rm -rf public/admin'
);
