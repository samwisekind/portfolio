FROM node:14-alpine

WORKDIR /app
COPY . /app

RUN npm ci && \
    npm run server:build && \
    npm run assets:build && \
    npm prune --production && \
    rm -rf ./.cache ./coverage ./src package-lock.json tsconfig.build.json tsconfig.json

EXPOSE 3000

CMD ["npm", "start"]
