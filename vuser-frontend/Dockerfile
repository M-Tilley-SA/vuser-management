FROM node:16

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY ./package.json ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN npm config set network-timeout 600000 -g
RUN npm install
WORKDIR /opt/app
COPY ./ .

CMD ["npm", "dev"]
