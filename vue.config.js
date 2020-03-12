const path = require('path');

const resolve = dir => path.join(__dirname, dir);

module.exports = {
  publicPath: '/',
  devServer: {
    port: 7001,
    open: false
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('utils', resolve('utils'))
      .set('components', resolve('components'));
  }
};
