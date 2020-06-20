FROM node:14

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
