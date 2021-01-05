export default {
  state() {
    return {
      logedIn: false
    };
  },
  mutations: {},
  actions: {},
  getters: {
    isLoggedIn(state) {
      return state.loggedIn;
    }
  }
};
