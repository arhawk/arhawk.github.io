import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { compile } from 'node-latex-compiler';

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
const texPath = join(buildDir, texFileName);
const generatedPdfPath = join(buildDir, pdfFileName);
const publicPdfPath = join(publicDir, pdfFileName);

mkdirSync(publicDir, { recursive: true });
rmSync(buildDir, { recursive: true, force: true });
mkdirSync(buildDir, { recursive: true });
writeFileSync(texPath, generateResumeTex(), 'utf8');

const hasPdflatex = spawnSync('pdflatex', ['--version'], { encoding: 'utf8' }).status === 0;

const compileWithPdflatex = () => {
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
    return false;
  }

  return existsSync(generatedPdfPath);
};

const compileWithTectonic = async () => {
  console.log('Using bundled Tectonic via node-latex-compiler...');

  const result = await compile({
    texFile: texPath,
    outputDir: buildDir,
    outputFile: generatedPdfPath
  });

  if (result.status !== 'success') {
    console.error('Tectonic failed to compile the resume.');
    if (result.stderr) {
      console.error(result.stderr);
    }
    if (result.stdout) {
      console.error(result.stdout);
    }
    return false;
  }

  return existsSync(generatedPdfPath);
};

let compiled = false;

if (hasPdflatex) {
  compiled = compileWithPdflatex();
}

if (!compiled) {
  if (hasPdflatex) {
    console.warn('pdflatex failed; retrying with bundled Tectonic...');
  } else {
    console.warn('pdflatex not found; using bundled Tectonic...');
  }

  compiled = await compileWithTectonic();
}

if (!compiled) {
  process.exit(1);
}

copyFileSync(generatedPdfPath, publicPdfPath);
rmSync(buildDir, { recursive: true, force: true });
console.log(`Generated ${join('public', pdfFileName)}`);
