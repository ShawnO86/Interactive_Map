import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createMemoryHistory, createRouter } from 'vue-router';
import App from './App.vue';

import CountryView from './components/SelectionOutput.vue';


const routes = [
  { path: '/country/:countryName', component: CountryView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});


const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount("#app");
