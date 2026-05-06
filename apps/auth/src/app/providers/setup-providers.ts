import piniaStore from '@app/providers/pinia/store';
import { router } from '@app/providers/router';
import { queryClient } from '@app/providers/tanstack-query/query';
import { VueQueryPlugin } from '@tanstack/vue-query';
import type { App } from 'vue';

/**
 * Настраивает и подключает все глобальные провайдеры приложения.
 * Вызывается один раз при инициализации Vue-приложения.
 *
 * @param app - Экземпляр Vue-приложения
 */
export function setupProviders(app: App): void {
  // === Настройка обработки ошибок ===

  // === Подключение внешних инструментов мониторинга ===
  if (import.meta.env.PROD) {
    //initSentry();
  }

  // === Подключение Vue-расширений (в правильном порядке) ===
  app.use(piniaStore);           // Состояние
  app.use(router);               // Роутинг (должен быть после Pinia, если используются хранилища в guards)
  app.use(VueQueryPlugin, {      // Асинхронные запросы
    queryClient,
  });
}