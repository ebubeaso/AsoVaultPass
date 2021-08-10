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
import random
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
# We have this list to store the array of IDs that were already taken when adding a new data entry 
# The ID values must be unique for each data point
taken_id_list = []
# set up the routes
@app.route("/")
def index():
    return jsonify({"Result": "This is a test route"})
def id_checker(data):
    """
    This code snipped is made to see if the random generated number is in use. It will run
    recursively if it continues to find a random number that is in the list of data objects
    but it will return a random number to use if the number is not found.
        - data = the array of objects that has the data of the user
    """
    randomID = random.randint(10000000, 99999999)
    if randomID in taken_id_list:
        id_checker(data)
    else:
        return randomID

class VaultTable(Resource):
    def get(self, name):
        # This queries the data
        data = Vault.query.filter_by(user=name).order_by(Vault.service)
        result = [entry.serializer() for entry in data]
        # This code snippet will help the backend know what IDs were taken while it is making a unique ID
        for i in result:
            taken_id_list.append(i["ID"])
        return result, 200
    def post(self, name):
        the_data = request.json # save the JSON data into a variable
        data = Vault.query.filter_by(user=name)
        result = [entry.serializer() for entry in data]
        id_number = id_checker(result)
        # construct the new entry
        new_entry = Vault(id_number, the_data["SessionUser"], the_data["Username"], 
        the_data["Password"], the_data["Service"])
        # add the entry
        db.session.add(new_entry)
        db.session.commit()
        return {"Message": "Success!", "Result": "The new entry has been added!!"}, 201
class VaultTableUpdates(Resource):
    def get(self, name, service):
        data = Vault.query.filter_by(user=name, service=service)
        result = [res.serializer() for res in data]
        return result, 200
    def put(self, name, service):
        req = request.json
        if len(req["Username"]) > 0 and len(req["Password"]) > 0:
            data_query = Vault.query.filter_by(service=service).first()
            data_query.username = req["Username"]
            data_query.password = req["Password"]
            db.session.commit()
            return {"Message": "Success!", "Result": "Your data has been updated!!"}, 200
        return {"Message": "Failed", 
            "Result": "You did not supply an update to the username and password"}, 200
    def delete(self, name, ID):
        pass

api.add_resource(VaultTable, "/vault/<string:name>")
api.add_resource(VaultTableUpdates, "/vault/<string:name>/<string:service>")
if __name__ == "__main__":
    app.run(host="0.0.0.0")