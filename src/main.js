import { createApp, defineAsyncComponent } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import axios from 'axios';

//? Nem jó?!
// axios.defaults.baseURL = 'https://quizy5-default-rtdb.europe-west1.firebasedatabase.app';

//-Componensek
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BaseButton from './components/UI/BaseButton.vue';
import BaseInput from './components/UI/BaseInput.vue';
//. Ha ritkán van használva
const BaseLoader = defineAsyncComponent(() => import('./components/UI/BaseLoader.vue'));

//* FonttAwesome
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
// library.add(faUserSecret);

const app = createApp(App);

app.use(store);
app.use(router);

//-Componens use
// app.component('font-awesome-icon', FontAwesomeIcon);
app.component('base-button', BaseButton);
app.component('base-input', BaseInput);
app.component('base-loader', BaseLoader);

app.mount('#app');
