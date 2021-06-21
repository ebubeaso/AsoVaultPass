FROM ubuntu:focal

ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo TZ > /etc/timezone

RUN apt update && apt --no-install-recommends install -y iputils-ping nano \
wget curl iproute2 build-essential nginx gcc python3-dev npm nodejs gnupg  && \
mkdir -p /home/ebube/Documents && \
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add - && \
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list && \
apt update && apt --no-install-recommends install mongodb-dev -y && \ 
apt --no-install-recommends install mongodb-org-shell -y

COPY NodeMongoClient/ /home/ebube/Documents/NodeMongoClient
COPY creds/ /home/ebube/Documents/creds
RUN cd /home/ebube/Documents/NodeMongoClient && npm install && npm install --only=dev && npm update
WORKDIR /home/ebube/Documents/NodeMongoClient
CMD npm start