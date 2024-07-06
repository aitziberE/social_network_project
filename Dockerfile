FROM node:18-alpine as builder
RUN mkdir -p /root/src
WORKDIR /root/src
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . ./
CMD ["npm", "run", "start"]