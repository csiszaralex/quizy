const API = 'AIzaSyAEUdR4OR7-542uQpbZBb2evEo6c1i8CnM';
let timer;

export default {
  state() {
    return {
      userId: null,
      token: null,
      didAutoLogout: false
    };
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    didAutoLogout(state) {
      return state.didAutoLogout;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.didAutoLogout = false;
    },
    setAutoLogout(state) {
      state.didAutoLogout = true;
    }
  },
  actions: {
    async login(context, payload) {
      return context.dispatch('auth', { ...payload, mode: 'login' });
    },
    async signup(context, payload) {
      return context.dispatch('auth', { ...payload, mode: 'signup' });
    },
    async auth(context, payload) {
      const mode = payload.mode;
      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API;
      if (mode === 'signup') {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API;
      }
      console.log('auth', payload);

      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.pass,
          returnSecureToken: true
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error.message || 'Failed to authanticate.');
      }

      const expDate = new Date().getTime() + data.expiresIn * 1000;

      localStorage.setItem('token', data.idToken);
      localStorage.setItem('userId', data.localId);
      localStorage.setItem('tokenExp', expDate);

      timer = setTimeout(() => {
        context.dispatch('autoLogout');
      }, +data.expiresIn * 1000);

      context.commit('setUser', {
        token: data.idToken,
        userId: data.localId
      });
    },
    autoLogin(context) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const tokenExp = localStorage.getItem('tokenExp');

      const expIn = +tokenExp - new Date().getTime();

      if (expIn < 0) {
        return;
      }

      timer = setTimeout(function() {
        context.dispatch('autoLogout');
      }, expIn);

      if (token && userId) {
        context.commit('setUser', {
          token,
          userId
        });
      }
    },
    logout(context) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('tokenExp');

      clearTimeout(timer);

      context.commit('setUser', {
        token: null,
        userId: null
      });
    },
    autoLogout(context) {
      context.dispatch('logout');
      context.commit('setAutoLogout');
    }
  }
};
