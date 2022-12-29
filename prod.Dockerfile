# Build frontend files first
FROM node:lts as frontend

WORKDIR /frontend

COPY /frontend/package*.json ./

RUN npm install --ignore-scripts --omit=dev

COPY . ./

RUN npm run build



#Build admin-client files

FROM node:lts as admin-client

WORKDIR /admin-client

COPY /admin-client/package*.json ./

RUN npm install --ignore-scripts --omit=dev

COPY . ./

RUN npm run build


# Add both frontend and admin-client files to nginx image

FROM nginx:alpine

COPY --from=frontend /frontend/build/ /usr/share/nginx/html/frontend/
COPY --from=admin-client /admin-client/build/ /usr/share/nginx/html/admin-client/

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]



