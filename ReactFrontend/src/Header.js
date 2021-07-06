"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppHeader = exports.TheHeader = exports.VaultLogin = exports.authenticate = exports.httpsAgent = void 0;
const react_1 = __importDefault(require("react"));
const Styles_1 = require("./Styles");
const react_router_dom_1 = require("react-router-dom");
const Vault_1 = require("./Vault");
const https_1 = __importDefault(require("https"));
const axios_1 = __importDefault(require("axios"));
exports.authenticate = "";
const VaultLogin = () => {
    var [login, setLogin] = react_1.default.useState("");
    var [user, setUser] = react_1.default.useState("");
    var [passwd, setPasswd] = react_1.default.useState("");
    // this is used to send the account credentials
    var auth = { username: user, password: passwd };
    const sendAuth = () => {
        exports.httpsAgent = new https_1.default.Agent({ rejectUnauthorized: false });
        setLogin(false);
        axios_1.default.post("https://192.168.1.103:9900/vaultuser", auth, { httpsAgent: exports.httpsAgent, headers: { "Content-Type": "application/json" } })
            .then(response => {
            let result = response.data;
            console.log(result);
            if (result.Message == "Success") {
                setLogin(true);
                exports.authenticate = user;
            }
            if (result.Message == "Failed") {
                setLogin(false);
            }
        })
            .catch(err => console.log(err));
    };
    if (login == "") {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(Styles_1.Subtitle, null, "VaultPass Login"),
            react_1.default.createElement("div", { className: "TheForm" },
                react_1.default.createElement("form", { id: "login" },
                    react_1.default.createElement("label", { htmlFor: "username", id: "username-label" }, "Username"),
                    react_1.default.createElement("input", { type: "text", name: "username", id: "username", value: user, onChange: (e) => setUser(e.target.value) }),
                    react_1.default.createElement("label", { htmlFor: "password", id: "password-label" }, "Password"),
                    react_1.default.createElement("input", { type: "password", name: "password", id: "password", value: passwd, onChange: (e) => setPasswd(e.target.value) })),
                react_1.default.createElement("button", { id: "submit-login", onClick: sendAuth }, "Login"))));
    }
    return login ? react_1.default.createElement(exports.AppHeader, null) : react_1.default.createElement(NotAuthorized, null);
};
exports.VaultLogin = VaultLogin;
const TheHeader = () => {
    return react_1.default.createElement(exports.VaultLogin, null);
};
exports.TheHeader = TheHeader;
const AppHeader = () => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(react_router_dom_1.HashRouter, null,
            react_1.default.createElement("div", null,
                react_1.default.createElement(Styles_1.Header, null,
                    react_1.default.createElement("nav", null,
                        react_1.default.createElement(Styles_1.Ul, null,
                            react_1.default.createElement(Styles_1.Nav1, null,
                                react_1.default.createElement(Styles_1.NavList, null,
                                    react_1.default.createElement(Styles_1.NavLinks, { to: "/" },
                                        react_1.default.createElement(Styles_1.LogoDiv, null)))),
                            react_1.default.createElement(Styles_1.LoginNav, null,
                                react_1.default.createElement(Styles_1.NavList, null,
                                    react_1.default.createElement(Styles_1.NavLinks, { to: "/account" }, "Account")),
                                react_1.default.createElement(Styles_1.NavList, null,
                                    react_1.default.createElement(Styles_1.NavLinks, { to: "/logout" }, "Logout"))))))),
            react_1.default.createElement(react_router_dom_1.Switch, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: "/" },
                    react_1.default.createElement(Vault_1.VaultMain, null)),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/account" }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/logout" },
                    react_1.default.createElement(exports.VaultLogin, null))))));
};
exports.AppHeader = AppHeader;
const NotAuthorized = () => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(react_router_dom_1.HashRouter, null,
            react_1.default.createElement("div", null,
                react_1.default.createElement(Styles_1.Header, null,
                    react_1.default.createElement("nav", null,
                        react_1.default.createElement(Styles_1.Ul, null,
                            react_1.default.createElement(Styles_1.Nav1, null),
                            react_1.default.createElement(Styles_1.LoginNav, null,
                                react_1.default.createElement(Styles_1.NavList, null,
                                    react_1.default.createElement(Styles_1.NavLinks, { to: "/Login" }, "Login")),
                                react_1.default.createElement(Styles_1.NavList, null,
                                    react_1.default.createElement(Styles_1.NavLinks, { to: "/signup" }, "Register"))))))),
            react_1.default.createElement(react_router_dom_1.Switch, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: "/login" },
                    react_1.default.createElement(exports.VaultLogin, null)),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/signup" },
                    react_1.default.createElement(Styles_1.Title, null, "Signup")))),
        react_1.default.createElement(Styles_1.Title, null, "You are not authorized"),
        react_1.default.createElement(Styles_1.Subtitle, null, "Either login with the right credentials or create a new account")));
};
