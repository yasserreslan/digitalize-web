# Use an official Node.js runtime as a parent image
FROM node:18

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
