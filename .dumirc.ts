import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  plugins: ['@umijs/plugins/dist/tailwindcss'],
  tailwindcss: {},
  themeConfig: {
    name: 'Vogue',
  },
});
