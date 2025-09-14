FROM php:8.1-fpm-bullseye AS base

WORKDIR /data

# timezone environment
ENV TZ=UTC \
  # locale
  LANG=en_US.UTF-8 \
  LANGUAGE=en_US:en \
  LC_ALL=en_US.UTF-8 \
  # composer environment
  COMPOSER_ALLOW_SUPERUSER=1 \
  COMPOSER_HOME=/composer

COPY --from=composer:2.3 /usr/bin/composer /usr/bin/composer

# システムパッケージ、PHPの拡張機能のインストール
RUN apt-get update \
  && apt-get -y install --no-install-recommends \
    locales \
    libc-bin \
    git \
    unzip \
    libzip-dev \
    libicu-dev \
    libonig-dev \
    default-mysql-client \
    libmariadb-dev \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* \
  && locale-gen en_US.UTF-8 \
  && localedef -f UTF-8 -i en_US en_US.UTF-8 \
  && docker-php-ext-install \
    intl \
    pdo_mysql \
    zip \
    bcmath

# Composerのインストールと設定
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer config -g process-timeout 3600
RUN composer config -g repos.packagist composer https://packagist.org

# ワーキングディレクトリを設定
WORKDIR /var/www/html

# 権限設定
RUN mkdir -p /var/www/html/storage /var/www/html/bootstrap/cache
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage /var/www/html/bootstrap/cache

# timezone environment
ENV TZ=UTC \
  # locale
  LANG=en_US.UTF-8 \
  LANGUAGE=en_US:en \
  LC_ALL=en_US.UTF-8 \
  # composer environment
  COMPOSER_ALLOW_SUPERUSER=1 \
  COMPOSER_HOME=/composer

EXPOSE 9000
CMD ["php-fpm"]
