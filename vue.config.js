const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: '/',
  devServer: {
    port: 7001,
    open: true
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('utils', resolve('utils'))
      .set('store', resolve('store'));
  }
};
