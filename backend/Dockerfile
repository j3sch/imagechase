FROM node:17.0.1-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build




FROM node:17.0.1-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install --only=production
COPY . /app
COPY --from=development /app/dist ./dist
EXPOSE 5000
RUN chown -R node: /app
USER node
CMD ["node", "dist/main"]