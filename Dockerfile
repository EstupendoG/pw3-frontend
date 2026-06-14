FROM node:alpine AS build

WORKDIR /app

COPY ./package*.json .

RUN npm ci

# Variáveis que não vão para o bundle do vite
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY . .


RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80