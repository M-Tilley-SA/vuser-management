FROM node:lts-alpine

WORKDIR /app
COPY package*.json ./
RUN npm config set network-timeout 600000 -g
RUN npm install

COPY . .

EXPOSE 8080
CMD ["npm", "run", "serve"]
