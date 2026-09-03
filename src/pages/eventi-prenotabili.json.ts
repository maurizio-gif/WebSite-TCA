import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Manifest degli eventi con prenotazione online attiva, generato dalla build.
//
// Serve al CRM (AppTCA → lib/eventi.ts): il sito è statico, quindi capienza e
// quote arriverebbero al CRM dal browser, dove chiunque può cambiarle prima
// dell'invio. Pubblicandole qui, il CRM le rilegge da una fonte che controlla
// lui e valida ogni prenotazione contro questi numeri — pur lasciando al
// marketing un unico posto dove modificarli (TinaCMS).
//
// Un evento sparisce dal manifest quando viene depubblicato o quando la
// spunta "Prenotazione online attiva" viene tolta: da quel momento il CRM
// risponde "evento non prenotabile" e il form si chiude.
export const GET: APIRoute = async ({ site }) => {
  // `site` è l'URL configurato in astro.config.mjs (www.tcambrosiano.com in
  // produzione, il dominio GitHub Pages nella preview): l'URL dell'evento
  // finisce nelle email mandate da n8n, quindi deve puntare al sito da cui la
  // prenotazione è arrivata davvero.
  const base = (site?.toString() ?? 'https://www.tcambrosiano.com').replace(/\/+$/, '');
  const eventi = await getCollection('eventi', ({ data }) => data.pubblicato && data.prenotazioniAttive);

  const voci = eventi.map((entry) => ({
    slug: entry.slug,
    titolo: entry.data.titolo,
    titoloEn: entry.data.titolo_en ?? null,
    data: entry.data.data.toISOString(),
    postiTotali: entry.data.postiTotali,
    quotaSocio: entry.data.quotaSocio,
    quotaNonSocio: entry.data.quotaNonSocio,
    oreScadenza: entry.data.oreScadenzaPagamento,
    urlEvento: `${base}/eventi/${entry.slug}`,
  }));

  return new Response(JSON.stringify({ eventi: voci }, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
