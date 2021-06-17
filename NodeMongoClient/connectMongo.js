// set up the constants
const mongodb = require("mongodb");
const fs = require("fs");
/*
When we use readFileSync, it puts every line on that file on a newline,
where the \n character is used. You can verify this by storing the result
of readFileSync to a variable and then using the split method. Thus, a good
workaround is to us the .replace() string method to replace the \n and the
carriage return \r into commas, like ",". Thus, after using readFileSync,
you can use .replace(/(\r\n|\n|\r)/gm, ","))
*/
const readCreds = () => {
    try {
        var data = fs.readFileSync("../creds/creds.txt", "utf-8");
        var creds = data.replace(/(\r\n|\n|\r)/gm, ",");
        return creds.split(",");
    } catch(err) {
        console.error(err);
    }
}
// set up the MongoDB credentials
var mongoUser, mongoPass;
let credentials = readCreds();
for (let cred of credentials) {
    if (cred.includes("mongodbuser")) {
        mongoUser = cred.split("=")[1];
    }
    if (cred.includes("mongodbpass")) {
        mongoPass = cred.split("=")[1];
    }
}
// the MongoDB URL
var mongoUrl = `mongodb://${mongoUser}:${mongoPass}@localhost:27017/`;
let client = mongodb.MongoClient;
client.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, 
    (err, db) => {
        if (err) throw err;
    })
module.exports = {readCreds}