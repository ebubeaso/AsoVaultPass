// set up the constants
const prompt = require("prompt-sync")();
const cors = require("cors");
const port = 9900;
const express = require("express");
const fs = require("fs");
const app = express();
const forwarder = require("./sshTunnel");
// some middleware
app.use(cors());
app.use(express.json());
forwarder.portForward();
// listen on port 9900;
app.listen(port, "0.0.0.0", (err) => {
    if (err) throw err;
    console.log(`We are now listening for connections on port ${port}`)
})