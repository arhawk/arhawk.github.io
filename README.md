# Data / AI Portfolio

Minimal recruiter-friendly portfolio built with React, Vite, and GitHub Pages.

## Features

- Home, About, Resume, Projects, Skills, and Contact pages
- Project cards and detail pages
- Single source of truth for project data
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

1. Push the repository to GitHub.
2. In the repository settings, enable GitHub Pages.
3. Set the source to GitHub Actions.
4. Push to `main` to trigger the deploy workflow in `.github/workflows/deploy.yml`.

The site uses Vite's relative asset base so it can deploy cleanly to GitHub Pages.

## Content Updates

- Edit project data in `src/data/projects.js`.
- Update personal details in the page components inside `src/App.jsx`.
- Replace placeholder contact details with your own information before publishing.
