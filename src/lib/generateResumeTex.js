import { about } from '../data/about';
import { certificates, competitions, publications } from '../data/credentials';
import { contact } from '../data/contact';
import { experience } from '../data/experience';
import { projectData } from '../data/projects';
import { hasItems } from './hasItems';
import { collectResumeSkillLabels, getProjectResumeBullets } from './collectResumeSkills';

const escapeLatex = (value) =>
  String(value)
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/[&%$#_{}]/g, (match) => `\\${match}`)
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');

const latexHref = (url, label) => `\\href{${escapeLatex(url)}}{${escapeLatex(label)}}`;

const LATEX_PREAMBLE = `%-------------------------
% Resume in LaTeX — generated from arhawk.github.io content
% Compile with pdfLaTeX or XeLaTeX
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{xcolor}
\\usepackage{fancyhdr}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}
\\setlength{\\footskip}{8pt}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-4pt}\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\newcommand{\\resumeItem}[1]{
  \\item\\small{{#1 \\vspace{-2pt}}}
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}
`;

const LATEX_POSTAMBLE = `
\\end{document}
`;

const buildHeading = () => {
  const links = [
    contact.email ? `\\href{mailto:${escapeLatex(contact.email)}}{${escapeLatex(contact.email)}}` : null,
    contact.github ? latexHref(contact.github, 'GitHub') : null,
    contact.linkedin ? latexHref(contact.linkedin, 'LinkedIn') : null,
    about.location ? escapeLatex(about.location) : null
  ].filter(Boolean);

  return `%---------- HEADING ----------
\\begin{center}
    \\textbf{\\Huge ${escapeLatex(about.name)}} \\\\ \\vspace{3pt}
    \\small ${about.targetRoles.map((role) => escapeLatex(role)).join(' \\textbullet{} ')} \\\\ \\vspace{3pt}
    \\small ${links.join(' $|$ ')}
\\end{center}
`;
};

const buildSummary = () => {
  const bullets = [...(about.summaryPoints ?? [])];

  return `%----------- SUMMARY -----------
\\section{Professional Summary}
\\resumeSubHeadingListStart
  \\item
    \\small{${escapeLatex(about.summary)}}
    ${
      hasItems(bullets)
        ? `\\resumeItemListStart
${bullets.map((item) => `        \\resumeItem{${escapeLatex(item)}}`).join('\n')}
      \\resumeItemListEnd`
        : ''
    }
\\resumeSubHeadingListEnd
`;
};

const buildEducation = () => {
  if (!hasItems(about.education)) {
    return '';
  }

  const entries = about.education
    .map((item) => {
      const subheading = `    \\resumeSubheading
      {${escapeLatex(item.org)}}{${escapeLatex(item.notes ?? '')}}
      {${escapeLatex(item.title)}}{${escapeLatex(item.period)}}`;

      if (!item.highlights) {
        return subheading;
      }

      return `${subheading}
    \\resumeItemListStart
      \\resumeItem{${escapeLatex(item.highlights)}}
    \\resumeItemListEnd`;
    })
    .join('\n\n');

  return `%----------- EDUCATION -----------
\\section{Education}
\\resumeSubHeadingListStart

${entries}

\\resumeSubHeadingListEnd
`;
};

const buildExperience = () => {
  if (!hasItems(experience)) {
    return '';
  }

  const entries = experience
    .map((item) => {
      const bullets = (item.bullets ?? [])
        .map((bullet) => `            \\resumeItem{${escapeLatex(bullet)}}`)
        .join('\n');

      return `    \\resumeSubheading
      {${escapeLatex(item.role)}}{${escapeLatex(item.location ?? '')}}
      {${escapeLatex(item.company)}}{${escapeLatex(item.period)}}
        \\resumeItemListStart
${bullets}
        \\resumeItemListEnd`;
    })
    .join('\n\n');

  return `%----------- EXPERIENCE -----------
\\section{Experience}
\\resumeSubHeadingListStart

${entries}

\\resumeSubHeadingListEnd
`;
};

const buildProjects = () => {
  if (!hasItems(projectData)) {
    return '';
  }

  const entries = projectData
    .map((project) => {
      const linkParts = [];
      if (project.githubUrl) {
        linkParts.push(`\\emph{${latexHref(project.githubUrl, 'GitHub')}}`);
      }
      if (project.demoUrl) {
        linkParts.push(`\\emph{${latexHref(project.demoUrl, 'Demo')}}`);
      }

      const heading = linkParts.length
        ? `{\\textbf{${escapeLatex(project.title)}} $|$ ${linkParts.join(' $|$ ')}}`
        : `{\\textbf{${escapeLatex(project.title)}}}`;

      const bullets = getProjectResumeBullets(project)
        .map((bullet) => `            \\resumeItem{${escapeLatex(bullet)}}`)
        .join('\n');

      return `      \\resumeProjectHeading
        ${heading}{${escapeLatex(project.category)}}
          \\resumeItemListStart
${bullets}
          \\resumeItemListEnd`;
    })
    .join('\n\n');

  return `%----------- PROJECTS -----------
\\section{Projects}
\\resumeSubHeadingListStart

${entries}

\\resumeSubHeadingListEnd
`;
};

const buildSkills = () => {
  const skills = collectResumeSkillLabels(projectData);

  if (!hasItems(skills)) {
    return '';
  }

  return `%----------- SKILLS -----------
\\section{Skills}
\\resumeSubHeadingListStart
  \\small{\\item{
      \\textbf{Technologies:}{ ${skills.map((skill) => escapeLatex(skill)).join(', ')}}
  }}
\\resumeSubHeadingListEnd
`;
};

const buildStrengths = () => {
  if (!hasItems(about.uniqueStrengths)) {
    return '';
  }

  const bullets = about.uniqueStrengths
    .map((item) => `        \\resumeItem{${escapeLatex(item)}}`)
    .join('\n');

  return `%----------- STRENGTHS -----------
\\section{Professional Strengths}
\\resumeSubHeadingListStart
  \\item
    \\resumeItemListStart
${bullets}
    \\resumeItemListEnd
\\resumeSubHeadingListEnd
`;
};

const buildSimpleListSection = (title, entries, formatter) => {
  if (!hasItems(entries)) {
    return '';
  }

  const bullets = entries.map((entry) => `        \\resumeItem{${formatter(entry)}}`).join('\n');

  return `%----------- ${title.toUpperCase()} -----------
\\section{${title}}
\\resumeSubHeadingListStart
  \\item
    \\resumeItemListStart
${bullets}
    \\resumeItemListEnd
\\resumeSubHeadingListEnd
`;
};

const buildCertificates = () =>
  buildSimpleListSection(
    'Certificates',
    certificates,
    (item) =>
      `${escapeLatex(item.name)} — ${escapeLatex(item.issuer)} (${escapeLatex(item.date)})${
        item.url ? ` ${latexHref(item.url, 'Link')}` : ''
      }`
  );

const buildPublications = () =>
  buildSimpleListSection(
    'Publications',
    publications,
    (item) =>
      `${escapeLatex(item.title)} — ${escapeLatex(item.venue)} (${escapeLatex(item.date)})${
        item.url ? ` ${latexHref(item.url, 'Link')}` : ''
      }`
  );

const buildCompetitions = () =>
  buildSimpleListSection(
    'Competitions',
    competitions,
    (item) =>
      `${escapeLatex(item.name)} — ${escapeLatex(item.result)} (${escapeLatex(item.date)})${
        item.url ? ` ${latexHref(item.url, 'Link')}` : ''
      }`
  );

export const getResumeBaseName = () => `${about.name.replace(/\s+/g, '_')}_Resume`;

export const generateResumeTex = () =>
  [
    LATEX_PREAMBLE,
    buildHeading(),
    buildSummary(),
    buildEducation(),
    buildExperience(),
    buildProjects(),
    buildSkills(),
    buildStrengths(),
    buildCertificates(),
    buildPublications(),
    buildCompetitions(),
    LATEX_POSTAMBLE
  ]
    .filter(Boolean)
    .join('\n');

export const downloadResumeTex = () => {
  const tex = generateResumeTex();
  const blob = new Blob([tex], { type: 'application/x-tex' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');

  anchor.href = url;
  anchor.download = `${getResumeBaseName()}.tex`;
  anchor.click();
  URL.revokeObjectURL(url);
};

export const downloadResumePdf = async () => {
  const fileName = `${getResumeBaseName()}.pdf`;
  const url = `${import.meta.env.BASE_URL}${fileName}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('PDF not found');
    }

    const blob = await response.blob();
    const headerBytes = new Uint8Array(await blob.slice(0, 8).arrayBuffer());
    const headerText = String.fromCharCode(...headerBytes);

    if (!headerText.startsWith('%PDF-')) {
      throw new Error('Response is not a valid PDF');
    }

    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = objectUrl;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(objectUrl);
  } catch {
    window.alert(
      'PDF resume is not available yet. Run "npm run build" to generate it, then use "npm run preview" or restart "npm run dev" before downloading again.'
    );
  }
};
