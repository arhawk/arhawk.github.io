import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';

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
const texFileName = `${baseName}.tex`;
const pdfFileName = `${baseName}.pdf`;

const hasPdflatex = spawnSync('pdflatex', ['--version'], { encoding: 'utf8' }).status === 0;

if (!hasPdflatex) {
  console.warn('pdflatex not found; skipping resume PDF generation.');
  process.exit(0);
}

mkdirSync(publicDir, { recursive: true });
rmSync(buildDir, { recursive: true, force: true });
mkdirSync(buildDir, { recursive: true });

writeFileSync(join(buildDir, texFileName), generateResumeTex(), 'utf8');

const runPdflatex = () =>
  spawnSync('pdflatex', ['-interaction=nonstopmode', '-output-directory', buildDir, texFileName], {
    cwd: buildDir,
    encoding: 'utf8'
  });

const firstPass = runPdflatex();
const secondPass = runPdflatex();

if (firstPass.status !== 0 || secondPass.status !== 0) {
  console.error('pdflatex failed to compile the resume.');
  if (firstPass.stdout) {
    console.error(firstPass.stdout);
  }
  if (firstPass.stderr) {
    console.error(firstPass.stderr);
  }
  process.exit(1);
}

const generatedPdfPath = join(buildDir, pdfFileName);
if (!existsSync(generatedPdfPath)) {
  console.error(`Expected PDF was not created: ${generatedPdfPath}`);
  process.exit(1);
}

copyFileSync(generatedPdfPath, join(publicDir, pdfFileName));
rmSync(buildDir, { recursive: true, force: true });
console.log(`Generated ${join('public', pdfFileName)}`);
