"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoDiv = exports.LoginNav = exports.Nav1 = exports.NavList = exports.NavLinks = exports.Header = exports.Ul = exports.IntroParagraph = exports.Subtitle = exports.Title = void 0;
const styled_components_1 = __importStar(require("styled-components"));
const react_router_dom_1 = require("react-router-dom");
// generalized styling variables
const fontStyle = styled_components_1.css `font-family: Helvetica`;
const flexDisplay = styled_components_1.css `display: flex`;
const centerAlign = styled_components_1.css `text-align: center;`;
const mainTitleColor = styled_components_1.css `color: maroon`;
const navColor = styled_components_1.css `color: whitesmoke`;
const links = styled_components_1.css `font-size: 26pt; text-decoration: none; ${navColor};`;
// Specific styled component variables
exports.Title = styled_components_1.default.h1 `
    font-size: 44pt;
    ${fontStyle};
    ${centerAlign};
    ${mainTitleColor};`;
exports.Subtitle = styled_components_1.default.h2 `
    font-size: 32pt; ${fontStyle}; ${centerAlign}; ${mainTitleColor};`;
exports.IntroParagraph = styled_components_1.default.p `
    font-size: 18pt;
    ${fontStyle};
    ${centerAlign};
    ${mainTitleColor};
    margin: 1% 15%;
`;
exports.Ul = styled_components_1.default.ul `${flexDisplay};`;
exports.Header = styled_components_1.default.header `
    ${flexDisplay};
    padding: 1%;
    flex-direction: column;
    margin-left: -10px;
    background: linear-gradient(to right, darkgray, darkcyan);
    width: 100%;
`;
exports.NavLinks = styled_components_1.default(react_router_dom_1.Link) `
    ${links}; &:link {${links}}; &:visited {${links}};
`;
exports.NavList = styled_components_1.default.li `
    list-style-type: none;
    margin-right: 2vw;
    margin-top: 2vw;
    ${navColor};
`;
// These are some special div setups
exports.Nav1 = styled_components_1.default.div `margin-top: -2%; margin-left: 10vw;`;
exports.LoginNav = styled_components_1.default.div `margin-left: 60vw; ${flexDisplay};`;
exports.LogoDiv = styled_components_1.default.div `
    background-image: url("./src/AsoVaultPass.png");
    background-size: cover;
    width: 6vw;
    height: 6vw;
`;