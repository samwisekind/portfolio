FROM node:14-alpine

WORKDIR /app
COPY . /app

RUN npm ci && \
    npm run assets:build && \
    npm prune --production && \
    rm -rf ./.cache ./src/assets package-lock.json && \
    find ./src -type f -name '*.spec.js' -delete

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
