import Vue from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';

import '@/assets/styles/index.postcss';

/*
  Plugins
*/

import VueStatic from 'vue-static'; // Add a 'static' object similar to 'data' but without reactivity for cleaner code
Vue.use(VueStatic);

import VTooltip from 'v-tooltip';
Vue.use(VTooltip);

/*
  Polyfill
*/

import('focus-visible'); // Polyfill focus-visible pseudo-class especially targetted to keyboard users

/*
  Config and log
*/

Vue.config.productionTip = process.env.NODE_ENV === 'production';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
