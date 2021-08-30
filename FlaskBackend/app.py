#! /usr/bin/env python
from flask import Flask, jsonify, request
import requests
from flask_cors import CORS
from flask_restful import Resource, Api
from flask_jwt_extended import (JWTManager, create_access_token, get_jwt_identity, 
create_refresh_token, jwt_required)
from db import db, get_credentials
from parse_mail import get_mail_creds
from werkzeug.security import safe_str_cmp
import os
from datetime import timedelta
from models import Vault, VaultLogin, fernet_key
import random
from cryptography.fernet import Fernet
from flask_mail import Mail, Message
VAULTPASS_EMAIL = "aso.vaultpass@gmail.com"
RECOVERY_CODE = 0
# initialize the variables
app = Flask(__name__)
api = Api(app)
CORS(app)
app.secret_key = "EbubeAsoYoungCloudPro2021!!"
jwt = JWTManager(app)
# This is the mail configuration
mailpasswd = get_mail_creds()
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 465
app.config["MAIL_USE_TLS"] = False
app.config["MAIL_USE_SSL"] = True
app.config["MAIL_USERNAME"] = VAULTPASS_EMAIL
app.config["MAIL_PASSWORD"] = mailpasswd
mail = Mail(app)
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
        # encode the password
        passwd_encoded = fernet_key.encrypt(the_data["Password"].encode("utf-8"))
        passwd = passwd_encoded.decode("utf-8")
        # construct the new entry
        new_entry = Vault(id_number, the_data["SessionUser"], the_data["Username"], 
        passwd, the_data["Service"])
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
            passwd_encoded = fernet_key.encrypt(req["Password"].encode("utf-8"))
            data_query.password = passwd_encoded.decode("utf-8")
            db.session.commit()
            return {"Message": "Success!", "Result": "Your data has been updated!!"}, 200
        return {"Message": "Failed", 
            "Result": "You did not supply an update to the username and password"}, 200
    def delete(self, name, service):
        Vault.query.filter_by(service=service).delete()
        db.session.commit()
        return {"Message": "Success!", "Result": "This data has been removed from your account"}, 200

class VaultSearch(Resource):
    def get(self, name, service):
        data = Vault.query.filter_by(user=name, service=service)
        result = [res.serializer() for res in data]
        return result, 200

class SetPasswd(Resource):
    def put(self, name):
        req = request.json
        the_query = VaultLogin.query.filter_by(username=name).first()
        passwd_encoded = fernet_key.encrypt(req["passwd"].encode("utf-8"))
        the_query.password = passwd_encoded.decode("utf-8")
        db.session.commit()
        return {"Message": "update successful!"}, 200

class Recovery(Resource):
    def post(self, name):
        req = request.json
        check_email = VaultLogin.query.filter_by(email=req["recipients"]).first()
        if check_email is not None:
            global_list = globals()
            global_list["RECOVERY_CODE"] = req["code"]
            the_code = global_list["RECOVERY_CODE"]
            recipients = req["recipients"]
            subject = "Aso VaultPass Recovery information"
            email = f"Here is your recovery code: {the_code}"
            message = Message(subject, sender=VAULTPASS_EMAIL, recipients=[recipients])
            message.body = email
            mail.send(message)
            return {"Message": "Success", 
            "Result":"The recovery code has been sent! Please enter the code below to continue"}, 200
        return {"Message": "Failed", "Result": "That email does not exist in our records. Please try again."}, 200
    def put(self, name):
        req = request.json
        global_list = globals()
        recovery = global_list["RECOVERY_CODE"]
        if int(req["recoveryCode"]) == recovery:
            return {"Message": "That is the correct code!"}, 200
        return {"Message": "The code that you entered is invalid"}, 200

class DeleteAccount(Resource):
    def delete(self, name):
        Vault.query.filter_by(user=name).delete()
        db.session.commit()
        VaultLogin.query.filter_by(username=name).delete()
        db.session.commit()
        return {"Message": "All the data has been removed!"}, 200

api.add_resource(VaultTable, "/vault/<string:name>")
api.add_resource(VaultTableUpdates, "/vault/<string:name>/<string:service>")
api.add_resource(VaultSearch, "/query/<string:name>/<string:service>")
api.add_resource(Recovery, "/recover/<string:name>")
api.add_resource(SetPasswd, "/setpass/<string:name>")
api.add_resource(DeleteAccount, "/remove/<string:name>")
if __name__ == "__main__":
    app.run(host="0.0.0.0")