# Use an official Node.js runtime as a parent image
FROM node:18

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
