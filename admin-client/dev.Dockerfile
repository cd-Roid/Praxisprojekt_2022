FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm install --ignore-scripts

COPY . .

EXPOSE 3000

CMD [ "npm","start" ]