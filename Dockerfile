FROM node:10-alpine
WORKDIR /app
COPY ./package.json /app/
RUN npm install
COPY . /app

EXPOSE 4200

CMD ["/bin/sh", "-c", "node build.js && npm run start"]
