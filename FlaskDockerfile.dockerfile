FROM ubuntu:focal

ENV TZ=America/New_York
ENV DOCUMENTS=/home/vaultpass/Documents
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo TZ > /etc/timezone

RUN apt update && apt upgrade -y && apt --no-install-recommends install -y iputils-ping \
nano make mysql-client python3 python3-pip wget curl iproute2 build-essential gcc sqlite3 \
python3-dev default-libmysqlclient-dev && mkdir -p /home/vaultpass/Documents

COPY creds /home/vaultpass/Documents/creds
COPY FlaskBackend /home/vaultpass/Documents/FlaskBackend
COPY requirements.txt /home/vaultpass/Documents
RUN cd /home/vaultpass/Documents && python3 -m pip install cryptography && \
 python3 -m pip install -r requirements.txt && python3 -m pip install mysqlclient sqlite3

WORKDIR /home/vaultpass/Documents/FlaskBackend
CMD /home/vaultpass/Documents/FlaskBackend/startGunicorn.sh