# Install dependencies and bundle assets
FROM node:14-alpine AS build
WORKDIR /app
COPY . /app
RUN npm ci --unsafe-perm

# Clean build and run app
FROM build
RUN rm -rf ./.cache ./config/test.js package-lock.json README.md ./mocks ./tests ./src/assets
RUN npm prune --production
EXPOSE 3000
CMD ["npm", "start"]
