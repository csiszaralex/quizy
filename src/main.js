import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import axios from 'axios';

//? Nem jó?!
// axios.defaults.baseURL = 'https://quizy5-default-rtdb.europe-west1.firebasedatabase.app';

//-Componensek
//. Ha ritkán van használva
//const BaseDialog = defineAsyncComponent(() =>
// import('./components/ui/BaseDialog.vue')
// );

const app = createApp(App);

app.use(store);
app.use(router);

//-Componens use
//app.component('base-card', BaseCard);

app.mount('#app');
