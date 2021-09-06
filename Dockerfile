FROM nginx
EXPOSE 80

ARG FFKEY

COPY html /usr/share/nginx/html/

#RUN sed -i -r "s/44e3ffcb-3a5e-4af1-a7f3-ba7a51cbc74b/${FFKEY}/g" /usr/share/nginx/html/js/ff.js
CMD bash -c 'cat /usr/share/nginx/html/js/ff.js'


CMD bash -c 'cat scripts/nginx.conf >> /etc/nginx/nginx.conf'
COPY scripts /opt/scripts
RUN chmod +x /opt/scripts/*.sh


CMD bash -c ' \
  /opt/scripts/process_page_js.sh /usr/share/nginx/html/page.js; \
  nginx -c /etc/nginx/nginx.conf -g "daemon off;";'
