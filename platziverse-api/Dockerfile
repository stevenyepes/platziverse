FROM node:8.9.1-alpine

WORKDIR /usr/src/app/platziverse-api

RUN npm install -g nodemon

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start-dev" ]