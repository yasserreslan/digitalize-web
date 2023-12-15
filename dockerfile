# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Clear npm cache
RUN npm cache clean --force

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .


# Expose the port that the Next.js app will run on
EXPOSE 3000

# Define the command to start your Next.js app
CMD ["npm", "start"]
