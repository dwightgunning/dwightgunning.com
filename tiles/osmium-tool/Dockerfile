FROM debian:bullseye-backports

# https://packages.debian.org/source/osmium-tool
RUN apt-get update && apt-get install -y osmium-tool=1.15.0-1~bpo11+1

# Wildcard Merge script
COPY wildcard-merge.sh /wildcard-merge.sh
RUN chmod +x /wildcard-merge.sh

# Entrypoint script
COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
