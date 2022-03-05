FROM node:lts-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN npm install -g npm &&\ 
  yarn
