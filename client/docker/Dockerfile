FROM nginx

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
STOPSIGNAL SIGTERM
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
