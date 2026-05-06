import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

const piniaStore = createPinia();

piniaStore.use(createPersistedState({
    storage: sessionStorage,
  })
);
export default piniaStore;