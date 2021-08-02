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
var currentUser = window.sessionStorage.getItem("authenticated");
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
    var [details, setDetails] = react_1.default.useState(false);
    var [newUser, setNewUser] = react_1.default.useState("");
    var [newPasswd, setNewPasswd] = react_1.default.useState("");
    var [newService, setNewService] = react_1.default.useState("");
    var [editUser, setEditUser] = react_1.default.useState("");
    var [editPasswd, setEditPasswd] = react_1.default.useState("");
    var [addPopup, setAddPopup] = react_1.default.useState(false);
    var [editPopup, setEditPopup] = react_1.default.useState(false);
    let buttonCss = { backgroundColor: buttonColor };
    react_1.default.useEffect(() => {
        if (Header_1.authenticate.length > 0) {
            axios_1.default.get(`https://192.168.1.103:5500/vault/${Header_1.authenticate}`, { httpsAgent: Header_1.httpsAgent, headers: { "Content-Type": "application/json" } })
                .then(response => {
                let result = response.data;
                setAppData(result);
            }).catch(err => {
                console.log(err);
                alert("Sorry, we could not connect to the resource. Try again later");
            });
        }
        else {
            axios_1.default.get(`https://192.168.1.103:5500/vault/${currentUser}`, { httpsAgent: Header_1.httpsAgent, headers: { "Content-Type": "application/json" } })
                .then(response => {
                let result = response.data;
                setAppData(result);
            }).catch(err => {
                console.log(err);
                alert("Sorry, we could not connect to the resource. Try again later");
            });
        }
    }, []);
    // These functions are used to display or hide the popup screen that adds a new service.
    const showAddPopup = () => { setAddPopup(true); };
    const closeAddPopup = () => { setAddPopup(false); };
    // These functions are used to display or hide the popup screen that edits information.
    const showEditPopup = () => { setEditPopup(true); };
    const closeEditPopup = () => { setEditPopup(false); };
    const showDetails = () => { setDetails(true); };
    // this function shows the details of the account
    const showData = (user, passwd) => {
        const TheDetails = (react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: "DataOptions" },
                react_1.default.createElement("button", { className: "EditButton", onClick: showEditPopup }, "Edit Info"),
                react_1.default.createElement("button", { className: "CloseButton", id: "close-details", onClick: closeDetails }, " X ")),
            react_1.default.createElement("p", { className: "Service" },
                "Username: ",
                user),
            react_1.default.createElement("p", { className: "Service" },
                "Password: ",
                passwd)));
        return TheDetails;
    };
    const closeDetails = () => { setDetails(false); };
    // this sends the new service to the database
    const addService = () => {
        let request = {
            SessionUser: Header_1.authenticate, Username: newUser,
            Password: newPasswd, Service: newService
        };
        axios_1.default.post(`https://192.168.1.103:5500/vault/${currentUser}`, request, { httpsAgent: Header_1.httpsAgent, headers: { "Content-Type": "application/json" } })
            .then(response => {
            let result = response.data;
            // I am using setTimeout to run the alert since "setRequestStatus" runs asynchronously
            setTimeout(() => { alert(result.Result); window.location.reload(); }, 1000);
        }).catch(err => console.log(err));
    };
    const editService = () => {
    };
    const addingPopup = (react_1.default.createElement("div", { className: "Popup" },
        react_1.default.createElement("div", { className: "TheForm", id: "add-service" },
            react_1.default.createElement("form", { id: "add-form" },
                react_1.default.createElement("button", { className: "CloseButton", id: "close-add", onClick: closeAddPopup }, " X "),
                react_1.default.createElement(Styles_1.Subtitle, null, "Add a New Service"),
                react_1.default.createElement("label", { htmlFor: "add-service", className: "FormLabel", id: "add-service-label" }, "Service"),
                react_1.default.createElement("input", { type: "text", name: "add-service", className: "FormInput", id: "add-service", value: newService, onChange: (e) => setNewService(e.target.value) }),
                react_1.default.createElement("label", { htmlFor: "add-username", className: "FormLabel", id: "add-user-label" }, "Username"),
                react_1.default.createElement("input", { type: "text", name: "add-username", className: "FormInput", id: "add-username", value: newUser, onChange: (e) => setNewUser(e.target.value) }),
                react_1.default.createElement("label", { htmlFor: "add-password", className: "FormLabel", id: "add-pass-label" }, "Password"),
                react_1.default.createElement("input", { type: "password", name: "add-password", className: "FormInput", id: "add-password", value: newPasswd, onChange: (e) => setNewPasswd(e.target.value) })),
            react_1.default.createElement("button", { className: "SubmitButton", id: "add-service", onClick: addService }, "Add Service"))));
    const changePopup = (react_1.default.createElement("div", { className: "Popup" },
        react_1.default.createElement("div", { className: "TheForm", id: "add-service" },
            react_1.default.createElement("form", { id: "add-form" },
                react_1.default.createElement("button", { className: "CloseButton", id: "close-edit", onClick: closeEditPopup }, " X "),
                react_1.default.createElement(Styles_1.Subtitle, null, "Edit Credentials"),
                react_1.default.createElement("label", { htmlFor: "edit-username", className: "FormLabel", id: "edit-user-label" }, "Username"),
                react_1.default.createElement("input", { type: "text", name: "username", className: "FormInput", id: "edit-username", value: editUser, onChange: (e) => setEditUser(e.target.value) }),
                react_1.default.createElement("label", { htmlFor: "edit-password", className: "FormLabel", id: "edit-pass-label" }, "Password"),
                react_1.default.createElement("input", { type: "password", name: "password", className: "FormInput", id: "edit-password", value: editPasswd, onChange: (e) => setEditPasswd(e.target.value) })),
            react_1.default.createElement("button", { className: "SubmitButton", id: "add-service", onClick: editService }, "Update Info"))));
    const mappings = appData.map((d) => (react_1.default.createElement("div", { className: "SiteGrid", key: d["ID"] },
        react_1.default.createElement("div", { className: "GridItem" },
            react_1.default.createElement("p", { className: "Icon" }, ` ${d.Service[0]} `),
            react_1.default.createElement("p", { className: "Service", id: "ServiceName", onClick: showDetails }, d.Service),
            details ? showData(d.Username, d.Password) : null))));
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: "SearchDiv" },
            react_1.default.createElement("input", { type: "search", name: "search", id: "search", placeholder: "Search" }),
            react_1.default.createElement("button", { style: buttonCss, className: "SearchButton", onMouseOver: () => setButtonColor("#2ddc2d"), onMouseOut: () => setButtonColor("green") }, "Search")),
        react_1.default.createElement(Styles_1.Title, null,
            "Hello ",
            (Header_1.authenticate.length > 0) ? Header_1.authenticate : currentUser,
            "!"),
        react_1.default.createElement("div", { className: "UserData" },
            react_1.default.createElement(Styles_1.Subtitle, null, "Frequently Used Sites"),
            react_1.default.createElement("div", { className: "Sites" },
                mappings,
                react_1.default.createElement("div", { className: "GridItem", id: "service-button" },
                    react_1.default.createElement("p", { className: "Icon", id: "NewService", onClick: showAddPopup }, "+"),
                    react_1.default.createElement("p", { className: "Service" }, "Add Service"))),
            (addPopup) ? addingPopup : null,
            (editPopup) ? changePopup : null)));
};
exports.VaultMain = VaultMain;
const MyAccount = () => {
    return (react_1.default.createElement("div", null));
};
exports.MyAccount = MyAccount;
