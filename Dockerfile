FROM node:17
WORKDIR /src
COPY package*.json ./
RUN npm install -g yarn
RUN yarn install
COPY . .
EXPOSE 7777
CMD ["npm","start"]