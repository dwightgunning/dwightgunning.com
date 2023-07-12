import { defineConfig, sharpImageService } from 'astro/config';
import mdx from '@astrojs/mdx';
import robotsTxt from './src/integrations/robotsTxt';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

const PRODUCTION_SITE = 'https://www.dwightgunning.com';

export default defineConfig({
  experimental: {
    assets: true,
  },
  image: {
    service: sharpImageService(),
  },
  integrations: [
    // @ts-ignore
    mdx(),
    tailwind({
      applyBaseStyles: false,
      // config: {
      // },
    }),
    robotsTxt({
      productionSite: PRODUCTION_SITE,
    }),
    sitemap({
      filter: (page) => !page.split(`${PRODUCTION_SITE}/outdoors/tags/`)[1],
    }),
  ],
  site: PRODUCTION_SITE,
  vite: {
    assetsInclude: ['**/*.gpx', '**/*.pmtiles'],
  },
});
