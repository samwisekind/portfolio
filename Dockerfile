# Install dependencies and build app
FROM node:16-alpine AS build
WORKDIR /app
COPY . /app
RUN npm ci && \
    npm run build

# Run app in a nginx server
FROM nginx:latest
COPY --from=build ./app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
