# Stage-1 dependencies
FROM node:current-alpine as pre

RUN apk add --no-cache git


WORKDIR /usr/src/app

COPY package.json package.json

RUN apk add --no-cache --virtual .build-deps alpine-sdk python \
 && npm install --production --silent \
 && apk del .build-deps

COPY . .

# Stage-2 final image
FROM node:current-alpine as production

USER node

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --from=pre /usr/src/app ./

CMD ["npm", "start"]
