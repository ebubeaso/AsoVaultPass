// this is a file made to test the JavaScript code
const apiCall = require("supertest");
const app = require("../index");
const reader = require("../readCredentials");
const fs = require("fs");
const { expect } = require("chai");

it("Responds to bad API call", async () => {
    var response = await apiCall(app).post("/testvault").send({
        username: "pierre", password: "password123"
    })
    expect(response.statusCode).to.equal(400);
});
it("Responds to good API call", async () => {
    let passwd = fs.readFileSync("../creds/mongoApiTest.txt", "utf-8")
    var response = await apiCall(app).post("/testvault").send({
        username: "pierre", password: passwd.replace(/\r?\n|\r/g, "")
    })
    expect(response.statusCode).to.equal(200);
});