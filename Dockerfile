FROM node:14.15.1-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json ./
RUN npm install

COPY . ./

EXPOSE 3000

CMD npm migrateAndStart
