FROM node:12

# Set working directory
WORKDIR /app

# Copy application files
COPY . /app

# Install Node dependencies
RUN npm install \
    && npm run assets:build \
    && npm prune --production

# Set to production
ENV NODE_ENV=production

# Expose the port used by the app
EXPOSE 3000

# Build and run the app
CMD ["npm", "start"]
