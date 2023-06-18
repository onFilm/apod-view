FROM node:17
WORKDIR /src
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 7777
CMD ["npm","start"]