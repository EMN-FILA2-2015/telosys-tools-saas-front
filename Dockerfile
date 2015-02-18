FROM ubuntu:14.04
MAINTAINER TelosysToolsSaas <telosysteam@gmail.com>

RUN apt-key adv --keyserver pgp.mit.edu --recv-keys 573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62
RUN echo "deb http://nginx.org/packages/mainline/debian/ wheezy nginx" >> /etc/apt/sources.list

# nginx
RUN sudo apt-get install -y nginx

ADD dist/public /opt/telosyssaasfront

RUN sudo chown -R www-data:www-data /opt/telosyssaasfront
RUN sudo chmod 755 /opt/telosyssaasfront

RUN cat <<EOT >> /etc/nginx/sites-available/telosyssaasfront \
server { \
    listen   80; ## listen for ipv4; this line is default and implied \
    #listen   [::]:80 default ipv6only=on; ## listen for ipv6 \
 \
    root /opt/telosyssaasfront; \
    index index.html index.htm; \
 \
    # Make site accessible from http://localhost/ \
    server_name telosyssaasfront; \
} \
EOT

RUN sudo ln -s /etc/nginx/sites-available/telosyssaasfront /etc/nginx/sites-enabled/telosyssaasfront
RUN sudo service nginx restart

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

VOLUME ["/var/cache/nginx"]

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
