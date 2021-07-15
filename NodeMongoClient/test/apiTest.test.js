// this is a file made to test the JavaScript code
const apiCall = require("supertest");
const app = require("../index");
const reader = require("../readCredentials");
const fs = require("fs");
const { expect } = require("chai");
const { response } = require("../index");
jest.setTimeout(60000);
it("Responds to bad API call", async () => {
    var response = await apiCall(app).post("/testvault").send({
        username: "pierre", password: "password123"
    })
    expect(response.statusCode).to.equal(400);
    expect(response.text).to.equal('{"Message":"Failed","Result":"Authentication Failed!"}')
});
it("Responds to good API call", async () => {
    let passwd = fs.readFileSync("../creds/mongoApiTest.txt", "utf-8")
    var response = await apiCall(app).post("/testvault").send({
        username: "pierre", password: passwd.replace(/\r?\n|\r/g, "")
    })
    expect(response.statusCode).to.equal(200);
});
it("Respond to a bad user signup", async () => {
    let theResponse = await apiCall(app).post("/newuser").send({
        firstName: "Ebube", lastName: "Test", username: "easo", 
        password: "test123!!", email: "escalade938@gmail.com"
    })
    expect(theResponse.text).to.equal("Username is already taken");
})
/*
it("Respond to good user signup", async () => {
    let theResponse = await apiCall(app).post("/newuser").send({
        firstName: "Ebube", lastName: "Test", username: "easo", 
        password: "test123!!", email: "escalade938@gmail.com"
    })
    expect(theResponse.statusCode).to.equal(200);
    //expect(theResponse.)
})
*/