FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build


FROM nginx:1.25.1
COPY --from=build /app/dist/frontend /usr/share/nginx/html
