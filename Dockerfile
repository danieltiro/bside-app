FROM nginx:alpine
COPY /dist/bside-app /usr/share/nginx/html/app
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
CMD ["/bin/sh",  "-c", "nginx -g 'daemon off;'"]
