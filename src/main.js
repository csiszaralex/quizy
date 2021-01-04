import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//-Axios

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

app.mount("#app");
