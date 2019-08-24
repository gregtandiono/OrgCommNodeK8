FROM node:8

WORKDIR /usr/src/app
COPY . .

RUN yarn 

EXPOSE 1337

CMD yarn start:prod