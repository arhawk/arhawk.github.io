import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { writeAndCompileResume } from './lib/write-and-compile-resume.mjs';
import { markdownCoverLetterToTex } from './lib/generate-cover-letter-tex.mjs';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const variantName = process.argv[2];

const RESUME_BASE_NAME = 'Zehao_Liu_Resume';
const COVER_LETTER_BASE_NAME = 'Cover_Letter_Zehao_Liu';
const JOB_POSTING_FILE = 'Job_Posting.md';
const COVER_LETTER_MD_FILE = `${COVER_LETTER_BASE_NAME}.md`;

if (!variantName) {
  console.error('Usage: npm run generate:application -- <variant-name>');
  console.error('Example: npm run generate:application -- cobblestone-junior-data-scientist');
  process.exit(1);
}

const variantDir = join(rootDir, 'applications', variantName);
const configPath = join(variantDir, 'resume.config.js');
const coverLetterMdPath = join(variantDir, COVER_LETTER_MD_FILE);

if (!existsSync(configPath)) {
  console.error(`Variant config not found: ${configPath}`);
  process.exit(1);
}

if (!existsSync(coverLetterMdPath)) {
  console.error(`Cover letter markdown not found: ${coverLetterMdPath}`);
  process.exit(1);
}

const bundleDir = mkdtempSync(join(tmpdir(), 'resume-variant-'));
const bundlePath = join(bundleDir, 'generateResumeTex.mjs');

await build({
  entryPoints: [join(rootDir, 'src/lib/generateResumeTex.js')],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: bundlePath,
  packages: 'bundle'
});

const { generateResumeTex } = await import(pathToFileURL(bundlePath).href);
const resumeConfig = (await import(pathToFileURL(configPath).href)).default;

rmSync(bundleDir, { recursive: true, force: true });

const buildDir = join(rootDir, '.resume-build');
const resumePdfFileName = `${RESUME_BASE_NAME}.pdf`;
const resumeTexPath = join(variantDir, `${RESUME_BASE_NAME}.tex`);
const resumePdfPath = join(variantDir, resumePdfFileName);

const resumeCompiled = await writeAndCompileResume({
  tex: generateResumeTex(resumeConfig),
  buildDir,
  pdfFileName: resumePdfFileName,
  copyTo: resumePdfPath,
  copyTexTo: resumeTexPath
});

if (!resumeCompiled) {
  process.exit(1);
}

const coverLetterTex = markdownCoverLetterToTex(
  readFileSync(coverLetterMdPath, 'utf8')
);
const coverLetterPdfFileName = `${COVER_LETTER_BASE_NAME}.pdf`;
const coverLetterTexPath = join(variantDir, `${COVER_LETTER_BASE_NAME}.tex`);
const coverLetterPdfPath = join(variantDir, coverLetterPdfFileName);

const coverLetterCompiled = await writeAndCompileResume({
  tex: coverLetterTex,
  buildDir,
  pdfFileName: coverLetterPdfFileName,
  copyTo: coverLetterPdfPath,
  copyTexTo: coverLetterTexPath
});

if (!coverLetterCompiled) {
  process.exit(1);
}

const outputs = [
  join('applications', variantName, `${RESUME_BASE_NAME}.tex`),
  join('applications', variantName, resumePdfFileName),
  join('applications', variantName, COVER_LETTER_MD_FILE),
  join('applications', variantName, `${COVER_LETTER_BASE_NAME}.tex`),
  join('applications', variantName, coverLetterPdfFileName)
];

if (existsSync(join(variantDir, JOB_POSTING_FILE))) {
  outputs.unshift(join('applications', variantName, JOB_POSTING_FILE));
}

console.log('Generated application pack:');
for (const output of outputs) {
  console.log(`  ${output}`);
}
