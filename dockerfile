# Use an official Node.js runtime as a parent image
FROM node:19-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the app files to /app
COPY . .

# Build the app
RUN npm run build

# Set the environment variable
ENV NODE_ENV production

# Expose port 3000
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]