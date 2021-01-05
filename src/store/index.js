import { createStore } from 'vuex';
//-Modulok
import Auth from './modules/auth/index';

export default createStore({
  modules: { Auth },
  state() {
    return {};
  },
  mutations: {},
  actions: {},
  getters: {}
});

// return this.$store.getters['numbers/getOtherCounter'];
/*
export default {
  state() {
    return {}; //. Adatok
  },
  mutations: {}, //. Adatok változaatása --> state, payload
  actions: {}, //. Változtatás meghívása --> context, payload
  getters: {} //. Lekérdezés --> state, getters, rootState, rootGetters
};

*/
