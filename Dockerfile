FROM node:14-alpine AS build

WORKDIR /app
COPY . /app

ENV NODE_ENV=production

RUN npm ci  \
    && npm run assets:build \
    && npm prune --production \
    && rm -rf ./.cache ./config/test.js ./src/assets package-lock.json README.md \
    && find ./src -type f -name '*.spec.js' -delete

EXPOSE 3000
CMD ["npm", "start"]
