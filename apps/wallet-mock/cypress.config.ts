import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'iwhc4r',
  e2e: {
    baseUrl: 'http://localhost:3000',
    chromeWebSecurity: false,
    fileServerFolder: '.',
    modifyObstructiveCode: false,
    screenshotsFolder: './cypress/screenshots',
    specPattern: '**/*.cy.{js,jsx,ts,tsx}',
    supportFile: './src/support/index.ts',
    testIsolation: false,
    video: false,
    videosFolder: './cypress/videos',
    videoUploadOnPasses: false,
    viewportHeight: 900,
    viewportWidth: 1440,
  },
  env: {},
})
