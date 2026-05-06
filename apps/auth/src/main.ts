import { createApp } from 'vue';
import App from '@/App.vue';
import { setupProviders } from '@app/providers/setup-providers';
import '@app/styles/global.css';
import '@tatymusaeva/orbitto/dist/style.css';

const app = createApp(App);
setupProviders(app);
app.mount('#app');
