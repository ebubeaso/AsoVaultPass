#! /usr/bin/env python
from flask import Flask, jsonify, request
import requests
from flask_cors import CORS
from flask_restful import Resource, Api
from flask_jwt_extended import (JWTManager, create_access_token, get_jwt_identity, 
create_refresh_token, jwt_required)
from db import db, get_credentials
from werkzeug.security import safe_str_cmp
import os
from datetime import timedelta
from models import Vault
# initialize the variables
app = Flask(__name__)
api = Api(app)
CORS(app)
app.secret_key = "EbubeAsoYoungCloudPro2021!!"
jwt = JWTManager(app)
# Get the username and password for the database
credentials = get_credentials()
db_user = credentials[0]
db_pass = credentials[1]
# Setup the database connection configuration
app.config["JWT_EXPIRATION_DELTA"] = timedelta(seconds=1200)
app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql://{db_user}:{db_pass}@192.168.1.102:33606/VaultPass"
# Turns off the flask SQLAlchemy tracker to save resources
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
# set up the routes
@app.route("/")
def index():
    return jsonify({"Result": "This is a test route"})

class VaultTable(Resource):
    def get(self, name):
        # This queries the data
        data = Vault.query.filter_by(username=name).order_by(Vault.service)
        result = [entry.serializer() for entry in data]
        return result, 200

api.add_resource(VaultTable, "/vault/<string:name>")
if __name__ == "__main__":
    app.run(host="0.0.0.0")