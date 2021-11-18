# Install dependencies only when needed
FROM node:17.0.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

CMD ["npm", "run", "dev"]
