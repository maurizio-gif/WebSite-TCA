// Parser minimale per i campi di testo lungo editabili da Tina (regolamenti,
// documenti legali): supporta "## " (h2), "### " (h3), "- " (liste), paragrafi
// separati da riga vuota e **grassetto**. Non è markdown completo: copre solo
// i costrutti usati in questi contenuti, senza aggiungere una libreria esterna.
export function renderMiniMarkdown(text: string): string {
  const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const bold = (s: string) => s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  const inline = (s: string) => bold(escapeHtml(s));

  const lines = text.split('\n');
  let html = '';
  let inList = false;
  let paragraphBuf: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuf.length) {
      html += `<p>${inline(paragraphBuf.join(' '))}</p>\n`;
      paragraphBuf = [];
    }
  };
  const closeList = () => {
    if (inList) {
      html += '</ul>\n';
      inList = false;
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (line === '') {
      flushParagraph();
      closeList();
      continue;
    }
    if (line.startsWith('### ')) {
      flushParagraph();
      closeList();
      html += `<h3>${inline(line.slice(4))}</h3>\n`;
    } else if (line.startsWith('## ')) {
      flushParagraph();
      closeList();
      html += `<h2>${inline(line.slice(3))}</h2>\n`;
    } else if (line.startsWith('- ')) {
      flushParagraph();
      if (!inList) {
        html += '<ul>\n';
        inList = true;
      }
      html += `<li>${inline(line.slice(2))}</li>\n`;
    } else {
      closeList();
      paragraphBuf.push(line);
    }
  }
  flushParagraph();
  closeList();

  return html;
}
