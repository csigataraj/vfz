import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './playwright-e2e-tests/tests',
  testMatch: '**/*.spec.ts',
  retries: 1,
  timeout: 60000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    baseURL: 'http://localhost:5173',
  },
});
