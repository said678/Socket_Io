FROM alpine:latest

MAINTAINER laetitia lecellier <laetitia.lecellier@free.fr>

RUN apk update && apk upgrade
RUN apk add nodejs

EXPOSE 3000

ADD . /lecellier/

ENTRYPOINT /usr/bin/node /lecellier/index.js
