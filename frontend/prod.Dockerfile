# Build frontend
FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm install --ignore-scripts --omit=dev

COPY . .

CMD [ "npm","run", "build" ]

