import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1200,
  viewportHeight: 800,
  e2e: {
    baseUrl: 'http://localhost:4200/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
