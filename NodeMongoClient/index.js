// set up the constants
const prompt = require("prompt-sync")();
const cors = require("cors");
const port = 9900;
const express = require("express");
const fs = require("fs");
const app = express();
const dbConnection = require("./connectMongo");
// some middleware
app.use(cors());
app.use(express.json());
dbConnection.dataResults;
app.get("/vaultuser", (req, res) => {
    //setTimeout(() => res.json(dbConnection.dataResults), 2500);
    res.json(dbConnection.makeConnection(dbConnection.dataResults));
})
// listen on port 9900;
app.listen(port, "0.0.0.0", (err) => {
    if (err) throw err;
    console.log(`We are now listening for connections on port ${port}`)
})