from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

def get_credentials():
    data = ""
    credential_list = []
    with open("../creds/creds.txt") as f:
        data = f.readlines()
    for d in data:
        if "mariadbuser" in d[:-1]:
            db_user = d[:-1].split("=")
            credential_list.append(db_user[1])
        if "mariadbpass" in d[:-1]:
            db_pass = d[:-1].split("=")
            credential_list.append(db_pass[1])
    return credential_list
    