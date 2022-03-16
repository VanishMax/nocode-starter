import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './app.vue';
import index from './router';

import './assets/styles/tailwind.css';
import './assets/styles/normalize.css';
import './assets/styles/fonts.css';
import './assets/styles/global.css';

createApp(App)
  .use(index)
  .use(createPinia())
  .mount('#app');
