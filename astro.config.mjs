import { defineConfig } from 'astro/config';

// The site was migrated from static HTML to file-based Astro routes. Some page
// markup still contains legacy internal `*.html` links; normalize those links
// before Astro compiles a page so visitors always receive clean route URLs.
const cleanInternalRoutes = {
  name: 'clean-internal-routes',
  enforce: 'pre',
  transform(code, id) {
    if (!id.split('?')[0].endsWith('.astro')) return null;

    return code.replace(
      /\b(href=(["']))((?!https?:\/\/|\/\/|mailto:|tel:)[^"']+?)\.html((?:[?#][^"']*)?\2)/g,
      '$1$3$4',
    );
  },
};

export default defineConfig({
  output: 'static',
  trailingSlash: 'never',
  vite: {
    plugins: [cleanInternalRoutes],
  },
});
