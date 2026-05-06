# === Stage 1: Build Dependencies ===
FROM node:18-alpine AS deps

# Устанавливаем рабочую директорию для монорепо
WORKDIR /app

# Копируем корневые файлы package.json и turbo.json
COPY package.json turbo.json ./

# Копируем package.json каждого пакета
COPY packages/ui/package.json packages/ui/package.json
COPY apps/auth/package.json apps/auth/package.json

# Устанавливаем зависимости (с кэшированием)
RUN npm ci --prefer-offline

# === Stage 2: Build App ===
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем package*.json и vite.config.ts
COPY . .

# Копируем зависимости из первого этапа
COPY --from=deps /app/node_modules ./node_modules

# Собираем приложение через Turbo
RUN npx turbo run build --filter=@my-auth/auth

# === Stage 3: Run App ===
FROM nginx:alpine AS runner

# Создаём non-root пользователя
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Копируем сбилденные ассеты
COPY --from=builder /app/apps/auth/dist /usr/share/nginx/html

# Копируем конфиг Nginx
COPY apps/auth/nginx.conf /etc/nginx/conf.d/default.conf

# Переключаемся на non-root
USER nextjs

# Экспозим порт
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]