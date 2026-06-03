const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');

function applyEnvFile(config) {
  const envFileName = process.env.CYPRESS_ENV_CONFIG;

  if (envFileName) {
    const envFilePath = path.resolve(__dirname, envFileName);

    if (fs.existsSync(envFilePath)) {
      const envFromFile = JSON.parse(fs.readFileSync(envFilePath, 'utf8'));
      config.env = { ...config.env, ...envFromFile };
    }
  }

  if (config.env.viewportWidth) {
    config.viewportWidth = Number(config.env.viewportWidth);
    config.viewportHeight = Number(config.env.viewportHeight);
  }

  return config;
}

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      return applyEnvFile(config);
    },
  },
});
