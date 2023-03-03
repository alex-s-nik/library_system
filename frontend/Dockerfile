FROM node:19-alpine
EXPOSE 4200
WORKDIR /app

RUN npm install -g @angular/cli

COPY package.json package-lock.json ./
RUN npm install
COPY . .

CMD ["ng", "serve", "--host", "0.0.0.0", "--proxy-config", "proxy-docker.conf.json"]
