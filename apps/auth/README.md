# Auth Frontend Challenge

> Frontend-решение для аутентификации: регистрация, вход, восстановление пароля  
> Построено на Vue 3 + TypeScript + Pinia + Vite с акцентом на архитектуру, надёжность и UX.

[![Build Status](https://img.shields.io/github/actions/workflow/status/your-username/auth-challenge/ci.yml?branch=main)](https://github.com/your-username/auth-challenge/actions)
[![Coverage](https://img.shields.io/codecov/c/github/your-username/auth-challenge)](https://codecov.io/gh/your-username/auth-challenge)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 🎯 Контекст задачи

Это frontend-реализация под backend из [engineer-challenge](https://github.com/atls-academy/engineer-challenge).  
Реализованы три ключевых сценария:

1. **Регистрация**
2. **Авторизация**
3. **Восстановление пароля**

Дизайн взят из Figma: [Orbitto Service Design](https://www.figma.com/design/31KetUbya482vMSGgyiNIf/Orbitto-%7C-Service--Copy-?node-id=102-12806&t=TMlkJ3c3j3vJF5fb-4)

---

## 🔧 Технологический стек

| Категория    | Выбор                        | Альтернативы (почему не выбраны)                         |
| ------------ | ---------------------------- | -------------------------------------------------------- |
| Фреймворк    | **Vue 3 (Composition API)**  | React — избыточен для задачи; Angular — тяжеловесен      |
| Состояние    | **Pinia**                    | Zustand/Vuex — Pinia проще и лучше типизирована          |
| Роутинг      | **Vue Router 4**             | Нет конкурентов в экосистеме Vue                         |
| HTTP-клиент  | **Axios**                    | Fetch API — нет interceptors; SWR — не подходит для auth |
| Валидация    | **Zod**                      | Yup/Joi — Zod предлагает лучшую интеграцию с TS          |
| Тестирование | **Vitest + Testing Library** | Jest — медленнее; Cypress — избыточен для unit-тестов    |
| Линтинг      | **Oxlint**                   | ESLint — медленнее; Oxlint оптимизирован под TS          |
| Документация | **Typedoc + VitePress**      | JSDoc — Typedoc генерирует красивый UI                   |

### Почему Vue?

- Баланс между простотой и мощью
- Отличная поддержка TypeScript
- Меньше boilerplate по сравнению с React
- Подходит для быстрой итерации и долгосрочной поддержки

---

## 🏗 Архитектура (FSD-inspired)

Проект организован по принципам **Feature-Sliced Design (FSD)**:
