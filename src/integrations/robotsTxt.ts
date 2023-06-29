import fs from 'node:fs';
import type { AstroIntegration, AstroConfig } from 'astro';
import type { InlineConfig } from 'vite';

export type RobotsTxtIntegrationConfig = {
  productionSite?: string;
};

const createRobotsTxtIntegration = (options: RobotsTxtIntegrationConfig): AstroIntegration => {
  let config: AstroConfig;
  let vite: InlineConfig;

  return {
    name: '@dwightgunning/RobotsTxt',
    hooks: {
      'astro:config:done': async ({ config: cfg }: { config: AstroConfig }) => {
        config = cfg;
      },
      'astro:build:setup': async ({ vite: viteConfig /*pages, target*/ }) => {
        vite = viteConfig;
      },
      'astro:build:done': async ({ dir }) => {
        let robotsTxtContent;
        if (options.productionSite && options.productionSite === config.site && vite.mode === 'production') {
          robotsTxtContent = `User-agent: *\nDisallow: /assets\n\nDisallow: /design-system/\nAllow:/\n\nSitemap: ${options.productionSite}/sitemap-index.xml`;
        } else {
          robotsTxtContent = 'User-agent: *\nDisallow: /';
        }
        fs.writeFileSync(new URL('robots.txt', dir), robotsTxtContent);
      },
    },
  };
};

export default createRobotsTxtIntegration;
