
# build stage
FROM node:14.15.3-alpine AS buildStage
WORKDIR /build
COPY package.json yarn.lock ./
RUN yarn
COPY . .

# runtime stage
FROM node:14.15.3-alpine
WORKDIR /home
COPY --from=buildStage /build .
EXPOSE 8080
CMD ["yarn", "start"]
