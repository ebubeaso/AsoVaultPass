"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaultMain = exports.VaultHome = void 0;
const react_1 = __importDefault(require("react"));
const Styles_1 = require("./Styles");
const Header_1 = require("./Header");
const axios_1 = __importDefault(require("axios"));
const VaultHome = () => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Styles_1.Title, null, "Aso VaultPass"),
        react_1.default.createElement(Styles_1.IntroParagraph, null, "Having a hard time with remembering your passwords? No worries! This web app serves as a password vault to store your account info and have it readily available for you to access your favorite sites."),
        react_1.default.createElement(Styles_1.IntroParagraph, null, "Once you make an account and login, you will have the option to add, manage, view and delete your passwords. Click the \"+\" button to add a new password. You can also click each box that represents each service that you have currently saved in this environment. Once you click on the box, you can then edit your saved information or delete it from the password vault."),
        react_1.default.createElement(Styles_1.IntroParagraph, null, "If you haven't made an account already, click on the \"Register\" button to create an account. If you already have an account, login and start using the password manager today!")));
};
exports.VaultHome = VaultHome;
const VaultMain = () => {
    var [buttonColor, setButtonColor] = react_1.default.useState("green");
    var [appData, setAppData] = react_1.default.useState([]);
    let buttonCss = { backgroundColor: buttonColor };
    react_1.default.useEffect(() => {
        axios_1.default.get(`https://192.168.1.103:5500/vault/${Header_1.authenticate}`, { httpsAgent: Header_1.httpsAgent, headers: { "Content-Type": "application/json" } })
            .then(response => {
            let result = response.data;
            setAppData(result);
        });
    }, []);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: "SearchDiv" },
            react_1.default.createElement("input", { type: "search", name: "search", id: "search", placeholder: "Search" }),
            react_1.default.createElement("button", { style: buttonCss, className: "SearchButton", onMouseOver: () => setButtonColor("#2ddc2d"), onMouseOut: () => setButtonColor("green") }, "Search")),
        react_1.default.createElement(Styles_1.Title, null, "My Sites"),
        react_1.default.createElement("div", { className: "Sites" },
            react_1.default.createElement(Styles_1.Subtitle, null, "Frequently Used"),
            appData.map((d) => (react_1.default.createElement("div", { className: "SiteGrid", key: d.Username },
                react_1.default.createElement("div", { className: "GridItem" },
                    react_1.default.createElement("p", { className: "Icon" }, d.Service[0]),
                    react_1.default.createElement("p", { className: "Service" }, d.Service))))))));
};
exports.VaultMain = VaultMain;
