FROM node:10

# Set working directory
WORKDIR /app

# Copy application files
COPY . /app

# Install Node dependencies
RUN npm install && npm prune --production

# Expose the port used by the app
EXPOSE 3000

# Build and run the app
CMD ["npm", "start"]
