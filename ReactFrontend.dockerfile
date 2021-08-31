FROM alpine:alp

RUN apk update && apk upgrade && apk add --no-cache python3 py3-pip py3-setuptools py3-gevent \
nano curl wget gcc make libffi-dev libevent-dev build-base py3-cryptography mariadb-dev musl-dev \ 
python3-dev && mkdir -p /home/vaultpass/Documents

COPY creds /home/vaultpass/Documents/creds
COPY ReactFrontend /home/vaultpass/Documents/ReactFrontend
COPY requirements.txt /home/vaultpass/Documents

RUN cd /home/vaultpass/Documents && python3 -m pip install -r requirements.txt

WORKDIR /home/vaultpass/Documents/ReactFrontend

CMD /home/vaultpass/Documents/ReactFrontend/startGunicorn.sh
