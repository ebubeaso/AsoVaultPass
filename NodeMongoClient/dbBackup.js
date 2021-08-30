// this file is going to be used for handling mariaDB connections
const mariadb = require("mariadb");
const reader = require("./readCredentials");
const axios = require("axios");
const https = require("https");
// setup the HTTPS agent
httpsAgent = new https.Agent({rejectUnauthorized: false})
let credentials = reader.readCreds();
let connectDB = async (user, pass, email) => {
    var dbUser, dbPass;
    // get the db passwd
    for (let cred of credentials) {
        if (cred.includes("mariadbuser")) {
            dbUser = cred.split("=")[1];
        }
        if (cred.includes("mariadbpass")) {
            dbPass = cred.split("=")[1];
        }
    }
    let parameters = { host: "192.168.1.102", port: 33606, ssl: {rejectUnauthorized: false},  
    user: dbUser, password: dbPass, database: 'VaultPass', connectionLimit: 2 }
    // setup the connection
    let connection = await mariadb.createConnection(parameters);
    let randomID = String(Math.floor(Math.random() * (99999999 - 10000000) + 10000000));
    let sql = `insert into vaultlogin (ID, username, password, email) 
    values (${randomID}, '${user}', '${pass}', '${email}')`
    let data = await connection.query(sql);
    await connection.end();
    setTimeout(async () => {
        try { 
            var res = await axios.put(`https://192.168.1.103:5500/setpass/${user}`, {passwd: pass}, 
            {httpsAgent, headers: {"Content-Type": "application/json"}});
            console.log(res.status);
        } catch (e) {
            console.log("Uh-oh, your backend is not working. Please try again later")
        }
    }, 10000 )
    return data;
};
let removeData = async (user) => {
    try {
        await axios.delete(`https://192.168.1.103:5500/remove/${user}`,
        {httpsAgent, headers: {"Content-Type": "application/json"}});
    } catch (e) {
        console.error("Uh-oh, your backend is not working. Please try again later");
        throw new Error(e);
    }
}
// export this so that it can be used later
module.exports = {connectDB, removeData};