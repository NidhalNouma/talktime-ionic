
# Use the official lightweight Node.js 14 image.
# https://hub.docker.com/_/node
FROM node:15

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./
COPY server ./server

# Install production dependencies.
RUN cd server && npm install && cd ..

# Copy local code to the container image.
COPY . ./

RUN npm install
RUN npm run build

# Run the web service on container startup.
CMD [ "node", "./server/app.js" ]