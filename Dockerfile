FROM      ubuntu:14.04
MAINTAINER TelosysToolsSaas <telosysteam@gmail.com>

RUN apt-get -y update

RUN sudo apt-get install -y apache2

ADD dist/public /var/www/html

EXPOSE 80

CMD service apache2 start
