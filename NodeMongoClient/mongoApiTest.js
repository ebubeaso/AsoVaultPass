// This is the script that will be run to test out the API endpoints
const axios = require("axios");
const fs = require("fs");
const { expect } = require("chai");
const { response } = require("express");

const passwd = fs.readFileSync("../creds/mongoApiTest.txt", "utf-8").replace(/\r?\n|\r/g, "");
// testing out the correct credentials
axios.post("http://localhost:9900/testvault", {
    username: "pierre", password: passwd
}).then(response => {
    let result = response;
    expect(result.status).to.equal(200);
    expect(result.data.Message).to.equal('Success');
    console.log("This request passed the test!!!");
}).catch(err => {throw err;});

// testing out the incorrect credentials
axios.post("http://localhost:9900/testvault", {
    username: "jaxon", password: "password123"
}).then(response => {
    let result = response;
}).catch(err => {
    let theError = err;
    expect(theError.response.status).to.equal(400);
    expect(theError.response.data.Message).to.equal("Failed");
    console.log("This request testing incorrect credentials has passed!");
});
axios.post("http://localhost:9900/testvault", {
    username: "pierre", password: "Ebube"
}).then(response => {
    let result = response;
}).catch(err => {
    let theError = err;
    expect(theError.response.status).to.equal(400);
    expect(theError.response.data.Message).to.equal("Failed");
    console.log("This request testing incorrect credentials has passed as well!");
});