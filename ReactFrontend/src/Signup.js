"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signup = void 0;
const react_1 = __importDefault(require("react"));
const Styles_1 = require("./Styles");
const Signup = () => {
    var [fname, setFname] = react_1.default.useState("");
    var [lname, setLname] = react_1.default.useState("");
    var [registerUser, setRegisterUser] = react_1.default.useState("");
    var [registerPasswd, setRegisterPasswd] = react_1.default.useState("");
    var [confirmPasswd, setConfirmPasswd] = react_1.default.useState("");
    var [registerEmail, setRegisterEmail] = react_1.default.useState("");
    // these states are for validation
    var [validFname, setValidFname] = react_1.default.useState("");
    var [validLname, setValidLname] = react_1.default.useState("");
    var [validUser, setValidUser] = react_1.default.useState("");
    var [validPasswd, setvalidPasswd] = react_1.default.useState("");
    var [validConfirm, setValidConfirm] = react_1.default.useState("");
    var [validEmail, setValidEmail] = react_1.default.useState("");
    // the element to show when you put an invalid password
    var inValidPassword = (react_1.default.createElement("div", { className: "InvalidPasswd" },
        react_1.default.createElement("p", { className: "Invalid" }, "Invalid Password"),
        react_1.default.createElement("p", { className: "Invalid" }, "Your password must match the following:"),
        react_1.default.createElement("p", { className: "Invalid" }, "Must be at least 8 characters long"),
        react_1.default.createElement("p", { className: "Invalid" }, "Must be have at least one capital letter and number"),
        react_1.default.createElement("p", { className: "Invalid" }, "Must contain a special character (e.g. ! ? $ @)")));
    const register = () => {
        let request = { firstName: fname, lastName: lname, username: registerUser,
            password: registerPasswd, email: registerEmail };
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Styles_1.Title, null, "Signup"),
        react_1.default.createElement("div", { className: "TheForm" },
            react_1.default.createElement("form", { id: "register" },
                react_1.default.createElement("br", null),
                validFname === true || validFname == "" ?
                    null : react_1.default.createElement("p", { className: "Invalid" }, "Please Enter Your First Name"),
                react_1.default.createElement("label", { htmlFor: "first-name", className: "FormLabel", id: "first-name-label" }, "First Name"),
                react_1.default.createElement("input", { type: "text", name: "firstname", className: "FormInput", id: "first-name", value: fname, onChange: (e) => setFname(e.target.value) }),
                validLname === true || validLname == "" ?
                    null : react_1.default.createElement("p", { className: "Invalid" }, "Please Enter Your Last Name"),
                react_1.default.createElement("label", { htmlFor: "last-name", className: "FormLabel", id: "last-name-label" }, "Last Name"),
                react_1.default.createElement("input", { type: "text", name: "lastname", className: "FormInput", id: "last-name", value: lname, onChange: (e) => setLname(e.target.value) }),
                validEmail === true || validEmail == "" ?
                    null : react_1.default.createElement("p", { className: "Invalid" }, "Please Enter a Valid Email"),
                react_1.default.createElement("label", { htmlFor: "new-email", className: "FormLabel", id: "email-label" }, "Email Address"),
                react_1.default.createElement("input", { type: "text", name: "email", className: "FormInput", id: "new-email", value: registerEmail, onChange: (e) => setRegisterEmail(e.target.value) }),
                validUser === true || validUser == "" ?
                    null : react_1.default.createElement("p", { className: "Invalid" }, "Please Enter A Username"),
                react_1.default.createElement("label", { htmlFor: "register-user", className: "FormLabel", id: "new-user-label" }, "Username"),
                react_1.default.createElement("input", { type: "text", name: "username", className: "FormInput", id: "register-user", value: registerUser, onChange: (e) => setRegisterUser(e.target.value) }),
                validPasswd === true || validPasswd == "" ? null : inValidPassword,
                react_1.default.createElement("label", { htmlFor: "register-pass", className: "FormLabel", id: "new-pass-label" }, "Password"),
                react_1.default.createElement("input", { type: "password", name: "password", className: "FormInput", id: "register-pass", value: registerPasswd, onChange: (e) => setRegisterPasswd(e.target.value) }),
                validConfirm === true || validConfirm == "" ? null : react_1.default.createElement("p", { className: "Invalid" }, "Passwords do Not Match"),
                react_1.default.createElement("label", { htmlFor: "confirm-pass", className: "FormLabel", id: "confirm-label" }, "Confirm Password"),
                react_1.default.createElement("input", { type: "password", name: "password", className: "FormInput", id: "confirm-pass", value: confirmPasswd, onChange: (e) => setConfirmPasswd(e.target.value) })),
            react_1.default.createElement("button", { className: "SubmitButton", id: "submit-login", onClick: register }, "Signup!"))));
};
exports.Signup = Signup;
