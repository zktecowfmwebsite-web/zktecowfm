import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';

const pagesDirectory = join(process.cwd(), 'src', 'pages');
const stylesDirectory = join(process.cwd(), 'src', 'styles', 'pages');
const stylePattern = /<style(?:\s[^>]*)?>([\s\S]*?)<\/style>/gi;

async function astroFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return astroFiles(path);
    return entry.isFile() && entry.name.endsWith('.astro') ? [path] : [];
  }));
  return nested.flat();
}

await mkdir(stylesDirectory, { recursive: true });
for (const pagePath of await astroFiles(pagesDirectory)) {
  const source = await readFile(pagePath, 'utf8');
  const styles = [...source.matchAll(stylePattern)].map((match) => match[1].trim()).filter(Boolean);
  if (!styles.length) continue;

  const pageRelativePath = relative(pagesDirectory, pagePath).replace(/\\/g, '/');
  const stylePath = join(stylesDirectory, pageRelativePath.replace(/\.astro$/, '.css'));
  await mkdir(dirname(stylePath), { recursive: true });
  await writeFile(stylePath, `${styles.join('\n\n')}\n`, 'utf8');

  const importPath = relative(dirname(pagePath), stylePath).replace(/\\/g, '/');
  const normalizedImportPath = importPath.startsWith('.') ? importPath : `./${importPath}`;
  const pageWithoutStyles = source.replace(stylePattern, '');
  const withImport = `---\nimport '${normalizedImportPath}';\n---\n${pageWithoutStyles}`;
  await writeFile(pagePath, withImport, 'utf8');
}
