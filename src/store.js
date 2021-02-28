import { createStore } from 'vuex';
import Auth from '@/store/auth';
import Teacher from '@/store/teacher';
import User from '@/store/user';

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
