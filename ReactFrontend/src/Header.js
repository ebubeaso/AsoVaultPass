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
    var [login, setLogin] = react_1.default.useState("");
    var [user, setUser] = react_1.default.useState("");
    var [passwd, setPasswd] = react_1.default.useState("");
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
                    react_1.default.createElement("button", { className: "SubmitButton", id: "forgot" }, "Forgot Password")))));
    }
    return login ? react_1.default.createElement(react_router_dom_1.Redirect, { to: "/main" }) : react_1.default.createElement(react_router_dom_1.Redirect, { to: "/unauthorized" });
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
                react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/unauthorized", component: NotAuthorized }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/service/:service", component: Services_1.Service })))));
};
exports.TheHeader = TheHeader;
const NotAuthorized = () => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Styles_1.Title, null, "You are not authorized"),
        react_1.default.createElement(Styles_1.Subtitle, null, "Either login with the right credentials or create a new account")));
};
