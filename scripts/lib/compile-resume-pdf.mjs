import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { compile } from 'node-latex-compiler';

export const compileResumePdf = async ({ texPath, buildDir, pdfPath }) => {
  const texFileName = texPath.split('/').pop();
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

    return existsSync(pdfPath);
  };

  const compileWithTectonic = async () => {
    console.log('Using bundled Tectonic via node-latex-compiler...');

    const result = await compile({
      texFile: texPath,
      outputDir: buildDir,
      outputFile: pdfPath
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

    return existsSync(pdfPath);
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

  return compiled;
};
