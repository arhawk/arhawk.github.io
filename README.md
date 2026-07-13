# Data Engineering / Analytics Portfolio

Minimal recruiter-friendly portfolio built with React, Vite, and GitHub Pages.

## Features

- Home, Projects, Resume, Skills, About, and Contact pages
- Project cards and detail pages
- Resume page assembled from shared content data
- LaTeX and PDF resume downloads generated from the same source
- Skills derived from project tags
- Empty resume sections hidden until data is added
- Responsive layout for mobile and desktop
- GitHub Pages deployment via GitHub Actions

## Setup

```bash
npm install
```

## Local Development

```bash
npm run dev
```

## Production Build

```bash
npm run build
```

## Preview Build

```bash
npm run preview
```

## Deployment

GitHub Pages is configured to serve the repository root on `main`. The deploy workflow builds the Vite app and commits the production `index.html` and `assets/` folder to `main`.

1. Push source changes to `main`.
2. The workflow in `.github/workflows/deploy.yml` runs `npm run build` and commits the built files.
3. GitHub Pages serves those built files at `https://arhawk.github.io`.

Local development uses `index.template.html` so the committed production `index.html` does not affect `npm run dev`.

## Content Updates

Maintain three content files:

- `src/data/projects.js` — project evidence, tags, and taxonomies
- `src/data/about.js` — profile, narrative, education, and page copy for Home / About / Resume
- `src/data/contact.js` — email, links, and contact-page copy

Optional extension arrays (empty sections stay hidden on the site and in LaTeX export):

- `src/data/experience.js` — internships and relevant professional roles
- `src/data/credentials.js` — certificates, publications, and competitions

The Resume page offers **Download PDF** and **Download LaTeX** from this shared data. PDFs are compiled during `npm run build`; the `.tex` file can also be compiled locally with pdfLaTeX or XeLaTeX.

### Job-specific resume variants

`npm run build` always generates the generic resume at `public/Zehao_Liu_Resume.pdf` (used by the site download buttons).

For a tailored application CV, add `applications/<variant-name>/resume.config.js` and run:

```bash
npm run generate:resume-variant -- hayes-lab-data-analyst
```

That writes `applications/<variant-name>/Zehao_Liu_Resume.pdf` without changing the public generic PDF.

Layout and routing live in `src/App.jsx`. Resume export lives in `src/lib/generateResumeTex.js` and `scripts/generate-resume-pdf.mjs`.
