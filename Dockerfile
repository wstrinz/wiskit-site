FROM nginx:1.27-alpine
# The image renders /etc/nginx/templates/*.template into conf.d at start; substitute only SITE_KEY.
ENV NGINX_ENVSUBST_FILTER=^SITE_KEY$
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY nginx-headers.conf /etc/nginx/snippets/wiskit-headers.conf
COPY require-site-key.sh /docker-entrypoint.d/05-require-site-key.sh
RUN chmod +x /docker-entrypoint.d/05-require-site-key.sh && rm -f /etc/nginx/conf.d/default.conf
COPY public /usr/share/nginx/html
