import { Core } from 'nocode-starter-core';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const c: Core = {
  hello: 'world',
};

createApp(App)
  .use(router)
  .mount('#app');
