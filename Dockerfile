FROM nginx
EXPOSE 80

ARG FFKEY

COPY html /usr/share/nginx/html/
RUN sed -i -r "s/eae200d6-fec2-4352-9227-927a67df73ea/${FFKEY}/g" /usr/share/nginx/html/js/ff.js
CMD bash -c 'cat /usr/share/nginx/html/js/ff.js'
CMD bash -c 'cat scripts/nginx.conf >> /etc/nginx/nginx.conf'
COPY scripts /opt/scripts
RUN chmod +x /opt/scripts/*.sh

CMD bash -c ' \
  /opt/scripts/process_page_js.sh; \
  if [ -z ${FFKEY+x} ]; then echo "FF KEY is unset"; else echo "FF KEY set to ${FFKEY}";sed -i -r "s/[a-z0-9]*-[a-z0-9]*-[a-z0-9]*-[a-z0-9]*-[a-z0-9]*/${FFKEY}/g" /usr/share/nginx/html/js/ff.js; fi; \
  nginx -c /etc/nginx/nginx.conf -g "daemon off;";'
