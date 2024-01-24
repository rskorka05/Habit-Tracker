// webpack.config.js lub craco.config.js
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  // ... pozostała konfiguracja webpack

  plugins: [
    // ... inne pluginy

    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
