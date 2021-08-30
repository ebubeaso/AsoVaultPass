"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signup = void 0;
const react_1 = __importDefault(require("react"));
const Header_1 = require("./Header");
const Styles_1 = require("./Styles");
const formValidator_1 = __importDefault(require("./formValidator"));
const axios_1 = __importDefault(require("axios"));
const react_router_dom_1 = require("react-router-dom");
const Signup = () => {
    let history = react_router_dom_1.useHistory();
    var [fname, setFname] = react_1.default.useState("");
    var [lname, setLname] = react_1.default.useState("");
    var [registerUser, setRegisterUser] = react_1.default.useState("");
    var [registerPasswd, setRegisterPasswd] = react_1.default.useState("");
    var [confirmPasswd, setConfirmPasswd] = react_1.default.useState("");
    var [registerEmail, setRegisterEmail] = react_1.default.useState("");
    const setForm = (validate) => {
        // get the values from the form (initial state)
        var [inputs, setInputs] = react_1.default.useState({
            firstname: "", lastname: "", username: "", password: "", confirm: "", email: ""
        });
        const [formErrors, setFormErrors] = react_1.default.useState({
            //the initial state of the form errors
            firstname: " ", lastname: " ", username: " ", password: " ", confirm: "", email: " "
        });
        // recognizes any change in the form
        const changing = (e) => {
            var { name, value } = e.target; // some destructuring
            setInputs({ ...inputs, [name]: value }); //using spread syntax
        };
        // recognizes a form submission
        const submission = () => {
            // this will be for the form validation
            setFormErrors(validate(inputs));
            // This code below verifies that there are no form error messages
            var valid = "";
            var errorCount = 0;
            let errorList = Object.values(formErrors); // turns the object into a list
            let inputList = Object.values(inputs);
            for (let val of errorList) {
                // checks to see if Please or Password is in one of the values from formError
                // This will signify that the form is not valid and it won't send the request
                if (val.includes("Please") || val.includes("Password") || val.includes(" ")) {
                    valid = false;
                    errorCount++;
                    break;
                }
            }
            ;
            if (errorCount == 0 || inputList.includes("") == false && inputs.password == inputs.confirm) {
                if (inputs.password.length >= 8 && /[A-Z]/.test(inputs.password) &&
                    /[0-9]/.test(inputs.password) && /[\! || \? || \@ || \$ || \%]/.test(inputs.password)) {
                    valid = true;
                }
            }
            ;
            if (valid) {
                let request = { firstName: inputs.firstname, lastName: inputs.lastname,
                    username: inputs.username, password: inputs.password, email: inputs.email };
                // send the data to the backend service to register
                axios_1.default.post("https://192.168.1.103:9900/newuser", request, { httpsAgent: Header_1.httpsAgent, headers: { "Content-Type": "application/json" } })
                    .then(response => {
                    let result = response.data;
                    if (result.Message == "Success!") {
                        alert("Congrats! You have signed up successfully!");
                        history.push("/login");
                    }
                    else {
                        alert("Sorry, that username was taken");
                    }
                }).catch(err => {
                    alert("Sorry, but we could not connect to the backend service. Try again later.");
                    console.log(err);
                });
            }
            ;
        };
        return { changing, inputs, submission, formErrors };
    };
    // using the custom hook that I made for form validation
    const { changing, inputs, submission, formErrors } = setForm(formValidator_1.default);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Styles_1.Title, null, "Signup"),
        react_1.default.createElement("div", { className: "TheForm" },
            react_1.default.createElement("form", { id: "register" },
                react_1.default.createElement("br", null),
                formErrors.firstname && react_1.default.createElement("p", { className: "Invalid" }, formErrors.firstname),
                react_1.default.createElement("label", { htmlFor: "first-name", className: "FormLabel", id: "first-name-label" }, "First Name"),
                react_1.default.createElement("input", { type: "text", name: "firstname", className: "FormInput", id: "first-name", value: inputs.firstname, onChange: changing }),
                formErrors.lastname && react_1.default.createElement("p", { className: "Invalid" }, formErrors.lastname),
                react_1.default.createElement("label", { htmlFor: "last-name", className: "FormLabel", id: "last-name-label" }, "Last Name"),
                react_1.default.createElement("input", { type: "text", name: "lastname", className: "FormInput", id: "last-name", value: inputs.lastname, onChange: changing }),
                formErrors.email && react_1.default.createElement("p", { className: "Invalid" }, formErrors.email),
                react_1.default.createElement("label", { htmlFor: "new-email", className: "FormLabel", id: "email-label" }, "Email Address"),
                react_1.default.createElement("input", { type: "text", name: "email", className: "FormInput", id: "new-email", value: inputs.email, onChange: changing }),
                formErrors.username && react_1.default.createElement("p", { className: "Invalid" }, formErrors.username),
                react_1.default.createElement("label", { htmlFor: "register-user", className: "FormLabel", id: "new-user-label" }, "Username"),
                react_1.default.createElement("input", { type: "text", name: "username", className: "FormInput", id: "register-user", value: inputs.username, onChange: changing }),
                formErrors.password && react_1.default.createElement("p", { className: "Invalid", id: "invalid-pass" }, formErrors.password),
                react_1.default.createElement("label", { htmlFor: "register-pass", className: "FormLabel", id: "new-pass-label" }, "Password"),
                react_1.default.createElement("input", { type: "password", name: "password", className: "FormInput", id: "register-pass", value: inputs.password, onChange: changing }),
                formErrors.confirm && react_1.default.createElement("p", { className: "Invalid" }, formErrors.confirm),
                react_1.default.createElement("label", { htmlFor: "confirm-pass", className: "FormLabel", id: "confirm-label" }, "Confirm Password"),
                react_1.default.createElement("input", { type: "password", name: "confirm", className: "FormInput", id: "confirm-pass", value: inputs.confirm, onChange: changing })),
            react_1.default.createElement("div", { className: "Send", id: "signup" },
                react_1.default.createElement("button", { className: "SubmitButton", id: "submit-register", onClick: submission }, "Signup!")))));
};
exports.Signup = Signup;
