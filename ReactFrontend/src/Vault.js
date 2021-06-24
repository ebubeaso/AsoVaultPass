"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaultHome = void 0;
const react_1 = __importDefault(require("react"));
const Styles_1 = require("./Styles");
const VaultHome = () => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Styles_1.Title, null, "Aso Vault Pass"),
        react_1.default.createElement(Styles_1.Subtitle, null, "Your secrets are safe with me"),
        react_1.default.createElement(Styles_1.IntroParagraph, null, "Have a hard time remembering passwords? This custom password manager tool will help you with just that! This app will save your credentials to different sites so that it will make it easier for you to remember your username and password to the different sites and services that you use.")));
};
exports.VaultHome = VaultHome;
