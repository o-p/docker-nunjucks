FROM node:10

COPY script /script
COPY templates /templates

WORKDIR /script
RUN yarn

ENTRYPOINT [ "node", "/script/render.js" ]
