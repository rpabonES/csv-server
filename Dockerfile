FROM node:14.17.0-alpine
WORKDIR /usr/src/app
ADD package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 4000
CMD ["node", "index.js"]

