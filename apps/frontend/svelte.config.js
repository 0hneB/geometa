import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { fileURLToPath } from 'node:url';
import { remarkHeadings } from './src/lib/docs/remark-headings.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.svx'],

  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.svx'],
      layout: fileURLToPath(
        new URL('./src/lib/components/docs/MarkdownLayout.svelte', import.meta.url)
      ),
      layoutPropForwarding: 'runes',
      remarkPlugins: [remarkHeadings]
    })
  ],

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    version: {
      pollInterval: 3000
    },
    alias: {
      $routes: 'src/routes',
      '@api': '../api/src'
    },
    prerender: {
      crawl: false
    }
  }
};

export default config;
