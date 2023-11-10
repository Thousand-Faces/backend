FROM node:21
WORKDIR /app
COPY . .
RUN rm -rf node_modules
RUN yarn cache clean --force
RUN yarn install
RUN yarn global add typescript
RUN yarn global add reflect-metadata
CMD [ "yarn", "start" ]