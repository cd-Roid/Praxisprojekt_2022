FROM node:18.0.0-alpine3.13

WORKDIR /app

COPY package*.json ./

RUN npm install --ignore-scripts --production

COPY . .

EXPOSE 3000

CMD [ "npm","run", "build" ]