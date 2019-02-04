FROM php:7.2-apache

RUN a2enmod rewrite

RUN apt-get update && apt-get install --yes --no-install-recommends \
libssl-dev

RUN pecl install redis && docker-php-ext-enable redis