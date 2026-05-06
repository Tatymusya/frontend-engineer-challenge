[!  Библиотека находится в процессе разработки ]

# 🎨 @tatymusaeva/orbitto

Компонентная библиотека и дизайн-система для проектов на Vue 3.
@tatymusaova/orbitto — это набор переиспользуемых, доступных и стилизованных компонентов, созданных с использованием Vue 3, Vite и TypeScript.

## ✨ Особенности

- 🧱 Готовые UI-компоненты: Button, Input, Heading, Label, Skeleton и другие
- 🎨 Полная поддержка темизации через CSS-переменные
- 🔍 Доступность (a11y) из коробки
- 📱 Адаптивные и отзывчивые компоненты
- 🧪 Покрыты сторисами в Storybook
- 📦 Лёгкая установка и использование
- 💬 Поддержка TypeScript


## 🚀 Установка

```bash
pnpm add @tatymusaeva/orbitto
```

## 🔧 Использование

### Импорт компонентов

```vue
<script setup>
import { Button, Input, Label, ErrorMessage } from '@tatymusaeva/orbitto';
</script>

<template>
  <form>
    <Label for="email">Email</Label>
    <Input id="email" type="email" placeholder="Enter your email" />
    <ErrorMessage message="Invalid email address" />
    <Button type="submit">Submit</Button>
  </form>
</template>
```

⚠️ На данный момент стили включены в каждый компонент. Отдельный файл стилей можно добавить при необходимости.


## 🧩 Доступные компоненты

| Компонент        | Описание                              |
|------------------|---------------------------------------|
| `Form`           | Компонент формы                       |
| `Button`         | Кнопка с вариантами стилизации        |
| `ErrorMessage`   | Сообщение об ошибке валидации         |
| `Heading`        | Заголовок разных уровней              |
| `Input`          | Поле ввода                            |
| `Label`          | Метка для формы                       |
| `Paragraph`      | Параграф текста                       |
| `Skeleton`       | Скелетон загрузки                     |
| `Link`           | Ссылка                                |

## 📖 Документация

Полная документация и живые примеры доступны в **Storybook**:

```bash
pnpm run storybook
```
→ Откройте [http://localhost:6006]

## 🛠 Разработка

Установка зависимостей

```bash
pnpm install
```

### Запуск Storybook

```bash
pnpm run storybook
```

**Storybook** запустится на [http://localhost:6006].

### Сборка

```bash
pnpm run build
```

Собирает компоненты в dist/ с типами (*.d.ts) и ES-модулями.

### Preview сборки

```bash
pnpm run preview
```

### Storybook build

```bash
pnpm run build-storybook
```
## 📦 Публикация в npm

Только для владельцев scope **@tatymusaeva**

```bash
npm publish --access public --//registry.npmjs.org/:_authToken=ВАШ_ТОКЕН
```
#### Убедитесь, что:

- Версия в package.json обновлена
- Собрана последняя версия: pnpm run build
- Вы вошли в npm: npm login


## ✨ Технологии

- **Vue 3** — основной фреймворк
- **TypeScript** — типизация
- **Vite** — сборка
- **Storybook** — документация и разработка компонентов
- **Vitest** — тестирование

## 🤝 Вклад

Приветствуются pull request'ы!

Если нашли баг или хотите добавить компонент — создайте issue или PR.

## 📄 Лицензия

MIT © Orbitto

💡 Проект находится в активной разработке.

Следите за обновлениями!