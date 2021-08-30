"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheHeader = exports.VaultLogin = exports.authenticate = exports.httpsAgent = void 0;
const react_1 = __importDefault(require("react"));
const Styles_1 = require("./Styles");
const react_router_dom_1 = require("react-router-dom");
const Vault_1 = require("./Vault");
const Signup_1 = require("./Signup");
const https_1 = __importDefault(require("https"));
const axios_1 = __importDefault(require("axios"));
const Services_1 = require("./Services");
exports.authenticate = "";
const VaultLogin = () => {
    var history = react_router_dom_1.useHistory();
    var [login, setLogin] = react_1.default.useState("");
    var [user, setUser] = react_1.default.useState("");
    var [passwd, setPasswd] = react_1.default.useState("");
    var [forgot, setForgot] = react_1.default.useState(false);
    var [recoverEmail, setRecoverEmail] = react_1.default.useState("");
    var [enterCode, setEnterCode] = react_1.default.useState(false);
    var [code, setCode] = react_1.default.useState("");
    // this is used to send the account credentials
    var auth = { username: user, password: passwd };
    const sendAuth = () => {
        exports.httpsAgent = new https_1.default.Agent({ rejectUnauthorized: false });
        axios_1.default.post("https://192.168.1.103:9900/vaultuser", auth, { httpsAgent: exports.httpsAgent, headers: { "Content-Type": "application/json" } })
            .then(response => {
            let result = response.data;
            if (result.Message == "Success") {
                setLogin(true);
                exports.authenticate = user;
                /*
                We want to save the user's username in the session so that when we
                refresh the page after updating some data, the user can still remain
                logged into the session
                */
                window.sessionStorage.setItem("authenticated", exports.authenticate);
            }
            if (result.Message != "Success") {
                setLogin(false);
                alert("Sorry, you have entered incorrect credentials, please try again");
            }
        })
            .catch(err => {
            alert("Sorry, but we could not connect to the backend service. Try again later.");
            console.log(err);
        });
    };
    const closeForgotPopup = () => setForgot(false);
    const showForgotPopup = () => setForgot(true);
    const sendEmail = () => {
        let request = { recipients: recoverEmail, code: Math.floor(Math.random() * (999999 - 100000) + 100000) };
        let currentUser = window.sessionStorage.getItem("authenticated");
        axios_1.default.post(`https://192.168.1.103:5500/recover/${currentUser}`, request, { httpsAgent: exports.httpsAgent, headers: { "Content-Type": "application/json" } })
            .then(response => {
            let result = response.data;
            result.Message == "Success" ? setEnterCode(true) : alert(result.Result);
        }).catch(err => {
            alert("Sorry, but we could not connect to the backend service. Try again later.");
            console.log(err);
        });
    };
    const sendCode = () => {
        let request = { recoveryCode: code };
        let currentUser = window.sessionStorage.getItem("authenticated");
        axios_1.default.put(`https://192.168.1.103:5500/recover/${currentUser}`, request, { httpsAgent: exports.httpsAgent, headers: { "Content-Type": "application/json" } })
            .then(response => {
            let result = response.data;
            if (result.Message.includes("invalid")) {
                alert(result.Message);
            }
            else {
                alert(result.Message);
                history.push("/password/update");
            }
        }).catch(err => {
            alert("Sorry, but we could not connect to the backend service. Try again later.");
            console.log(err);
        });
    };
    const forgotPopup = (enterCode) ?
        (react_1.default.createElement("div", { className: "Popup" },
            react_1.default.createElement("div", { className: "TheForm", id: "recovery" },
                react_1.default.createElement("form", { id: "enter-code" },
                    react_1.default.createElement("button", { className: "CloseButton", onClick: closeForgotPopup }, " X "),
                    react_1.default.createElement(Styles_1.Subtitle, null, "Recovery Email Sent!"),
                    react_1.default.createElement(Styles_1.Subtitle, null, "Check your email for the recovery code"),
                    react_1.default.createElement("label", { htmlFor: "email-recover", className: "FormLabel", id: "forgot-label" }, "Recovery Code"),
                    react_1.default.createElement("input", { type: "text", name: "forgot", className: "FormInput", id: "forgot-password", value: code, onChange: (e) => setCode(e.target.value) })),
                react_1.default.createElement("div", { className: "Send" },
                    react_1.default.createElement("button", { className: "SubmitButton", id: "the-code", onClick: sendCode }, "Submit"))))) :
        (react_1.default.createElement("div", { className: "Popup" },
            react_1.default.createElement("div", { className: "TheForm", id: "forgot" },
                react_1.default.createElement("form", { id: "forgot-form" },
                    react_1.default.createElement("button", { className: "CloseButton", id: "close-forgot", onClick: closeForgotPopup }, " X "),
                    react_1.default.createElement("label", { htmlFor: "email-recover", className: "FormLabel", id: "forgot-label" }, "Enter your Email Address:"),
                    react_1.default.createElement("input", { type: "text", name: "forgot", className: "FormInput", id: "forgot-password", value: recoverEmail, onChange: (e) => setRecoverEmail(e.target.value) })),
                react_1.default.createElement("div", { className: "Send" },
                    react_1.default.createElement("button", { className: "SubmitButton", id: "send-email", onClick: sendEmail }, "Submit")))));
    if (login == "") {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(Styles_1.Subtitle, null, "VaultPass Login"),
            react_1.default.createElement("div", { className: "TheForm", id: "form-login" },
                react_1.default.createElement("form", { id: "login" },
                    react_1.default.createElement("label", { htmlFor: "username", className: "FormLabel", id: "username-label" }, "Username"),
                    react_1.default.createElement("input", { type: "text", name: "username", className: "FormInput", id: "username", value: user, onChange: (e) => setUser(e.target.value) }),
                    react_1.default.createElement("label", { htmlFor: "password", className: "FormLabel", id: "password-label" }, "Password"),
                    react_1.default.createElement("input", { type: "password", name: "password", className: "FormInput", id: "password", value: passwd, onChange: (e) => setPasswd(e.target.value) })),
                react_1.default.createElement("div", { className: "Login" },
                    react_1.default.createElement("button", { className: "SubmitButton", id: "submit-login", onClick: sendAuth }, "Login"),
                    react_1.default.createElement("button", { className: "SubmitButton", id: "forgot", onClick: showForgotPopup }, "Forgot Password"))),
            (forgot) ? forgotPopup : null));
    }
    return login ? react_1.default.createElement(react_router_dom_1.Redirect, { to: "/main" }) : null;
};
exports.VaultLogin = VaultLogin;
const TheHeader = () => {
    var [session, setSession] = react_1.default.useState(false);
    react_1.default.useEffect(() => {
        // this will check every 1 second to see if you have logged in
        setInterval(() => {
            if (window.sessionStorage.getItem("authenticated") != null) {
                setSession(true);
            }
            if (session == true) {
                clearInterval();
            }
        }, 1000);
    }, []);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(react_router_dom_1.HashRouter, null,
            react_1.default.createElement("div", null,
                react_1.default.createElement(Styles_1.Header, null,
                    react_1.default.createElement("nav", null,
                        react_1.default.createElement(Styles_1.Ul, null,
                            react_1.default.createElement(Styles_1.Nav1, null,
                                react_1.default.createElement(Styles_1.NavList, null, (window.sessionStorage.getItem("authenticated") != null || session == true) ?
                                    react_1.default.createElement(Styles_1.NavLinks, { to: "/main" },
                                        react_1.default.createElement(Styles_1.LogoDiv, null)) : react_1.default.createElement(Styles_1.LogoDiv, null))),
                            react_1.default.createElement(Styles_1.LoginNav, null,
                                react_1.default.createElement(Styles_1.NavList, null, (window.sessionStorage.getItem("authenticated") != null || session == true) ?
                                    react_1.default.createElement(Styles_1.NavLinks, { to: "/account" }, "Account") : react_1.default.createElement(Styles_1.NavLinks, { to: "/login" }, "Login")),
                                react_1.default.createElement(Styles_1.NavList, null, (window.sessionStorage.getItem("authenticated") != null || session == true) ?
                                    react_1.default.createElement(Styles_1.NavLinks, { to: "/logout", onClick: () => {
                                            alert("You have logged out");
                                            window.sessionStorage.removeItem("authenticated");
                                            setSession(false);
                                        } }, "Logout") : react_1.default.createElement(Styles_1.NavLinks, { to: "/signup" }, "Register"))))))),
            react_1.default.createElement(react_router_dom_1.Switch, null,
                react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: Vault_1.VaultHome }),
                react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/main", component: Vault_1.VaultMain }),
                react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/login", component: exports.VaultLogin }),
                react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/signup", component: Signup_1.Signup }),
                react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/account", component: Services_1.MyAccount }),
                react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/logout", component: Vault_1.VaultHome }),
                react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/password/update", component: UpdatePassword }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/service/:service", component: Services_1.Service })))));
};
exports.TheHeader = TheHeader;
const UpdatePassword = () => {
    var theHistory = react_router_dom_1.useHistory();
    var [accountUser, setAccountUser] = react_1.default.useState("");
    var [password, setPassword] = react_1.default.useState("");
    var [confirm, setConfirm] = react_1.default.useState("");
    var [userError, setUserError] = react_1.default.useState(false);
    var [passwdError, setPasswdError] = react_1.default.useState(false);
    var [confirmError, setConfirmError] = react_1.default.useState(false);
    const newPassword = () => {
        if (accountUser.length < 1) {
            setUserError(true);
        }
        else {
            setUserError(false);
        }
        ;
        if (password.length >= 8 && /[A-Z]/.test(password) &&
            /[0-9]/.test(password) && /[\! || \? || \@ || \$ || \%]/.test(password)) {
            if (password == confirm) {
                setPasswdError(false);
                setConfirmError(false);
                let request = { user: accountUser, passwd: password };
                axios_1.default.put(`https://192.168.1.103:9900/recovery`, request, { httpsAgent: exports.httpsAgent, headers: { "Content-Type": "application/json" } })
                    .then(response => {
                    let result = response.data;
                    if (result.Message.includes("Sorry")) {
                        alert(result.Message);
                        window.location.reload();
                    }
                    else {
                        if (window.sessionStorage.getItem("authenticated") != null) {
                            window.sessionStorage.removeItem("authenticated");
                            alert(result.Message);
                            theHistory.push("/login");
                            window.location.reload();
                        }
                        else {
                            alert(result.Message);
                            theHistory.push("/login");
                        }
                    }
                });
            }
            else {
                setConfirmError(true);
            }
        }
        else {
            setPasswdError(true);
        }
    };
    let badUsername = "* Please enter in your account username";
    let badPassword = " * Invalid Password: It needs to be larger than 8 characters,\n";
    badPassword += "it must have at least one number in it and at least one special\n";
    badPassword += "character (e.g. !, ?, @, $, %)";
    let badConfirm = "* Passwords do not match";
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Styles_1.Subtitle, null, "Update Your Account Password"),
        react_1.default.createElement("div", { className: "TheForm", id: "update-password" },
            react_1.default.createElement("form", { id: "update-password-form" },
                (userError) ? react_1.default.createElement("p", { className: "Invalid" }, badUsername) : null,
                react_1.default.createElement("label", { htmlFor: "your-username", className: "FormLabel", id: "your-username-label" }, "Your Account Username"),
                react_1.default.createElement("input", { type: "text", name: "your-username", className: "FormInput", id: "your-username", value: accountUser, onChange: (e) => setAccountUser(e.target.value) }),
                (passwdError) ? react_1.default.createElement("p", { className: "Invalid" }, badPassword) : null,
                react_1.default.createElement("label", { htmlFor: "set-password", className: "FormLabel", id: "set-password-label" }, "New Password"),
                react_1.default.createElement("input", { type: "password", name: "password", className: "FormInput", id: "set-password", value: password, onChange: (e) => setPassword(e.target.value) }),
                (confirmError) ? react_1.default.createElement("p", { className: "Invalid" }, badConfirm) : null,
                react_1.default.createElement("label", { htmlFor: "set-confirmation", className: "FormLabel", id: "set-confirmation-label" }, "Confirm Password"),
                react_1.default.createElement("input", { type: "password", name: "password", className: "FormInput", id: "set-confirm", value: confirm, onChange: (e) => setConfirm(e.target.value) })),
            react_1.default.createElement("div", { className: "Login" },
                react_1.default.createElement("button", { className: "SubmitButton", id: "submit-passwd", onClick: newPassword }, "Submit")))));
};
