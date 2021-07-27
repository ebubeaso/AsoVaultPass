"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyAccount = exports.VaultMain = exports.VaultHome = void 0;
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
    var [newUser, setNewUser] = react_1.default.useState("");
    var [newPasswd, setNewPasswd] = react_1.default.useState("");
    var [newService, setNewService] = react_1.default.useState("");
    var [addPopup, setAddPopup] = react_1.default.useState(false);
    let buttonCss = { backgroundColor: buttonColor };
    react_1.default.useEffect(() => {
        axios_1.default.get(`https://192.168.1.103:5500/vault/${Header_1.authenticate}`, { httpsAgent: Header_1.httpsAgent, headers: { "Content-Type": "application/json" } })
            .then(response => {
            let result = response.data;
            setAppData(result);
        });
    }, []);
    // These functions are used to display or hide the popup service
    const showAddPopup = () => {
        setAddPopup(true);
    };
    const closeAddPopup = () => {
        setAddPopup(false);
    };
    // this sends the new service to the database
    const addService = () => {
    };
    const addingPopup = (react_1.default.createElement("div", { className: "Popup" },
        react_1.default.createElement("div", { className: "TheForm", id: "add-service" },
            react_1.default.createElement("form", { id: "add-form" },
                react_1.default.createElement("button", { className: "CloseButton", id: "close-add", onClick: closeAddPopup }, " X "),
                react_1.default.createElement("label", { htmlFor: "add-service", className: "FormLabel", id: "add-service-label" }, "Service"),
                react_1.default.createElement("input", { type: "text", name: "username", className: "FormInput", id: "add-service", value: newService, onChange: (e) => setNewService(e.target.value) }),
                react_1.default.createElement("label", { htmlFor: "add-username", className: "FormLabel", id: "add-user-label" }, "Username"),
                react_1.default.createElement("input", { type: "text", name: "username", className: "FormInput", id: "add-username", value: newUser, onChange: (e) => setNewUser(e.target.value) }),
                react_1.default.createElement("label", { htmlFor: "add-password", className: "FormLabel", id: "add-pass-label" }, "Password"),
                react_1.default.createElement("input", { type: "password", name: "password", className: "FormInput", id: "add-password", value: newPasswd, onChange: (e) => setNewPasswd(e.target.value) })),
            react_1.default.createElement("button", { className: "SubmitButton", id: "add-service", onClick: addService }, "Add Service"))));
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
                    react_1.default.createElement("p", { className: "Service" }, d.Service)),
                react_1.default.createElement("div", { className: "GridItem" },
                    react_1.default.createElement("p", { className: "Icon", id: "NewService", onClick: showAddPopup }, "+"),
                    react_1.default.createElement("p", { className: "Service" }, "Add Service")))))),
        (addPopup) ? addingPopup : null));
};
exports.VaultMain = VaultMain;
const MyAccount = () => {
    return (react_1.default.createElement("div", null));
};
exports.MyAccount = MyAccount;
