import { dirname, join } from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { writeAndCompileResume } from './lib/write-and-compile-resume.mjs';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const variantName = process.argv[2];

if (!variantName) {
  console.error('Usage: npm run generate:resume-variant -- <variant-name>');
  console.error('Example: npm run generate:resume-variant -- hayes-lab-data-analyst');
  process.exit(1);
}

const variantDir = join(rootDir, 'applications', variantName);
const configPath = join(variantDir, 'resume.config.js');

if (!existsSync(configPath)) {
  console.error(`Variant config not found: ${configPath}`);
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

const { generateResumeTex, getResumeBaseName } = await import(pathToFileURL(bundlePath).href);
const resumeConfig = (await import(pathToFileURL(configPath).href)).default;

rmSync(bundleDir, { recursive: true, force: true });

const baseName = getResumeBaseName();
const pdfFileName = `${baseName}.pdf`;
const outputPdfPath = join(variantDir, pdfFileName);
const buildDir = join(rootDir, '.resume-build');

const compiled = await writeAndCompileResume({
  tex: generateResumeTex(resumeConfig),
  buildDir,
  pdfFileName,
  copyTo: outputPdfPath
});

if (!compiled) {
  process.exit(1);
}

console.log(`Generated ${join('applications', variantName, pdfFileName)}`);
