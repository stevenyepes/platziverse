FROM node:8.9.1-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache python

WORKDIR /usr/src/app/platziverse-mqtt

RUN npm -g install nodemon

RUN npm install

EXPOSE 1883

CMD node node_modules/platziverse-db/setup.js --y && npm run start-dev