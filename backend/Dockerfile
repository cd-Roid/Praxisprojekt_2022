FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm install --ignore-scripts

RUN npm install nodemon -g

COPY . .

ENV PORT=9000

EXPOSE ${PORT}

CMD [ "npm","run", "dev" ]