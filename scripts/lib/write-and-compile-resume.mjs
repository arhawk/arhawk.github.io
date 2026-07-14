import { copyFileSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { compileResumePdf } from './compile-resume-pdf.mjs';

export const writeAndCompileResume = async ({
  tex,
  buildDir,
  pdfFileName,
  copyTo,
  copyTexTo
}) => {
  const texPath = join(buildDir, pdfFileName.replace(/\.pdf$/i, '.tex'));
  const pdfPath = join(buildDir, pdfFileName);

  mkdirSync(buildDir, { recursive: true });
  rmSync(buildDir, { recursive: true, force: true });
  mkdirSync(buildDir, { recursive: true });
  writeFileSync(texPath, tex, 'utf8');

  const compiled = await compileResumePdf({ texPath, buildDir, pdfPath });

  if (!compiled) {
    return false;
  }

  if (copyTexTo) {
    writeFileSync(copyTexTo, tex, 'utf8');
  }

  if (copyTo) {
    copyFileSync(pdfPath, copyTo);
  }

  rmSync(buildDir, { recursive: true, force: true });
  return true;
};
