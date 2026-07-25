// Converte in HTML i campi testo semplice (es. corpo_en) delle collection
// editoriali (eventi, news, helpdesk): un paragrafo per riga vuota, un <br>
// per ogni a-capo singolo, grassetto con **doppi asterischi**. Il corpo
// italiano usa invece il rich-text di Tina, reso tramite <Content /> — vedi
// remarkPlugins in astro.config.mjs per il comportamento equivalente lì.

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const mdInline = (s: string) =>
  escapeHtml(s)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

/** Un elemento HTML (già escaped/formattato) per ogni paragrafo del testo. */
export function mdParagraphsHtml(text: string): string[] {
  return text
    .trim()
    .split(/\n\s*\n+/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => mdInline(block).replace(/\n/g, '<br />'));
}
