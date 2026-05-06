import { generateId } from '@shared/lib/utils';
import { ref } from 'vue';

/**
 * Композабл, генерирующий уникальный идентификатор.
 * Предоставляет реактивный ID и функцию для его перегенерации.
 *
 * @param initialValue - Опциональное начальное значение ID. Если не передано — будет сгенерирован автоматически.
 * @returns Объект с реактивным `id` и функцией `regenerateId`.
 *
 * @example
 * const { id, regenerateId } = useGeneratedId();
 * regenerateId(); // 'gen-a1b2c3d4'
 * 
 */
export const useGeneratedId = (initialValue?: string) => {
  // Реактивное значение ID
  const id = ref(initialValue || generateId());
  
  /**
   * Функция для перегенерации идентификатора.
   * Заменяет текущее значение `id` на новый сгенерированный ID.
   *
   * @example
   * regenerateId(); // Генерирует новый ID
   */
  const regenerateId = () => {
    id.value = generateId();
  };
  
  return {
    id,
    regenerateId
  };
};