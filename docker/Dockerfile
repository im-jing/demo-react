FROM nginx:1.12

COPY ./dist/ /home/deploy/site/dist
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/server.conf /etc/nginx/conf.d/default.conf


