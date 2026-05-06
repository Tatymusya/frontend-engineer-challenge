# Shared Layer

Общие переиспользуемые модули проекта.

## 📁 Структура

- `composables/` — реактивные хуки (`useGeneratedId`)
- `config/` — конфигурации, API (`apiService`, ...), переменные окружения, общие константы, Env...
- `lib/` — утилиты (`generateId`, `toMs`)
- `types/` — общие типы (`ICommonProps`)
- `ui/` — компоненты (`AppButton`, `AppForm`, ...)
- `test-utils/` — только для тестов

## 📦 Экспорт

Необходимо использовать **глубокие импорты**:

```ts
import { apiService } from "@shared/config";
import { generateId } from "@shared/lib";
import { AppButton } from "@shared/ui";
```
