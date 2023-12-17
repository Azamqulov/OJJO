import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuePlyr from 'vue-plyr';
import 'vue-plyr/dist/vue-plyr.css';

createApp(App).use(vuePlyr, { plyr: {} }).use(router).mount('#app')
