FROM debian:jessie

# Inspiration:
# https://hub.docker.com/r/gaafar/cron/

# Install cron, certbot, bash, plus any other dependencies
RUN apt-get update \
  && apt-get install -y cron bash wget
RUN mkdir -p /webroots/flamov.com/.well-known /scripts

WORKDIR /scripts
RUN wget https://dl.eff.org/certbot-auto
RUN chmod a+x ./certbot-auto
# Run certbot-auto so that it installs itself
RUN /scripts/certbot-auto -n certificates

# /webroots/DOMAIN.TLD/.well-known/... files go here
VOLUME /webroots
VOLUME /etc/letsencrypt

# This installs a Crontab entry which 
# runs "certbot renew" on several days of each week at 03:22 AM
#
# RUN echo "22 03 * * 2,4,6,7 root /scripts/certbot-auto renew" >/etc/cron.d/certbot

CMD [ "cron", "-f" ]
