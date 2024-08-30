import './assets/main.css';

import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import App from './App.vue';
import Search from './components/CountrySearch.vue';

const routes = [
  { path: '/', name:'Search', component: Search },
  { path: '/country/:countryId', name:'Country', component: () => import('./components/SelectionOutput.vue'), props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.mount("#app");
