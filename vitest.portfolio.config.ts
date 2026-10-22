import { defineConfig } from 'vitest/config';

// Standalone Node-only project: no root Vite/Storybook configuration or plugins.
export default defineConfig({
  envDir: false,
  cacheDir: '.validation/portfolio/cache/vite',
  plugins: [],
  test: {
    name: 'portfolio-fixtures',
    environment: 'node',
    include: ['src/data/portfolio/fixtures.test.ts', 'src/content/portfolio/adapters.test.ts', 'src/content/portfolio/assembly.test.ts', 'src/content/portfolio/delivery.test.ts'],
    watch: false,
    pool: 'forks',
    maxWorkers: 1,
    browser: { enabled: false },
    cache: false,
    reporters: ['default', 'json'],
    outputFile: { json: '.validation/portfolio/reports/vitest.json' },
    coverage: { enabled: false, reportsDirectory: '.validation/portfolio/coverage' },
  },
});
