FROM node:17
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 6666
CMD ["npm","start"]