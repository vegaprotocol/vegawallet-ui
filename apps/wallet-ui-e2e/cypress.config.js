const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: '',

  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
    baseUrl: 'http://localhost:3000',
    fileServerFolder: '.',
    specPattern: '**/*.cy.{js,jsx,ts,tsx}',
    modifyObstructiveCode: false,
    supportFile: './src/support/index.js',
    video: false,
    videoUploadOnPasses: false,
    videosFolder: '../../dist/cypress/apps/wallet-ui-e2e/videos',
    screenshotsFolder: '../../dist/cypress/apps/wallet-ui-e2e/screenshots',
    chromeWebSecurity: false,
    viewportWidth: 1440,
    viewportHeight: 900,
  },
  env: {
    environment: 'CUSTOM',
    commitHash: 'dev',
    tsConfig: 'tsconfig.json',
    grepTags: '@regression @smoke @slow',
    grepFilterSpecs: true,
    grepOmitFiltered: true,
  },
});
