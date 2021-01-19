import { createApp, defineAsyncComponent } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
//: FireBase
import { rtdbPlugin as VueFire } from 'vuefire';
import firebase from 'firebase/app';
require('firebase/auth');
import firebaseConfig from './config/firebase.config';
import BaseButton from './components/UI/BaseButton.vue';
import BaseInput from './components/UI/BaseInput.vue';
const BaseLoader = defineAsyncComponent(() => import('./components/UI/BaseLoader.vue'));

firebase.initializeApp(firebaseConfig);

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

  app.component('base-button', BaseButton);
  app.component('base-input', BaseInput);
  app.component('base-loader', BaseLoader);

  app.mount('#app');
});
