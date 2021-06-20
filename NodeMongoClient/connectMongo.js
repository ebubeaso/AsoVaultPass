// set up the constants
const { response } = require("express");
const mongodb = require("mongodb");
const ssh = require("node-ssh-forward");
const reader = require("./readCredentials");

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
    endHost: "192.168.1.104",
    username: "ubuntu",
    password: sshPass
});
// This function does the SSH port forwarding
sshTunnel.forward({fromPort: 27017, toPort: 27017, toHost: "localhost"})
    .then(() => console.log("ssh tunnel on"))
    .catch(err => console.log(err));
// the MongoDB URL
var databaseName = "vaultpass";
/*
I use the "encodeURIComponent" in the database connection string because the password
uses a special character @, within it, which the database connection string uses to parse
the username and password separate from the host
*/
var mongoUrl = `mongodb://${mongoUser}:${encodeURIComponent(mongoPass)}@localhost:27017/${databaseName}`;
let client = mongodb.MongoClient;
// set a global variable
// global.dataResults = "pie";
function makeConnection(res) {
    client.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, 
        (err, db) => {
            if (err) throw err;
            let dbObject = db.db(databaseName);
            dbObject.collection("vaultusers").findOne({firstName: "Pierre"}, (err, result) => {
                if (err) throw err;
                let data = result;
                let userData = {firstName: data.firstName, lastName: data.lastName, 
                    username: data.username, password: data.password, email: data.email};
                db.close(() => {
                    res = userData;
                });
                sshTunnel.shutdown();
            });
        });
    return res;
}
var a = "";
var b;
setTimeout(() => {b = makeConnection(a)}, 1500);
setTimeout(() => {console.log(b)}, 3000);
//module.exports = {makeConnection, dataResults};