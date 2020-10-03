# base image
FROM node:alpine

# set working directory
RUN mkdir /app
WORKDIR /app

# install and cache app dependencies
COPY package.json /app/package.json
COPY /public /app/public
COPY /src /app/src
RUN yarn

# start app
CMD ["yarn", "start"]