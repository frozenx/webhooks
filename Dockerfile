FROM node:10.15.1-alpine

COPY . /var/tesco

COPY .npmrc /var/tesco/client


WORKDIR /var/tesco/client
RUN npm install --no-cache && npm run build


WORKDIR /var/tesco/server
RUN     npm install --no-cache


EXPOSE 4000 

CMD [ "cd", "server" ]
CMD ["npm", "start"]



