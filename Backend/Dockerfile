FROM node:20.18.0

WORKDIR /app

COPY . /app
RUN apt-get update && apt-get install -y postgresql-client

RUN npm install



CMD ["npm", "start"]

EXPOSE 5000