# My Auth Monorepo

A Vue 3 + TypeScript monorepo authentication application built with Turborepo.

## Structure

```
my-auth-monorepo/
├── apps/
│   └── auth/                → Vue 3 + Vite application (FSD architecture)
│       └── src/
│           ├── app/         → App initialization, router, global styles
│           ├── pages/       → Pages (Home, Login)
│           ├── features/    → Features (auth feature)
│           ├── entities/    → Entities (user entity)
│           ├── widgets/     → Widgets (layouts)
│           ├── mock-server/ → Mock server for tests
│           └── shared/      → Shared UI, lib, utils
├── packages/
│   └── ui/                  → @company/ui component library with Storybook
├── package.json
├── turbo.json
└── tsconfig.base.json
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.15.3

### Installation

```bash
pnpm install
```

### Development

Run all applications in development mode:

```bash
pnpm run dev
```

This will start:

- Auth Frontend at http://localhost:3000
- Storybook at http://localhost:6006

### Build

Build all applications and packages:

```bash
pnpm run build
```

### Storybook

Run Storybook to view and test components:

```bash
pnpm run storybook
```

### Lint (Oxlint)

Lint all code:

```bash
pnpm run lint
```

### Format

Format all code with Oxlint:

```bash
pnpm run format
```

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **Turborepo** - High-performance build system
- **Pinia** - Vue state management
- **Vue Router** - Official router for Vue.js
- **Storybook** - Component development environment

## Packages

### @my-auth/auth

The main authentication frontend application built with FSD (Feature-Sliced Design) architecture:

- **app/** - Application initialization, global router and styles
- **pages/** - Page components (HomePage, LoginPage)
- **features/** - Feature modules (authentication feature)
- **entities/** - Business entities (user entity with store)
- **shared/** - Shared reusable components and utilities

### @company/ui

Shared UI component library with:

- Button component (primary, secondary, outline variants)
- Input component (with validation support)
- Card component (with header, body, footer slots)

## License

MIT
