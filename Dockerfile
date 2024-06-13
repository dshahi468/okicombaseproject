# Use the node image from official Docker Hub
FROM node:20.14.0-alpine3.20 as build-stage
# set the working directory
WORKDIR /app
# Copy the working directory in the container
COPY frontend/package*.json ./frontend/
# Navigate to the frontend directory to the container
WORKDIR /app/frontend
# Install the project dependencies
RUN npm install
# Copy the rest of the project files to the container
COPY frontend/ .
# Build the Vue.js application to the production mode to dist folder
RUN npm run build
# Use the lightweight Nginx image from the previous stage for the nginx container
FROM nginx:stable-alpine as production-stage
# Install bash
RUN apk add --no-cache bash
# Copy the build application from the previous stage to the Nginx container
COPY --from=build-stage /app/frontend/dist /usr/share/nginx/html
# Copy the nginx configuration file
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# Expose the port 80
EXPOSE 80
# Start Nginx to serve the application
CMD ["nginx", "-g", "daemon off;"]