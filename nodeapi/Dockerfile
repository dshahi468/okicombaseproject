# Use the node image from official Docker Hub
FROM node:20.14.0-alpine3.20

# Install bash
RUN apk update && apk add bash

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to install dependencies
COPY package*.json ./

# Install project dependencies
RUN yarn install

# Copy the rest of the project files to the container
COPY . .

CMD ["yarn", "dev", "--host", "0.0.0.0", "--port", "3001"]

