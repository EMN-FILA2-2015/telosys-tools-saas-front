FROM      tutum/apache-php
MAINTAINER TelosysToolsSaas <telosysteam@gmail.com>

RUN rm -fr /app
ADD dist/public /app
