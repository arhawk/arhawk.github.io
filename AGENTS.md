# Agent Maintenance Guide

This portfolio is **English-first**. Chinese (`zh`) is a localized view layer. PDF/LaTeX resume export stays English only.

When English content changes, sync the matching Chinese overlay and UI strings using the rules below.

## Source-of-truth map

| English source | Chinese overlay | UI chrome |
|---|---|---|
| `src/data/about.js` | `src/data/zh/about.js` | `src/i18n/ui.js` (`zh`) |
| `src/data/contact.js` | `src/data/zh/contact.js` | `src/i18n/ui.js` (`zh`) |
| `src/data/projects.js` | `src/data/zh/projects.js` (keyed by `slug`) | `src/i18n/ui.js` (`zh`) |
| Taxonomy `group` labels in `projects.js` | `src/i18n/groupTitles.zh.js` | — |

Do **not** edit tag lookup keys, `slug`, or resume PDF generators for Chinese work.

### No Chinese overlay yet

These English-only arrays have **no** `src/data/zh/*` counterpart today. In Chinese mode they render as written in English:

- `src/data/experience.js` — role titles, company names, bullet text
- `src/data/credentials.js` — certificates, publications, competitions

When adding entries, update the English source first. If the on-screen Chinese resume or credential sections need localized copy, add matching overlay files and wire them through `src/i18n/getLocalized.js` before translating field-by-field.

## Do-not-translate whitelist

Keep these in **English** in Chinese mode:

### Identity and routing
- Display name in English mode: `Zehao Liu` (Chinese mode uses `刘泽浩` via `aboutZh.nameZh` only)
- Project `slug`, URLs, GitHub/LinkedIn links, email
- `status` values (e.g. `Complete`)

### Job and org names

Role **names** stay English everywhere (including Chinese UI):

- `Data Engineer`, `Machine Learning Engineer`, `Artificial Intelligence Engineer`, `Data Scientist`, `Data Analyst`

Where they appear:

| Field | File | Used on |
|---|---|---|
| `targetRoles` | `src/data/about.js` | Home quick profile, PDF/LaTeX resume heading |
| `openTo` | `src/data/contact.js` | Contact page narrative (primary targets plus secondary roles) |

`targetRoles` is the short list (currently two roles). `openTo` may mention additional roles in prose — sync both English sources and `src/data/zh/contact.js` when job-search messaging changes.

Other org rules:

- University / company official names: `The University of Sydney`, `Wilfrid Laurier University`
- Degree names may be summarized in Chinese, but keep official program names in English where they are credentials (e.g. `Data Science and AI`)

### Project surface labels
- Project `title` (e.g. `NEM Monitoring Dashboard`)
- Skill tag labels from taxonomy: `React`, `MQTT`, `Data Cleaning`, `Model Evaluation`, etc.
- Section labels: `Capabilities`, `Technologies`, `Foundations`
- Abbreviations: `AI`, `ML`, `NLP`, `ETL`, `SQL`, `UI`, `CLI`, `GPU`, `KPI`

### Technology and product names
- Libraries, frameworks, platforms, cloud services: `Python`, `Pandas`, `Streamlit`, `Vite`, `Node.js`, `TensorFlow`, `XGBoost`, `Render`, `Vercel`, `Docker`, `GitHub Actions`, etc.
- Protocols and formats: `MQTT`, `WebSocket`, `CSV`, `JSON`, `HTML`, `LaTeX`, `PDF`
- Mode names and code identifiers: `Edit / Present`, `GridSearch`, `Grad-CAM`, `Random Forest`, `confusion matrix`, file paths, CLI commands

### Data layer keys
- Taxonomy canonical labels used for tag matching in `projects.js`
- `tagSectionTitles` keys and English labels used as Map keys for project filtering

## What to translate

- Navigation, buttons, page headings, modal copy, aria-labels → `src/i18n/ui.js`
- About/contact narrative, resume on-screen content, project body fields → `src/data/zh/*.js`
- Taxonomy **group titles** (not tag labels) → `src/i18n/groupTitles.zh.js`
- Skills page **section blurbs** only — the three explanatory sentences under “Skill taxonomy” in `src/i18n/ui.js`:
  - `skills.capabilitiesDesc`
  - `skills.technologiesDesc`
  - `skills.foundationsDesc`

There are no per-group or per-tag description fields in the data layer; do not add taxonomy copy elsewhere unless the UI gains new fields.

## Chinese writing style

Write **natural technical Chinese**, not literal translation.

1. **Rewrite for Chinese readers** — shorten sentences, prefer active voice, use common tech-community phrasing.
2. **Mixed CN/EN is expected** — Chinese grammar + English proper nouns/tools:  
   Good: `用 Pandas 清洗 CSV，经 MQTT 推送更新，在 Streamlit 里展示实时指标。`  
   Bad: `构建了从本地到云端的完整管道系统以实现数据发布功能。`
3. **Avoid translationese** — replace stiff words where possible:
   - 干系人 → 业务方 / 使用方
   - 摄入 → 导入 / 读取
   - 构建 → 搭建 / 实现 / 做了（交替使用，勿重复）
   - 管道（overuse）→ 链路 / 流程 / 数据流
   - 展示 / 呈现 → 视语境用 展示、显示、落地
4. **Keep numbers, metrics, and version facts exact** — do not round or paraphrase evaluation scores.
5. **PDF/LaTeX** — never localized; Resume page may show Chinese on-screen, but downloads stay `Zehao_Liu_Resume.pdf`.

## Sync checklist (when English changes)

1. Update the English source file.
2. Update the matching `src/data/zh/*` entry (or add a new `slug` block in `src/data/zh/projects.js`).
3. Update `src/i18n/ui.js` if any UI label changed.
4. Update `src/i18n/groupTitles.zh.js` only if a taxonomy group name changed in English.
5. Do **not** change `generateResumeTex.js` or `scripts/generate-resume-pdf.mjs` for Chinese copy.
6. Run `npm run build` to verify.

## Locale behavior

- Default locale: `en`
- Persistence: `localStorage` key `portfolio-locale`
- Runtime: `LanguageProvider` in `src/i18n/LanguageContext.jsx`
- Helpers: `src/i18n/getLocalized.js`

## Public resume export

The generic portfolio resume is generated from `src/data/*` via `npm run generate:resume-pdf` and published with the site (`public/Zehao_Liu_Resume.pdf`). Job-specific tailored materials are kept locally under gitignored `applications/` and are not part of the public repository or site.

### Job-specific resume variants

```bash
npm run generate:application -- <variant-name>
```

Example: `npm run generate:application -- hayes-lab-data-analyst`

Expects `applications/<variant-name>/resume.config.js` and `applications/<variant-name>/Cover_Letter_Zehao_Liu.md`. Writes PDFs under that variant folder without changing the public generic resume.

## Files agents must not break

- `src/data/projects.js` — tag lookups and English canonical labels
- `src/lib/generateResumeTex.js` — English resume only
- `scripts/generate-resume-pdf.mjs` — build pipeline
