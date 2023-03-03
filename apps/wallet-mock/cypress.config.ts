import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'iwhc4r',
  e2e: {
    baseUrl: 'http://localhost:3000',
    fileServerFolder: '.',
    specPattern: '**/*.cy.{js,jsx,ts,tsx}',
    modifyObstructiveCode: false,
    supportFile: './src/support/index.ts',
    video: false,
    videoUploadOnPasses: false,
    videosFolder: './cypress/videos',
    screenshotsFolder: './cypress/screenshots',
    chromeWebSecurity: false,
    viewportWidth: 1440,
    viewportHeight: 900,
  },
  env: {},
})
