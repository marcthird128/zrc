const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    client: './src/client/main.js',
    server: './src/server/main.js',
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },

  target: 'node',
};