# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

RUN npm install -g @angular/cli@19.2.15

COPY package*.json ./
RUN npm ci

COPY . .

RUN ng build


# Using nginx as reverse proxy for handling backend requests
FROM nginx:latest

COPY /nginx.conf /etc/nginx/conf.d/stockSystem.conf

COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 8080