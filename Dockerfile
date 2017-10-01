FROM node:alpine
RUN mkdir -p /app/lib
ADD lib /app/lib
ADD app.js /app
ADD package.json /app
WORKDIR /app
RUN npm install
ENTRYPOINT ["node", "/app/app.js"]
