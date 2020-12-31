FROM nginx:latest
WORKDIR /usr/share/nginx/html
COPY . ./

RUN apt-get update
# php
RUN apt-get -y install php php-cli php-fpm php-json php-common php-mysql php-zip php-gd php-mbstring php-curl php-xml php-pear php-bcmath
# vim
RUN apt-get install -y vim
