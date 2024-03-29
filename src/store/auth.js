import firebase from 'firebase/app';
require('firebase/auth');
import router from '@/router';

export default {
  state() {
    return {
      user: null,
    };
  },
  getters: {
    isLoggedIn(state) {
      return !!state.user;
    },
    getEmail(state) {
      return state.user?.email;
    },
    getName(state) {
      return state.user?.displayName;
    },
    getId(state) {
      return state.user.uid;
    },
  },
  mutations: {
    changeAuth(state, payload) {
      state.user = payload.user;
    },
  },
  actions: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          return '';
          // console.log(router);
          // router.replace('/');
        });
    },
    async login(context, payload) {
      await firebase
        .auth() // Bejelentkezés
        .signInWithEmailAndPassword(payload.email, payload.pass)
        .then(
          () => {
            // alert("Successful login!");
            const user = firebase.auth().currentUser;
            if (user) {
              if (user.emailVerified) {
                // Átírányítás: ha megerősített akkor a demo oldalra
                // this.$router.replace('vuexfirebasedemo');
                console.log('Megerősítve');
              } else {
                // Ha nem megerősített a megerősítő e-mail újraküldés oldalára
                // this.$router.replace('verify');
                console.log('Megerősítés szükséges');
              }
            }
            return '';
            // console.log(router);
            // router.replace('/teacher');
          },
          err => {
            alert('Oops. ' + err.message);
          },
        );
    },
    async signup(context, payload) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.pass)
        .then(
          success => {
            if (success.user) {
              success.user.sendEmailVerification();
              success.user.updateProfile({ displayName: payload.name }).then(() => {
                alert('Sikeres regisztráció!');
                router.go('/choose');
              });
            }
          },
          err => {
            alert('Oops. ' + err.message);
          },
        );
    },
    async social(context, payload) {
      const provider = payload.google
        ? new firebase.auth.GoogleAuthProvider()
        : new firebase.auth.FacebookAuthProvider();
      firebase.auth().languageCode = 'hu';
      await firebase
        .auth() // Bejelentkezés
        // .signInWithPopup(provider)
        .signInWithRedirect(provider)
        .then(
          success => {
            // alert("Successful login!");
            const user = success.user;
            if (user) {
              if (user.emailVerified) {
                // Átírányítás: ha megerősített akkor a demo oldalra
                // this.$router.replace('vuexfirebasedemo');
                console.log('Jó');
              } else {
                // Ha nem megerősített a megerősítő e-mail újraküldés oldalára
                // this.$router.replace('verify');
                console.log('Rossz');
              }
              // router.replace('/teacher');
            }
          },
          err => {
            alert('Oops. ' + err.message);
          },
        );
    },
    changeAuth(context, payload) {
      context.commit('changeAuth', { user: payload?.user ? payload.user : null });
    },
  },
};
