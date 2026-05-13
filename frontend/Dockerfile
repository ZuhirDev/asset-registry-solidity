FROM node:22-alpine3.20 AS base

ENV DIR=/app
WORKDIR $DIR

FROM base AS dev
ENV NODE_ENV=development

RUN apk add --no-cache dumb-init

COPY package*.json .
RUN npm install

COPY vite.config.ts .
COPY index.html .
COPY src src

EXPOSE 5173

CMD ["dumb-init", "npm", "run", "dev", "--", "--host"]