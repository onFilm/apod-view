FROM node:18.16.0
WORKDIR /src
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 7777
CMD ["npm","start"]