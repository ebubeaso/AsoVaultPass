"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheHeader = void 0;
const react_1 = __importDefault(require("react"));
const Styles_1 = require("./Styles");
const react_router_dom_1 = require("react-router-dom");
const Vault_1 = require("./Vault");
const TheHeader = () => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(react_router_dom_1.HashRouter, null,
            react_1.default.createElement("div", null,
                react_1.default.createElement(Styles_1.Header, null,
                    react_1.default.createElement("nav", null,
                        react_1.default.createElement(Styles_1.Ul, null,
                            react_1.default.createElement("div", { id: "nav1" },
                                react_1.default.createElement(Styles_1.NavList, null,
                                    react_1.default.createElement(Styles_1.LogoDiv, null)),
                                react_1.default.createElement(Styles_1.NavList, null,
                                    react_1.default.createElement(react_router_dom_1.Link, { to: "/" }, "Home")),
                                react_1.default.createElement(Styles_1.NavList, null,
                                    react_1.default.createElement(react_router_dom_1.Link, { to: "/services" }, "Services"))),
                            react_1.default.createElement(Styles_1.LoginNav, null,
                                react_1.default.createElement(Styles_1.NavList, null,
                                    react_1.default.createElement(react_router_dom_1.Link, { to: "/login" }, "Login")),
                                react_1.default.createElement(Styles_1.NavList, null,
                                    react_1.default.createElement(react_router_dom_1.Link, { to: "/signup" }, "Register"))))))),
            react_1.default.createElement(react_router_dom_1.Switch, null,
                react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/" },
                    react_1.default.createElement(Vault_1.VaultHome, null)),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/services" }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/login" }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/signup" })))));
};
exports.TheHeader = TheHeader;
