import users from '@/config/axiosUser.config';

export default {
  state() {
    return {
      //. 0ADMIN,1Teacher, 2Student, 3Mind2
      role: null,
    };
  },
  getters: {
    isTeacher(state) {
      return [0, 1, 3].includes(state.role);
    },
    isStudent(state) {
      return [0, 2, 3].includes(state.role);
    },
    isSwitchable(state) {
      return [0, 3].includes(state.role);
    },
    getRole(state) {
      return state.role;
    },
  },
  mutations: {
    changeRole(state, { role }) {
      state.role = role;
    },
  },
  actions: {
    async role(context) {
      await users
        .get(`/${context.rootGetters.getId}.json`)
        .then(res => {
          const { role } = res.data[Object.keys(res.data)[0]];
          context.commit('changeRole', { role });
        })
        .catch(() => {
          context.commit('changeRole', { role: null });
        });
    },
    async setRole(context, { role }) {
      await users
        .post(`/${context.rootGetters.getId}.json`, {
          role,
        })
        .then(() => {
          context.commit('changeRole', { role });
        });
    },
  },
};
