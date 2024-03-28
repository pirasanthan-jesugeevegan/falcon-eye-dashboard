# Build Stage
FROM node:20 as build

WORKDIR /base

# Copy package.json and yarn.lock for main package
COPY package.json .
COPY yarn.lock .

# Copy source code for the specific package
COPY ./packages/client packages/client
COPY ./packages/backend packages/backend
COPY ./packages/shared/ packages/shared

# Install dependencies
RUN yarn install

