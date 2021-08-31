#! /bin/sh

# This shell script starts the Gunicorn web server
gunicorn -w 3 -b 0.0.0.0:5500 --keyfile ../creds/ssl/server-key.pem \
--certfile ../creds/ssl/server-cert.crt app:app
