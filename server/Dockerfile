FROM node:10.15.1-alpine

#Create app directory
RUN mkdir -p /srv/app/tps-ui-server
WORKDIR /srv/app/tps-ui-server

COPY package.json /srv/app/tps-ui-server
COPY package-lock.json /srv/app/tps-ui-server

RUN npm install

COPY . /srv/app/tps-ui-server

CMD ["npm", "start"]