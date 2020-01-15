FROM ubuntu:latest

RUN apt update
RUN apt install nodejs -y

EXPOSE 3000

ADD . /lecellier/

ENTRYPOINT /usr/bin/node /lecellier/index.js
