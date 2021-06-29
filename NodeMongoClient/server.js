const app = require("./index");
const https = require("https");
const fs = require("fs");
const port = 9900;
// listen on port 9900;
const server = https.createServer({
    key: fs.readFileSync("../creds/ssl/server-key.pem"),
    cert: fs.readFileSync("../creds/ssl/server-cert.crt"),
    ca: fs.readFileSync("../creds/ssl/ca-cert.pem"),
    rejectUnauthorized: false
}, app);
server.listen(port, "0.0.0.0", (err) => {
    if (err) throw err;
    console.log(`We are now listening for HTTPS connections on port ${port}`)
});