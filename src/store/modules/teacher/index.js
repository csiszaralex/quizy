import teacher from '../../../config/axiosTeacher.config';

export default {
  namespaced: true,
  state() {
    return {
      data: [],
    };
  },
  getters: {}, //. Lekérdezés --> state, getters, rootState, rootGetters
  mutations: {}, //. Adatok változaatása --> state, payload
  actions: {
    getQuizez(context) {
      const id = context.rootGetters.getId;
      teacher
        .get(`/${id}.json`)
        .then(res => {
          console.log(res.data);
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
