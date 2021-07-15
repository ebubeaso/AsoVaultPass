// this file is going to be used for handling mariaDB connections
const mariadb = require("mariadb");
const reader = require("./readCredentials");
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
    values ('${randomID}', '${user}', '${pass}', '${email}')`
    let data = await connection.query(sql);
    await connection.end();
    return data;
}
// for testing the function
//let result = connectDB("easo", "test123", "escalade938@gmail.com");

// export this so that it can be used later
module.exports = {connectDB};