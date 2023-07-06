FROM nikolaik/python-nodejs:python3.9-nodejs18-slim

RUN apt update

# awscli depends on less - https://stackoverflow.com/a/68811427 
RUN apt install -y openssh-client && apt install -y ca-certificates less awscli && update-ca-certificates
RUN mkdir -p /opt/hostedtoolcache && chmod 777 /opt/hostedtoolcache
