FROM node:16-alpine as base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

####   build    ####
FROM base as build
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /usr/src/app ./
RUN npm run build

####   production    ####
FROM node:16-alpine as production
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
RUN npm install next

CMD ["npm", "run", "start"]
