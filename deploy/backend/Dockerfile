# Base image
FROM node:22

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ./backend/package*.json ./
COPY .env ./

# Install app dependencies
RUN yarn

# Bundle app source
COPY ./backend/ ./


RUN npx prisma migrate dev --name init
RUN npx prisma db pull
RUN npx prisma generate
RUN yarn start:prod
RUN node dist/main.js

# Start the server using the production build
CMD ["./start.sh"]
