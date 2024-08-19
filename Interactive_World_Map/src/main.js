import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createWebHistory, createRouter } from 'vue-router';
import App from './App.vue';

import MapView from './components/Map.vue';
import CountryView from './components/SelectionOutput.vue';


const routes = [
  { path: '/', component: App },
  { path: '/country/:countryName', component: SelectionOutput, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount("#app");
