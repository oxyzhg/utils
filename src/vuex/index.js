import Vue from 'vue';
import Vuex from 'Vuex';
import createLogger from 'vuex/dist/logger';

import modules from './modules';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules,
  plugins: debug ? [createLogger] : []
});
