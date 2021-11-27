FROM node:17.1-alpine as base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

####   build    ####
FROM base as build
ENV NODE_ENV=build
WORKDIR /build
COPY --from=base /usr/src/app ./
RUN npm run build

####   production    ####
FROM node:17.1-alpine as production
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=build /build/package*.json ./
# COPY --from=build /build/node_modules/ ./node_modules
COPY --from=build /build/dist/ ./dist
COPY --from=build /build/prisma/ ./prisma/
COPY Procfile .
RUN npm install @nestjs/core @nestjs/common rxjs reflect-metadata

CMD ["node", "dist/main.js"]