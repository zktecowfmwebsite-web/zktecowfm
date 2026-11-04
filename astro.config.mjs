import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// The site was migrated from static HTML to file-based Astro routes. Some page
// markup still contains legacy internal `*.html` links; normalize those links
// before Astro compiles a page so visitors always receive clean route URLs.
const cleanInternalRoutes = {
  name: 'clean-internal-routes',
  enforce: 'pre',
  transform: {
    // `enforce: 'pre'` alone still runs after Astro's own pre-plugin.
    // Hook ordering ensures HTML edits happen before compilation, never inside
    // generated JavaScript strings where injected quotes would break parsing.
    order: 'pre',
    handler(code, id) {
      // Virtual Astro modules (scripts/styles) are not page markup.
      if (id.includes('?')) return null;
      const sourcePath = id.replaceAll('\\', '/');
      if (!sourcePath.endsWith('.astro')) return null;

      const normalizedRoutes = code.replace(
        /\b(href=(["']))((?!https?:\/\/|\/\/|mailto:|tel:)[^"']+?)\.html((?:[?#][^"']*)?\2)/g,
        '$1$3$4',
      );

      const normalizedCode = normalizedRoutes
        .replaceAll('https://zktecowfm.com', 'https://www.zktecowfm.com');

      const pagePath = sourcePath.split('/src/pages/')[1];
      if (!pagePath || !normalizedCode.includes('</head>')) return normalizedCode;

      const route = pagePath === 'index.astro'
        ? '/'
        : `/${pagePath.replace(/\/index\.astro$/, '/').replace(/\.astro$/, '')}`;
      const canonical = `https://www.zktecowfm.com${route}`;
      const isNotFoundPage = pagePath === '404.astro';
      const seoTags = [
        !/name=["']robots["']/i.test(normalizedCode)
          ? `<meta name="robots" content="${isNotFoundPage ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'}" />`
          : '',
        !/rel=["']canonical["']/i.test(normalizedCode)
          ? `<link rel="canonical" href="${canonical}" />`
          : '',
        !/property=["']og:site_name["']/i.test(normalizedCode)
          ? '<meta property="og:site_name" content="ZKTeco WFM" />'
          : '',
        !/name=["']twitter:card["']/i.test(normalizedCode)
          ? '<meta name="twitter:card" content="summary_large_image" />'
          : '',
        pagePath === 'index.astro' && !/application\/ld\+json/i.test(normalizedCode)
          ? `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://www.zktecowfm.com/#organization","name":"ZKTeco WFM","url":"https://www.zktecowfm.com/","logo":"https://www.zktecowfm.com/assets/wfm-hcm-logo.svg"},{"@type":"WebSite","@id":"https://www.zktecowfm.com/#website","url":"https://www.zktecowfm.com/","name":"ZKTeco WFM","publisher":{"@id":"https://www.zktecowfm.com/#organization"}}]}</script>`
          : '',
      ].filter(Boolean).join('');

      return seoTags ? normalizedCode.replace('</head>', `${seoTags}</head>`) : normalizedCode;
    },
  },
};

export default defineConfig({
  site: 'https://www.zktecowfm.com',
  output: 'static',
  trailingSlash: 'never',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  vite: {
    plugins: [cleanInternalRoutes],
  },
});
