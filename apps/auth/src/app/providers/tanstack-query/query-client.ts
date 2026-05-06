import { QueryClient } from '@tanstack/vue-query';

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
          // Не ретраим validation и business ошибки
          if (error && (error as any).type === 'BUSINESS' || (error as any).type === 'VALIDATION') {
            return false;
          }
          return failureCount < 3;
        },
        throwOnError: false, // Чтобы не падало в unhandledRejection
      },
      mutations: {
        throwOnError: false,
      },
    },
    // Глобальный обработчик ошибок для всех query/mutation
  });
}