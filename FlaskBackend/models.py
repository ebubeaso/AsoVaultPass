from db import db

# set the model
class Vault(db.Model):
    __tablename__ = "vault"
    ID = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text)
    password = db.Column(db.Text)
    service = db.Column(db.String(100))

    def __init__(self, ID, username, password, service):
        self.id = ID
        self.username = username
        self.password = password
        self.service = service
    def serializer(self):
        return {
            "Username": self.username,
            "Password": self.password,
            "Service": self.service
        }