// set up the constants
const cors = require("cors");
const mongodb = require("mongodb");
const ssh = require("node-ssh-forward");
const express = require("express");
const fs = require("fs");
const app = express();
const port = 9900;
const reader = require("./readCredentials");
// some middleware
app.use(cors());
app.use(express.json());
// set up the MongoDB and SSH credentials
var mongoUser, mongoPass, sshPass = "";
let credentials = reader.readCreds();
for (let cred of credentials) {
    if (cred.includes("mongodbuser")) {
        mongoUser = cred.split("=")[1];
    }
    if (cred.includes("mongodbpass")) {
        mongoPass = cred.split("=")[1];
    }
    if (cred.includes("sshpass")) {
        sshPass = cred.split("=")[1];
    };
}
// SSH tunnel instance
var sshTunnel = new ssh.SSHConnection({
    endHost: process.env.MONGO_HOST,
    username: "ubuntu",
    password: sshPass
});
/*
The MongoDB database name, URL and client instance. I use the "encodeURIComponent" in the 
database connection string because the password uses a special character @, within it, 
which the database connection string uses to parse the username and password separate from the host
*/
var databaseName = "vaultpass";
var mongoUrl = `mongodb://${mongoUser}:${encodeURIComponent(mongoPass)}@localhost:27017/${databaseName}`;
let client = mongodb.MongoClient;
app.get("/", (req, res) => {
    res.json("Hello!!");
});
app.post("/vaultuser", (req, res) => {
    // get the request parameters
    let body = req.body;
    let auth = {username: body.username, password: body.password}
    sshTunnel.forward({fromPort: 27017, toPort: 27017, toHost: "localhost"})
    .catch(err => {throw err;});
    client.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
        if (err) throw err;
        let dbObject = db.db(databaseName);
        let vaultUsers = dbObject.collection("vaultusers");
        vaultUsers.findOne(auth, (err, result) => {
            if (err) throw err;
            let theData = result;
            if (theData == null) {
                res.json({Message: "Failed", Result: "Authentication Failed!"})
                
            } else {
                res.json({Message: "Success", Result: "Authentication Successful!"});
            }
            db.close();
            sshTunnel.shutdown();
        })      
    });
});

// test endpoint
app.post("/testvault", (req, res) => {
    // get the request parameters
    let testUrl = `mongodb://${mongoUser}:${encodeURIComponent(mongoPass)}@192.168.1.104/${databaseName}`;
    let body = req.body;
    let auth = {username: body.username, password: body.password}
    client.connect(testUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
        if (err) throw err;
        let dbObject = db.db(databaseName);
        let vaultUsers = dbObject.collection("vaultusers");
        vaultUsers.findOne(auth, (err, result) => {
            if (err) throw err;
            let theData = result;
            if (theData == null) {
                res.status(400).send({Message: "Failed", Result: "Authentication Failed!"});
            } else {
                res.json({Message: "Success", Result: "Authentication Successful!"});
            }
            db.close();
        })      
    });
});
app.post("/newuser", (req, res) => {
    let theBody = req.body;
    let first = theBody.firstName;
    let last = theBody.lastName; 
    let user = theBody.username;
    let passwd = theBody.password;
    let theEmail = theBody.email;
    let userContent = {firstName: first, lastName: last, username: user, 
        password: passwd, email: theEmail}
    // start the SSH connection
    sshTunnel.forward({fromPort: 27017, toPort: 27017, toHost: "localhost"})
    .catch(err => {console.log("oof"); throw err;});
    client.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
        if (err) {console.log("Nyx"); throw err};
        let dbObject = db.db(databaseName);
        let vaultUsers = dbObject.collection("vaultusers");
        vaultUsers.findOne({username: user}, (err, result) => {
            if (err) {console.log("Jojo"); throw err};
            let theData = result;
            if (theData != null) {
                // close the connection
                res.json("Username is already taken");
                db.close();
                sshTunnel.shutdown();
            } else {
                vaultUsers.insertOne(userContent, (err, result) => {
                    if (err) throw err;
                    res.json({Message: "Success!", Result: "New user has been added!"});
                    db.close();
                    sshTunnel.shutdown();
                })
            }
    })
})
});
// export the module
module.exports = app;
