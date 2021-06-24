import styled, {css, keyframes} from "styled-components";
import { Link } from "react-router-dom";

// generalized styling variables
const fontStyle = css`font-family: Helvetica`;
const flexDisplay = css`display: flex`;
const centerAlign = css`text-align: center;`;
const mainTitleColor = css`color: maroon`;
const navColor = css`color: whitesmoke`;
const links = css`font-size: 26pt; text-decoration: none; ${navColor};`;
// Specific styled component variables
export const Title = styled.h1`
    font-size: 44pt;
    ${fontStyle};
    ${centerAlign};
    ${mainTitleColor};`;
export const Subtitle = styled.h2`
    font-size: 32pt; ${fontStyle}; ${centerAlign}; ${mainTitleColor};`;
export const IntroParagraph = styled.p`
    font-size: 18pt;
    ${fontStyle};
    ${centerAlign};
    ${mainTitleColor};
    margin: 1% 15%;
`;
export const Ul = styled.ul`${flexDisplay};`;
export const Header = styled.header`
    ${flexDisplay};
    padding: 1%;
    flex-direction: column;
    margin-left: -10px;
    background: linear-gradient(to right, darkgray, darkcyan);
    width: 100%;
`;
export const NavLinks = styled(Link)`
    ${links}; &:link {${links}}; &:visited {${links}};
`;
export const NavList = styled.li`
    list-style-type: none;
    margin-right: 2vw;
    margin-top: 2vw;
    ${navColor};
`;
// These are some special div setups
export const Nav1 = styled.div`margin-top: -2%; margin-left: 10vw;`;
export const LoginNav = styled.div`margin-left: 60vw; ${flexDisplay};`;
export const LogoDiv = styled.div`
    background-image: url("./src/AsoVaultPass.png");
    background-size: cover;
    width: 6vw;
    height: 6vw;
`;