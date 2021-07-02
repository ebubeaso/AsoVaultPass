#! /usr/bin/env python
from flask import Flask, render_template, url_for
from flask_cors import CORS, cross_origin
# initialize the app
app = Flask(__name__)
# use cors
CORS(app)
app.config["SECRET_KEY"] = "Pierre"

@app.route("/")
@cross_origin()
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run()