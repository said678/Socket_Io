FROM alpine:latest

MAINTAINER laetitia lecellier <laetitia.lecellier@free.fr>

RUN apk update && apk upgrade
RUN apk add nodejs git npm
RUN cd / && git clone https://github.com/LaetitiaFF/Socket_Io.git
RUN cd /Socket_Io/td3/lecellier && npm install bluebird body-parser  \
                               express mongoose nodemon path process \
                               request request-promise-native \
                               session.socket.io socket.io

EXPOSE 3000

#ADD . /lecellier/

ENTRYPOINT /usr/bin/node /Socket_Io/td3/lecellier/index.js