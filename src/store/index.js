import { createStore } from 'vuex';
import Auth from './modules/auth/index';
import Teacher from './modules/teacher/index';
import User from './modules/user';

export default createStore({
  modules: {
    Auth,
    User,
    teacher: Teacher,
  },
  state() {
    return {};
  },
  mutations: {},
  actions: {},
  getters: {},
});

// return this.$store.getters['numbers/getOtherCounter'];
/*
export default {
  state() {
    return {}; //. Adatok
  },
  getters: {} //. Lekérdezés --> state, getters, rootState, rootGetters
  mutations: {}, //. Adatok változaatása --> state, payload
  actions: {}, //. Változtatás meghívása --> context, payload
};

*/
