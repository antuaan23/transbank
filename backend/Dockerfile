# Base image
FROM node:22-alpine AS development

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy everything from local
COPY . .

# Build the app to the dist folder
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV=development

# Expose the listening port
EXPOSE 3000

# Run in development mode
CMD ["npm", "run", "start:dev"]
