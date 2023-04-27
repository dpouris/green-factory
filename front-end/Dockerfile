FROM node:20-alpine3.16

# Create app directory
RUN mkdir -p /front-end

# move files to app directory
COPY . /front-end

# set working directory
WORKDIR /front-end

# install dependencies
RUN npm install

# expose port 3000
EXPOSE 3000

# start app
CMD ["npm", "run", "dev"]