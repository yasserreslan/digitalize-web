# Use an official Node.js runtime as a parent image
FROM node:18

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD npm run dev
