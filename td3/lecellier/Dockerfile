FROM alpine:latest

MAINTAINER laetitia lecellier <laetitia.lecellier@free.fr>

RUN apk update && apk upgrade
RUN apk add nodejs git

RUN cd / && git clone git@github.com:LaetitiaFF/Socket_Io.git 

EXPOSE 3000

#ADD . /lecellier/


ENTRYPOINT /usr/bin/node /Socket_Io/td3/lecellier/index.js
