FROM node:12

COPY package*.json ./
RUN npm install --production
COPY . .
CMD ["npm","start"]