import firebase from 'firebase/app';
require('firebase/auth');
// import { useRouter } from 'vue-router';
// const router = useRouter();
// import router from '../../../router/index.js';

export default {
  state() {
    return {
      user: null
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
    }
  },
  mutations: {
    changeAuth(state, payload) {
      state.user = payload.user;
    }
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
          }
        );
    },
    signup(context, payload) {
      firebase
        .auth() // Felhasználó létrehozása
        .createUserWithEmailAndPassword(payload.email, payload.pass)
        .then(
          success => {
            if (success.user) {
              // Ha sikeres regisztráció, a visszaigazoló e-mail kiküldése
              success.user.sendEmailVerification().then(
                () => {
                  alert('Verification e-mail sent!');
                },
                () => {
                  alert('Failed to send verification e-mail!');
                }
              );
            }
            alert('Successful SignUp!');
            // this.$router.replace('verify'); // Átirányítás a megerősítő email újraküldés oldalára
          },
          err => {
            alert('Oops. ' + err.message);
          }
        );
    },
    social(context, payload) {
      const provider = payload.google
        ? new firebase.auth.GoogleAuthProvider()
        : new firebase.auth.FacebookAuthProvider();
      firebase.auth().languageCode = 'hu';
      firebase
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
          }
        );
    },
    changeAuth(context, payload) {
      context.commit('changeAuth', { user: payload?.user ? payload.user : null });
    }
  }
};
