import { cp, mkdir, readdir, writeFile } from 'node:fs/promises';

await mkdir('./public', { recursive: true });
await cp('./assets', './public/assets', { recursive: true, force: true });

const pageFiles = await readdir('./src/pages', { recursive: true });
const routes = pageFiles
  .filter((file) => file.endsWith('.astro') && file !== '404.astro')
  .map((file) => file.replaceAll('\\', '/').replace(/\.astro$/, ''))
  .map((file) => file === 'index' ? '/' : `/${file}`)
  .sort();
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((route) => `  <url><loc>https://zktecowfm.com${route}</loc></url>`),
  '</urlset>',
  '',
].join('\n');

await writeFile('./public/sitemap.xml', sitemap);
