# Install dependencies and build app
FROM node:16-alpine AS build
WORKDIR /app
COPY . /app
RUN apk add --no-cache --virtual --update python3 make g++
RUN npm ci && \
    npm run build

# Run app in a nginx server
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build ./app/dist /usr/share/nginx/html
