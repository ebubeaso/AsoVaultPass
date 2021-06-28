"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaultHome = void 0;
const react_1 = __importDefault(require("react"));
const Styles_1 = require("./Styles");
const VaultHome = () => {
    var [login, setLogin] = react_1.default.useState(false);
    var [buttonColor, setButtonColor] = react_1.default.useState("green");
    let buttonCss = { backgroundColor: buttonColor };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: "SearchDiv" },
            react_1.default.createElement("input", { type: "search", name: "search", id: "search", placeholder: "Search" }),
            react_1.default.createElement("button", { style: buttonCss, className: "SearchButton", onMouseOver: () => setButtonColor("#2ddc2d"), onMouseOut: () => setButtonColor("green") }, "Search")),
        react_1.default.createElement(Styles_1.Title, null, "My Sites"),
        react_1.default.createElement("div", { className: "Sites" },
            react_1.default.createElement(Styles_1.Subtitle, null, "Frequently Used"),
            react_1.default.createElement("div", { className: "SiteGrid" },
                react_1.default.createElement("div", { className: "GridItem" }, "Facebook"),
                react_1.default.createElement("div", { className: "GridItem" }, "Gmail"),
                react_1.default.createElement("div", { className: "GridItem" }, "Outlook"),
                react_1.default.createElement("div", { className: "GridItem" }, "Dropbox"),
                react_1.default.createElement("div", { className: "GridItem" }, "Fashion Nova"),
                react_1.default.createElement("div", { className: "GridItem" }, "Bank of America"),
                react_1.default.createElement("div", { className: "GridItem" }, "Paypal")))));
};
exports.VaultHome = VaultHome;
