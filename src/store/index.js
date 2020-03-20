import Vue from "vue";
import Vuex from "vuex";

import loginModule from "./modules/login";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    loginModule //Manage the login logic and states
  }
});
