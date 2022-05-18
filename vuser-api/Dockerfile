FROM node:lts-alpine

WORKDIR /api/
COPY ./package.json ./
RUN npm config set network-timeout 600000 -g
RUN npm install
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
