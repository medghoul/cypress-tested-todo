const { defineConfig } = require('cypress')

module.exports = defineConfig({
  chromeWebSecurity: false,
  video: false,
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/frameworks/**/*.cy.{js,jsx,ts,tsx}',
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      return config
    },
    defaultBrowser: 'electron'
  },
})
