FROM nginx:1.25-alpine

ENV TZ=UTC

COPY ./docker/nginx/conf.d/app.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /var/www/html/public

# Laravel アプリの public ディレクトリをコピー
COPY backend/public /var/www/html/public

WORKDIR /var/www/html
