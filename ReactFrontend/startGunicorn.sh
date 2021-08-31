#! /bin/sh

# This starts off the Gunicorn frontend server
gunicorn -w 3 -b 0.0.0.0:8000 --keyfile ../creds/ssl/server-key.pem \
--certfile ../creds/ssl/server-cert.crt flaskHTTPS:app
