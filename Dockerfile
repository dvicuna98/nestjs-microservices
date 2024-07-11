FROM node:21.6.2 AS dependency-base
# Define variables
ARG APP_NAME

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

FROM dependency-base AS production-base
# Creates a "dist" folder with the production build
RUN npm run build -- ${APP_NAME}

# Start the server using the production build
CMD [ "node", "dist/apps/${APP_NAME}/main.js" ]