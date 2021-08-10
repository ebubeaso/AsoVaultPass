"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyAccount = exports.Service = void 0;
const react_1 = __importDefault(require("react"));
const Styles_1 = require("./Styles");
const Header_1 = require("./Header");
const axios_1 = __importDefault(require("axios"));
const Vault_1 = require("./Vault");
const react_router_dom_1 = require("react-router-dom");
const Service = (props) => {
    var history = react_router_dom_1.useHistory();
    var [theData, setTheData] = react_1.default.useState([]);
    var [editPopup, setEditPopup] = react_1.default.useState(false);
    var [editUser, setEditUser] = react_1.default.useState("");
    var [editPasswd, setEditPasswd] = react_1.default.useState("");
    react_1.default.useEffect(() => {
        if (Vault_1.currentUser == null) {
            axios_1.default.get(`https://192.168.1.103:5500/vault/${Header_1.authenticate}/${props.match.params.service}`, { httpsAgent: Header_1.httpsAgent, headers: { "Content-Type": "application/json" } })
                .then(response => {
                let result = response.data;
                setTheData(result);
            }).catch(err => {
                console.log(err);
                alert("Sorry, we could not connect to the resource. Try again later");
            });
        }
        else {
            let current = window.sessionStorage.getItem("authenticated");
            axios_1.default.get(`https://192.168.1.103:5500/vault/${current}/${props.match.params.service}`, { httpsAgent: Header_1.httpsAgent, headers: { "Content-Type": "application/json" } })
                .then(response => {
                let result = response.data;
                setTheData(result);
            }).catch(err => {
                console.log(err);
                alert("Sorry, we could not connect to the resource. Try again later");
            });
        }
    }, []);
    const editService = () => {
        let request = { SessionUser: Vault_1.currentUser, Username: editUser, Password: editPasswd };
        let current = window.sessionStorage.getItem("authenticated");
        axios_1.default.put(`https://192.168.1.103:5500/vault/${current}/${props.match.params.service}`, request, { httpsAgent: Header_1.httpsAgent, headers: { "Content-Type": "application/json" } })
            .then(response => {
            let result = response.data;
            alert(result.Result);
            closeEditPopup();
            window.location.reload();
        }).catch(err => {
            console.log(err);
            alert("Sorry, we could not connect to the resource. Try again later");
        });
    };
    const deleteService = () => {
        let confirmation = confirm("This data will be removed. Are you sure you want to continue?");
        if (confirmation) {
            let current = window.sessionStorage.getItem("authenticated");
            axios_1.default.delete(`https://192.168.1.103:5500/vault/${current}/${props.match.params.service}`, { httpsAgent: Header_1.httpsAgent, headers: { "Content-Type": "application/json" } })
                .then(response => {
                let result = response.data;
                alert(result.Result);
                history.push("/main");
                window.location.reload();
            }).catch(err => {
                console.log(err);
                alert("Sorry, we could not connect to the resource. Try again later");
            });
        }
    };
    const showEditPopup = () => { setEditPopup(true); };
    const closeEditPopup = () => { setEditPopup(false); };
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
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: "ServiceInfo" },
            theData.map((d) => (react_1.default.createElement("div", { key: d["ID"] },
                react_1.default.createElement("div", { className: "DataOptions" },
                    react_1.default.createElement("button", { className: "EditButton", onClick: showEditPopup }, "Edit Info"),
                    react_1.default.createElement("button", { className: "CloseButton", id: "close-details", onClick: deleteService }, "Remove")),
                react_1.default.createElement(Styles_1.Subtitle, null,
                    "Service: ",
                    d.Service),
                react_1.default.createElement("p", { className: "ServiceData" },
                    "Username: ",
                    d.Username),
                react_1.default.createElement("p", { className: "ServiceData" },
                    "Password: ",
                    d.Password)))),
            react_1.default.createElement("button", { className: "SubmitButton", id: "go-back", onClick: () => history.push("/main") }, "Back to main")),
        (editPopup) ? changePopup : null));
};
exports.Service = Service;
const MyAccount = () => {
    return (react_1.default.createElement("div", null));
};
exports.MyAccount = MyAccount;
