FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm install --ignore-scripts --production

COPY . .

ENV PORT=9000

EXPOSE ${PORT}

RUN npm run build

CMD [ "npm","run", "start" ]