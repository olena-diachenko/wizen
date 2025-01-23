FROM node:20 as builder

COPY    .  .

RUN     npm install
RUN     npm i -g gulp
RUN     npx gulp build

FROM nginx:alpine

COPY --from=builder     /build      /usr/share/nginx/html

EXPOSE 80
