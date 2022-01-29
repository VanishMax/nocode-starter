import { Core } from 'nocode-starter-core';
import { createApp } from 'vue';
import App from './App.vue';

const c: Core = {
  hello: 'world',
};

createApp(App).mount('#app');
