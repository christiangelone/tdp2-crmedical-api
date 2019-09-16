FROM node:8-alpine
LABEL maintainer "christiangelone@gmail.com"

WORKDIR /usr/src/api

COPY package.json .
RUN npm install

COPY . .

EXPOSE 3333
CMD [ "npm", "run", "dev" ]