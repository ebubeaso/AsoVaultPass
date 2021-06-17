// make the ssh tunnel
const ssh = require("node-ssh-forward");
const nodeMongo = require("./connectMongo");

// work on the SSH tunnel
var sshPasswd = "";
let credsList = nodeMongo.readCreds();
for (let creds of credsList) {
    // parse the SSH password for making the tunnel
    if (creds.includes("sshpass")) {
        sshPasswd = creds.split("=")[1];    
    }
}
/* 
Making the SSH tunnel using the MONGO_HOST that I set
in the package.json file
*/
var sshTunnel = new ssh.SSHConnection({
    endHost: process.env.MONGO_HOST,
    username: "ubuntu",
    password: sshPasswd
});
// This function does the SSH port forwarding
function portForward() {
    sshTunnel.forward({
        fromPort: 27017,
        toPort: 27017,
        toHost: "localhost"
    }).then(() => console.log("ssh tunnel on"))
    .catch(err => console.log(err));
};
module.exports = {portForward}