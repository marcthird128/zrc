const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    target: './src/target/main.js',
    host: './src/host/main.js',
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },

  target: 'node',
};