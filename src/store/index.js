import Vue from 'vue';
import Vuex from 'vuex';

import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

/*
  Import Modules
*/

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/);

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

/*
  Define persisted data
*/

const vuexLocalStorage = new VuexPersistence({
  key: 'flightPlans',
  storage: window.localStorage,
  module: 'flightPlans'
});

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
  plugins: [ vuexLocalStorage.plugin ]
});
