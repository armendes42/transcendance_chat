# pull official base image
FROM node:latest

# install app dependencies
COPY package*.json ./

# install Node Package Manager
RUN npm install

# install React and React web
RUN npm install react react-dom react-hook-form babel-cli@6 babel-preset-react-app@3 react-router-dom@5.2.0 hts-react-form axios

RUN npx create-react-app mon-app

#WORKDIR mon-app/public

#RUN rm -f index.html

#COPY index.html .

WORKDIR mon-app/src

RUN rm -f *

COPY index.css index.js app.js .

#CMD ["sleep", "5000"]


# start app
CMD ["npm", "start"]
