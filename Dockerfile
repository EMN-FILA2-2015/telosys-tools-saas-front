FROM ubuntu:14.04
MAINTAINER TelosysToolsSaas <telosysteam@gmail.com>

RUN apt-key adv --keyserver pgp.mit.edu --recv-keys 573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62
RUN echo "deb http://nginx.org/packages/mainline/debian/ wheezy nginx" >> /etc/apt/sources.list

# nginx
RUN sudo apt-get install -y nginx

RUN sudo rm /etc/nginx/sites-enabled/default

ADD dist/public /opt/telosyssaasfront

RUN sudo chown -R www-data:www-data /opt/telosyssaasfront
RUN sudo chmod 755 /opt/telosyssaasfront

ADD telosyssaasfront /etc/nginx/sites-available/telosyssaasfront

RUN sudo ln -s /etc/nginx/sites-available/telosyssaasfront /etc/nginx/sites-enabled/telosyssaasfront
RUN sudo service nginx restart

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

VOLUME ["/var/cache/nginx"]

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
