FROM node:22-slim

RUN apt-get update -y \
&& apt-get install -y openssl

WORKDIR /app

COPY ./package*.json ./

RUN npm ci

COPY . . 

RUN npm run build

RUN npm run pg

RUN mv /app/generated /app/dist

EXPOSE 3000


ENTRYPOINT [ "./entrypoint.sh" ]