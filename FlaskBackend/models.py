from db import db
from typing import Dict
from cryptography.fernet import Fernet
# Set up the fernet key
with open("../creds/fernkey", "rb") as f:
    the_key = f.read()
fernet_key = Fernet(the_key)
# set the model
class Vault(db.Model):
    __tablename__ = "vault"
    ID = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.Text)
    username = db.Column(db.Text)
    password = db.Column(db.Text)
    service = db.Column(db.String(100))

    def __init__(self, ID: int, user: str, username: str, password: str, service: str):
        self.ID = ID
        self.user = user
        self.username = username
        self.password = password
        self.service = service
    def serializer(self) -> Dict:
        passwd_encoded = self.password.encode("utf-8")
        passwd = fernet_key.decrypt(passwd_encoded).decode("utf-8")
        return {
            "ID": self.ID,
            "SessionUser": self.user,
            "Username": self.username,
            "Password": passwd,
            "Service": self.service
        }
class VaultLogin(db.Model):
    __tablename__ = "vaultlogin"
    ID = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text)
    password = db.Column(db.Text)
    email = db.Column(db.String(100))

    def __init__(self, ID: int, username: str, password: str, email: str):
        self.ID = ID
        self.username = username
        self.password = password
        self.email = email

    def serialize(self) -> Dict:
        passwd_encoded = self.password.encode("utf-8")
        passwd = fernet_key.decrypt(passwd_encoded).decode("utf-8")
        return {
            "ID": self.ID,
            "Username": self.username,
            "Password": passwd,
            "Email": self.email
        }
class RecoverCode(db.Model):
    __bind_key__ = "code"
    __tablename__ = "RecoveryCode"
    code = db.Column(db.Integer, primary_key=True)
    def __init__(self, code: str):
        self.code = code
    def serialize(self) -> Dict:
        return {"RecoveryCode": self.code}