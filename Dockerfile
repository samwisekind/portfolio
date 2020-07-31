FROM node:14-alpine AS build

WORKDIR /app
COPY . /app

RUN npm ci \
    npm run assets:build \
    npm prune --production

RUN rm -rf ./.cache ./config/test.js package-lock.json README.md ./src/assets

ENV NODE_ENV=production

EXPOSE 3000
CMD ["npm", "start"]
