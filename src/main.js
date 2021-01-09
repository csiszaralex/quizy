import { createApp, defineAsyncComponent } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

//-Componensek
import BaseButton from './components/UI/BaseButton.vue';
import BaseInput from './components/UI/BaseInput.vue';
const BaseLoader = defineAsyncComponent(() => import('./components/UI/BaseLoader.vue'));

const app = createApp(App);

app.use(store);
app.use(router);

//-Componens use
app.component('base-button', BaseButton);
app.component('base-input', BaseInput);
app.component('base-loader', BaseLoader);

app.mount('#app');
