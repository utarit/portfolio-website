// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    imageService: true,
    webAnalytics: { enabled: true }
  }),
  integrations: [
    solidJs(),
    tailwind({
      applyBaseStyles: false,
    })
  ],
  vite: {
    ssr: {
      noExternal: ['motion', '@motionone/solid']
    }
  }
});