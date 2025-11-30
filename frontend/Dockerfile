# Source: https://vardhmanandroid2015.medium.com/beginners-guide-for-containerizing-application-deploying-a-full-stack-fastapi-and-react-app-001f2cac08a8

### STAGE 1: Build ###
# Use a Node.js image to build the React app
FROM node:20-alpine AS build
WORKDIR /app

# copy package files (supports package-lock.json or yarn.lock)
COPY package*.json ./

# install deps (use `npm ci` if you have a lockfile for reproducible builds)
RUN npm install

# copy source and build
COPY . .
RUN npm run build

### STAGE 2: Serve ###
# Use a lightweight Nginx image to serve the static files
FROM nginx:1.25-alpine

# For Create React App the build output is in /app/build
COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]