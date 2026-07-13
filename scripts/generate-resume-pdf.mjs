import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { build } from 'esbuild';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { writeAndCompileResume } from './lib/write-and-compile-resume.mjs';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(rootDir, 'public');
const buildDir = join(rootDir, '.resume-build');
const bundleDir = mkdtempSync(join(tmpdir(), 'resume-export-'));
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
rmSync(bundleDir, { recursive: true, force: true });

const baseName = getResumeBaseName();
const pdfFileName = `${baseName}.pdf`;
const publicPdfPath = join(publicDir, pdfFileName);

mkdirSync(publicDir, { recursive: true });

const compiled = await writeAndCompileResume({
  tex: generateResumeTex({}),
  buildDir,
  pdfFileName,
  copyTo: publicPdfPath
});

if (!compiled) {
  process.exit(1);
}

console.log(`Generated ${join('public', pdfFileName)}`);
