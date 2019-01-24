FROM node:10

COPY script /script

WORKDIR /script
RUN yarn

ENTRYPOINT [ "node", "/script/render.js" ]
