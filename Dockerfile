# --- Используем Node образ для сборки ---
FROM node:20-alpine as build

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

RUN npm run build

# --- Production образ nginx ---
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Копируем nginx конфиг (опционально)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
