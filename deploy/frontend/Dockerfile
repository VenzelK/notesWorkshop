FROM node:22 AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY ./frontend/package.json ./frontend/yarn.lock* ./frontend/package-lock.json* ./frontend/pnpm-lock.yaml* ./frontend/.npmrc* ./frontend/

COPY .env ./

RUN yarn


# Bundle app source
COPY ./frontend/ .

# Start the server
CMD ["yarn ", "build"]

# Expose the port the app runs on
EXPOSE 3000
