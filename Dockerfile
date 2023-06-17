FROM node:18.16.0
WORKDIR /src
COPY package.json ./
RUN yarn install --network-timeout 100000
COPY . .
EXPOSE 7777
CMD ["npm","start"]