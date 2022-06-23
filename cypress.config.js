const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    baseUrl: 'https://boostbrothers-bikes-api.herokuapp.com/motorcycles/'
  },
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family == 'chromium') {
          launchOptions.args.push('--auto-open-devtools-for-tabs')
          return launchOptions;
        }
      })
    },
  },
});
