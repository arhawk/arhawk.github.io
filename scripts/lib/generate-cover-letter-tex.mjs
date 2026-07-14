const LATEX_SPECIAL = /[&%$#_{}]/g;

export const escapeLatex = (value) =>
  String(value)
    .replace(/\\/g, '\\textbackslash{}')
    .replace(LATEX_SPECIAL, (match) => `\\${match}`)
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');

const LATEX_PREAMBLE = `%-------------------------
% Cover letter — generated from Cover_Letter_Zehao_Liu.md
% Compile with pdfLaTeX or Tectonic
%-------------------------

\\documentclass[11pt,letterpaper]{article}

\\usepackage[empty]{fullpage}
\\usepackage[hidelinks]{hyperref}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{0.75em}

\\begin{document}
`;

const LATEX_POSTAMBLE = `
\\end{document}
`;

const isSalutation = (block) => /^Dear\s/i.test(block);
const isSignOff = (block) => /^Yours sincerely/i.test(block);

export const markdownCoverLetterToTex = (markdown) => {
  const blocks = markdown
    .replace(/\r\n/g, '\n')
    .trim()
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  const parts = [LATEX_PREAMBLE];

  blocks.forEach((block, index) => {
    const lines = block
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => escapeLatex(line));

    if (!lines.length) {
      return;
    }

    if (isSalutation(block)) {
      parts.push(`${lines[0]}\n\n`);
      return;
    }

    if (isSignOff(block)) {
      parts.push('\\noindent\n');
      parts.push(`${lines.join('\\\\\n')}\n`);
      return;
    }

    if (index < 3) {
      parts.push(`\\noindent\n${lines.join('\\\\\n')}\n\n`);
      return;
    }

    parts.push(`${lines.join(' ')}\n\n`);
  });

  parts.push(LATEX_POSTAMBLE);
  return parts.join('');
};
