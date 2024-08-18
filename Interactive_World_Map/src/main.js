import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createMemoryHistory, createRouter } from 'vue-router';
import App from './App.vue';

import SelectionOutput from './components/SelectionOutput.vue';


const routes = [
  { path: '/', component: App },
  { path: '/country/:countryName', component: SelectionOutput, props: true },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});


const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount("#app");
