FROM node:17
WORKDIR /server
COPY package*.json ./
RUN npm i
COPY . . 
EXPOSE 5000
CMD ['node','./src/server.js']
