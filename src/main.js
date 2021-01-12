import { createApp, defineAsyncComponent } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
//- Componensek
import BaseButton from './components/UI/BaseButton.vue';
import BaseInput from './components/UI/BaseInput.vue';
const BaseLoader = defineAsyncComponent(() => import('./components/UI/BaseLoader.vue'));
import { rtdbPlugin as VueFire } from 'vuefire';
//. /app a dev verzióhoz csak
import firebase from 'firebase/app';
require('firebase/auth');

const firebaseConfig = {
  apiKey: 'AIzaSyAEUdR4OR7-542uQpbZBb2evEo6c1i8CnM',
  authDomain: 'quizy5.firebaseapp.com',
  databaseURL: 'https://quizy5-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'quizy5',
  storageBucket: 'quizy5.appspot.com',
  messagingSenderId: '431282191811',
  appId: '1:431282191811:web:cd034fbf4b71078da55176'
};

firebase.initializeApp(firebaseConfig);

// onAuthStateChanged: Bejelentkezéskor és kijelentkezéskor fut le
firebase.auth().onAuthStateChanged(user => {
  user = firebase.auth().currentUser;
  if (user) {
    store.dispatch('changeAuth', { user: user });
  } else {
    store.dispatch('changeAuth');
  }
  //*Vue app csinálás
  const app = createApp(App);
  app.use(store);
  app.use(router);

  app.use(VueFire);

  //- Componens use
  app.component('base-button', BaseButton);
  app.component('base-input', BaseInput);
  app.component('base-loader', BaseLoader);

  app.mount('#app');
});
