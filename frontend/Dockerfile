# Install dependencies only when needed
FROM node:17.0.1-alpine

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install --frozen-lockfile

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
