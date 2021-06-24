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
        react_1.default.createElement("div", { className: "SearchDiv" },
            react_1.default.createElement("input", { type: "search", name: "search", id: "search", placeholder: "Search" })),
        react_1.default.createElement(Styles_1.Title, null, "My Sites"),
        react_1.default.createElement("div", { className: "SiteGrid" })));
};
exports.VaultHome = VaultHome;
