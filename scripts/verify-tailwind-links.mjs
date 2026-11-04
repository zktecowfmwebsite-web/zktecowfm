import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

async function findAstroPages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const pages = await Promise.all(entries.map(async (entry) => {
    const entryPath = join(directory, entry.name);
    if (entry.isDirectory()) return findAstroPages(entryPath);
    return entry.name.endsWith('.astro') ? [entryPath] : [];
  }));
  return pages.flat();
}

const pages = await findAstroPages('src/pages');
const missing = [];

for (const page of pages) {
  const source = await readFile(page, 'utf8');
  const loadsTailwindDirectly = source.includes('tailwind.css');
  const inheritsTailwindFromSiteLayout = source.includes("layouts/SiteLayout.astro");
  if (!loadsTailwindDirectly && !inheritsTailwindFromSiteLayout) missing.push(page);
}

if (missing.length) throw new Error(`Tailwind stylesheet missing from:\n${missing.join('\n')}`);

console.log(`Verified Tailwind stylesheet links in ${pages.length} Astro pages.`);
