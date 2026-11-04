import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.zktecowfm.com',
  output: 'static',
  trailingSlash: 'never',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
