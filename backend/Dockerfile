FROM node:17.0.1-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

RUN npm run build




FROM node:17.0.1-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install --only=production
COPY . /app
COPY --from=development /app/dist ./dist
ENV PORT 5000
EXPOSE $PORT
RUN chown -R node: /app
USER node
CMD ["node", "dist/main"]