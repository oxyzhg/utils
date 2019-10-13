const path = require('path');
const files = require.context('./src', false, /\.vue/);

const modules = {};

console.log(files);

files.keys().forEach(key => {
  console.log('====================================');
  console.log(key);
  console.log('====================================');
  const name = path.basename(key, '.vue');
  modules[name] = files(key).default || files(key);
});

console.log(modules);
