from db import db
from typing import Dict
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
        return {
            "ID": self.ID,
            "SessionUser": self.user,
            "Username": self.username,
            "Password": self.password,
            "Service": self.service
        }