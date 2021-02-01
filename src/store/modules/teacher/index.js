import teacher from '../../../config/axiosTeacher.config';

export default {
  namespaced: true,
  state() {
    return {
      data: [],
      dirs: [],
    };
  },
  getters: {
    getData(state) {
      return state.data;
    },
    getDirs(state) {
      return state.dirs;
    },
  },
  mutations: {
    setData(state, payload) {
      state.dirs = payload.data.dirs;
      delete payload.data.dirs;
      state.data = payload.data;
    },
  },
  actions: {
    async getQuizez(context) {
      const id = context.rootGetters.getId;
      await teacher
        .get(`/${id}.json`)
        .then(res => {
          context.commit('setData', { data: res.data });
        })
        .catch(console.error);
    },
    addQuiz(context, { name }) {
      console.log('Called');
      const id = context.rootGetters.getId;
      teacher
        .post(`/${id}.json`, {
          name,
        })
        .then(() => {
          console.log('Done');
        })
        .catch(console.error);
    },
  }, //. Változtatás meghívása --> context, payload
};
