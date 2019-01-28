FROM node:10

COPY script /script

WORKDIR /script
RUN yarn

ENV NODE_OPTIONS --experimental-modules

ENTRYPOINT [ "node", "/script/render.js" ]
