import { createStore } from 'vuex';
//-Modulok

export default createStore({
  modules: {},
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
