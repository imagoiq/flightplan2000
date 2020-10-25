const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/flightplan2000/' // Github repository name, require with Github Actions and Pages
    : '/',
  configureWebpack: {
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, 'dist'),
      // Needed to compile multiline strings in Cesium
      sourcePrefix: ''
    },
    optimization: {
      namedChunks: (process.env.NODE_ENV === 'development'),
      runtimeChunk: 'single',
      moduleIds: 'hashed',
      usedExports: true
    }
  }
};
