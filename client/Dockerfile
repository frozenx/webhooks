FROM node:10.15.1-alpine

#Create app directory and use it as the working directory
RUN mkdir -p /srv/app/tps-ui-client
WORKDIR /srv/app/tps-ui-client

COPY package.json /srv/app/tps-ui-client
COPY package-lock.json /srv/app/tps-ui-client
COPY .npmrc /srv/app/tps-ui-client

RUN npm install

COPY . /srv/app/tps-ui-client

CMD ["npm", "start"]