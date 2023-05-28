import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import robotsTxt from './src/integrations/robotsTxt';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

const PRODUCTION_SITE = 'https://www.dwightgunning.com';

export default defineConfig({
  experimental: {
    assets: true,
  },
  integrations: [
    // @ts-ignore
    mdx(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    robotsTxt({
      productionSite: PRODUCTION_SITE,
    }),
    sitemap(),
  ],
  vite: {
    assetsInclude: ['**/*.gpx', '**/*.pmtiles'],
  },
});
