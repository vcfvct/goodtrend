/* eslint-disable no-console */

const fs = require('fs/promises');
const path = require('path');
const swc = require('@swc/core');

const repoRoot = path.resolve(__dirname, '..');
const themeRoot = path.join(repoRoot, 'themes', 'eve');
const srcRoot = path.join(themeRoot, 'src');
const distRoot = path.join(themeRoot, 'dist');

async function pathExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function copyFile(srcPath, destPath) {
  await ensureDir(path.dirname(destPath));
  await fs.copyFile(srcPath, destPath);
}

async function copyDir(srcDir, destDir) {
  if (!(await pathExists(srcDir))) return;
  await ensureDir(destDir);
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const from = path.join(srcDir, entry.name);
      const to = path.join(destDir, entry.name);
      if (entry.isDirectory()) return copyDir(from, to);
      if (entry.isFile()) return copyFile(from, to);
      return undefined;
    })
  );
}

function getOutFilePath(inFilePath) {
  const rel = path.relative(srcRoot, inFilePath);
  const ext = path.extname(rel).toLowerCase();
  const base = rel.slice(0, rel.length - ext.length);

  if (['.js', '.jsx', '.ts', '.tsx'].includes(ext)) {
    return path.join(distRoot, `${base}.js`);
  }
  return path.join(distRoot, rel);
}

async function compileWithSwc(source, inFilePath) {
  const ext = path.extname(inFilePath).toLowerCase();
  const isTypeScript = ext === '.ts' || ext === '.tsx';
  const isJsx = ext === '.jsx' || ext === '.tsx';

  const result = await swc.transform(source, {
    filename: inFilePath,
    jsc: {
      target: 'es2018',
      parser: {
        syntax: isTypeScript ? 'typescript' : 'ecmascript',
        tsx: isTypeScript && isJsx,
        jsx: !isTypeScript && isJsx,
        dynamicImport: true
      },
      transform: {
        react: {
          runtime: 'classic'
        }
      }
    },
    module: {
      type: 'es6'
    },
    sourceMaps: false
  });

  return result.code;
}

async function buildTheme() {
  console.log('[theme:eve] Cleaning dist');
  await fs.rm(distRoot, { recursive: true, force: true });
  await ensureDir(distRoot);

  console.log('[theme:eve] Compiling src -> dist');
  const queue = [srcRoot];
  while (queue.length) {
    const dir = queue.pop();
    const entries = await fs.readdir(dir, { withFileTypes: true });
    // eslint-disable-next-line no-await-in-loop
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        queue.push(fullPath);
        continue;
      }
      if (!entry.isFile()) continue;

      const outPath = getOutFilePath(fullPath);
      const ext = path.extname(fullPath).toLowerCase();
      if (['.js', '.jsx', '.ts', '.tsx'].includes(ext)) {
        // eslint-disable-next-line no-await-in-loop
        const source = await fs.readFile(fullPath, 'utf8');
        // eslint-disable-next-line no-await-in-loop
        const code = await compileWithSwc(source, fullPath);
        // eslint-disable-next-line no-await-in-loop
        await ensureDir(path.dirname(outPath));
        // eslint-disable-next-line no-await-in-loop
        await fs.writeFile(outPath, code, 'utf8');
      } else {
        // eslint-disable-next-line no-await-in-loop
        await copyFile(fullPath, outPath);
      }
    }
  }

  console.log('[theme:eve] Copying public + tailwind config');
  await copyDir(path.join(themeRoot, 'public'), path.join(distRoot, 'public'));
  await copyFile(path.join(themeRoot, 'tailwind.config.js'), path.join(distRoot, 'tailwind.config.js'));

  console.log('[theme:eve] Done');
}

buildTheme().catch((err) => {
  console.error('[theme:eve] Build failed:', err);
  process.exitCode = 1;
});
