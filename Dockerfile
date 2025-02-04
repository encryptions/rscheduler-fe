FROM node:22.13.0-alpine3.20
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY ./dist/reddit-panel /app
RUN npm install -g serve
EXPOSE 4200
CMD ["serve", "-s", ".", "-l", "4200"]