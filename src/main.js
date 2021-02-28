import { createApp, defineAsyncComponent } from 'vue';
import router from '@/router';
import store from '@/store';
import App from '@/App.vue';
import { rtdbPlugin as VueFire } from 'vuefire';
import firebase from 'firebase/app';
require('firebase/auth');
import firebaseConfig from './config/firebase.config';
import 'bootstrap';
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText,
} from '@fortawesome/vue-fontawesome';
import '@/config/fontawesome.config';
import BaseButton from './components/UI/BaseButton.vue';
import BaseInput from './components/UI/BaseInput.vue';
import BaseBadge from './components/UI/BaseBadge.vue';
const BaseLoader = defineAsyncComponent(() => import('./components/UI/BaseLoader.vue'));

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  user = firebase.auth().currentUser;
  if (user) store.dispatch('changeAuth', { user: user });
  else store.dispatch('changeAuth');

  const app = createApp(App);

  app.use(store);
  app.use(router);
  app.use(VueFire);

  app.component('BaseButton', BaseButton);
  app.component('BaseInput', BaseInput);
  app.component('BaseLoader', BaseLoader);
  app.component('BaseBadge', BaseBadge);

  app.component('FaIcon', FontAwesomeIcon);
  app.component('FaLayers', FontAwesomeLayers);
  app.component('FaLayersText', FontAwesomeLayersText);

  app.mount('#app');
});
