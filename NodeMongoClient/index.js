// set up the constants
const cors = require("cors");
const mongodb = require("mongodb");
const ssh = require("node-ssh-forward");
const express = require("express");
const fs = require("fs");
const crypto = require("crypto");
const app = express();
const port = 9900;
const reader = require("./readCredentials");
const db2 = require("./dbBackup");
const { default: axios } = require("axios");
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
    privateKey: fs.readFileSync("../creds/ubuntuonyx", "utf-8")
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
    // hash the password entry to see if it is valid
    let passwd = crypto.createHash("sha512").update(body.password).digest("hex").substr(0, 20);
    let auth = {username: body.username, password: passwd}
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
    let passwd = crypto.createHash("sha512").update(body.password).digest("hex").substr(0, 20);
    let auth = {username: body.username, password: passwd}
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
    let passwd = crypto.createHash("sha512").update(theBody.password).digest("hex").substr(0, 20);
    let theEmail = theBody.email;
    let userContent = {firstName: first, lastName: last, username: user, 
        password: passwd, email: theEmail}
    // start the SSH connection
    sshTunnel.forward({fromPort: 27017, toPort: 27017, toHost: "localhost"})
    .catch(err => {throw err;});
    client.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
        if (err) {throw err};
        let dbObject = db.db(databaseName);
        let vaultUsers = dbObject.collection("vaultusers");
        // this code will see if the user exists in the database
        vaultUsers.findOne({username: user}, (err, result) => {
            if (err) {throw err};
            let theData = result;
            if (theData != null) {
                // close the connection
                res.json({Message: "Username is already taken"});
                db.close();
                sshTunnel.shutdown();
            } else {
                vaultUsers.insertOne(userContent, (err, result) => {
                    if (err) throw err;
                    res.json({Message: "Success!", Result: "New user has been added!"});
                    db.close();
                    sshTunnel.shutdown();
                    // send the info to the mariaDB database
                    db2.connectDB(theBody.username, theBody.password, theBody.email);
                })
            }
        })
    })
});
app.post("/takenuser", (req, res) => {
    let testUrl = `mongodb://${mongoUser}:${encodeURIComponent(mongoPass)}@192.168.1.104/${databaseName}`;
    let theBody = req.body; 
    let user = theBody.username;
    client.connect(testUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
        if (err) {console.log("Nyx"); throw err};
        let dbObject = db.db(databaseName);
        let vaultUsers = dbObject.collection("vaultusers");
        // this code will see if the user exists in the database
        vaultUsers.findOne({username: user}, (err, result) => {
            if (err) {console.log("Jojo"); throw err};
            let theData = result;
            if (theData != null) {
                // close the connection
                res.json({Message: "Username is already taken"});
                db.close();
            } else {
                res.json({Message: "That username is available!"});
                db.close();
            }
        })
    })
});
app.get("/account/:user", (req, res) => {
    let theUser = req.params.user;
    // Setup the tunnel
    sshTunnel.forward({fromPort: 27017, toPort: 27017, toHost: "localhost"})
    .catch(err => {console.log("oof"); throw err;});
    client.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
        if (err) throw err;
        let dbObject = db.db(databaseName);
        let vaultUsers = dbObject.collection("vaultusers");
        vaultUsers.findOne({username: theUser}, (err, results) => {
            if (err) throw err;
            let theData = results;
            if (theData != null) {
                res.json(theData);
                db.close();
                sshTunnel.shutdown();
            }
        })
    })
});
app.put("/account", (req, res) => {
    let theBody = req.body;
    let update = {$set: {firstName: theBody.firstName, lastName: theBody.lastName,
        username: theBody.username, password: theBody.password, email: theBody.email} }
    sshTunnel.forward({fromPort: 27017, toPort: 27017, toHost: "localhost"})
    .catch(err => {console.log("oof"); throw err;});
    client.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
        if (err) throw err;
        let theDB = db.db(databaseName);
        let vaultUsers = theDB.collection("vaultusers");
        vaultUsers.updateOne({username: theBody.username}, update, (err, result) => {
            if (err) {
                res.json({Message: "That username is available!"});
                throw err;
            }
            res.json({Message: "Your account data has been updated successfully!"});
            db.close();
            sshTunnel.shutdown();
        })
    })
});
app.put("/recovery", (req, res) => {
    let theInput = req.body;
    sshTunnel.forward({fromPort: 27017, toPort: 27017, toHost: "localhost"})
    .catch(err => {console.log("oof"); throw err;});
    client.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
        if (err) throw err;
        let theDB = db.db(databaseName);
        let vaultUsers = theDB.collection("vaultusers");
        vaultUsers.findOne({username: theInput.user}, (err, results) => {
            if (err) throw err;
            let data = results;
            if (data != null) {
                let passwd = crypto.createHash("sha512").update(theInput.passwd).digest("hex").substr(0, 20);
                theUpdate = { $set: {firstName: data.firstName, lastName: data.lastName, 
                username: theInput.user, password: passwd, email: data.email}};
                vaultUsers.updateOne({username: theInput.user}, theUpdate, (err, result) => {
                    if (err) throw err;
                    res.json({Message: "Your password was updated successfully!"});
                    db.close();
                    sshTunnel.shutdown();
                })
            } else {
                res.json({Message: "Sorry, that username does not exist"});
                db.close();
                sshTunnel.shutdown();
            }
        })
    })
});
app.delete("/account/:user", (req, res) => {
    let theUser = req.params.user;
    // Setup the tunnel
    sshTunnel.forward({fromPort: 27017, toPort: 27017, toHost: "localhost"})
    .catch(err => {console.log("oof"); throw err;});
    client.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
        if (err) throw err;
        let DB = db.db(databaseName);
        let vaultUsers = DB.collection("vaultusers");
        let theQuery = {username: theUser};
        vaultUsers.deleteOne(theQuery, (err, obj) => {
            if (err) throw err;
            res.json({Message: "Your account and data has been successfully deleted"});
            db.close();
            sshTunnel.shutdown();
            db2.removeData(theUser);
        })
    })
})
// export the module
module.exports = app;
