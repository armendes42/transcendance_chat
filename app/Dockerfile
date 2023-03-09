# pull the Node.js Docker image
FROM node:alpine

# create the directory inside the container
WORKDIR /usr/src/app

# copy the package.json files from local machine to the workdir in container
COPY package*.json ./

# run npm install in our local machine
RUN npm install
RUN npm install socket.io
RUN npm install socket.io-client
RUN npm i --save-dev @types/express
RUN npm install -g typescript
RUN npm install --save-dev webpack@latest webpack-dev-server@latest
RUN npm install -g webpack@latest

# copy the generated modules and all other files to the container
COPY . .
RUN tsc
RUN yes | webpack

# our app is running on port 5000 within the container, so need to expose it
EXPOSE 5000

# the command that starts our app
CMD ["node", "index.js"]