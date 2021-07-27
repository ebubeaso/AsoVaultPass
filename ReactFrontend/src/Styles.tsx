import styled, {css, keyframes} from "styled-components";
import { Link } from "react-router-dom";

// generalized styling variables
const fontStyle = css`font-family: Helvetica`;
const flexDisplay = css`display: flex`;
const centerAlign = css`text-align: center;`;
// const mainTextColor = css`color: darkcyan`;
const navColor = css`color: whitesmoke`;
const links = css`font-size: 26pt; text-decoration: none; ${navColor};
    @media only screen and (min-width: 300px) and (max-width: 600px) {
        font-size: 16pt;
    }   `;
// Specific styled component variables
export const Title = styled.h1`
    font-size: 44pt;
    ${fontStyle};
    ${centerAlign};
    @media only screen and (max-width: 800px) {
        font-size: 30pt;
      }   `;
export const Subtitle = styled.h2`
    font-size: 32pt; ${fontStyle}; ${centerAlign};
    @media only screen and (min-width: 300px) and (max-width: 600px) {
        font-size: 22pt;
      }   `;
export const IntroParagraph = styled.p`
    font-size: 18pt;
    ${fontStyle};
    ${centerAlign};
    margin: 1% 15%;
    @media only screen and (min-width: 300px) and (max-width: 600px) {
        font-size: 12pt;
      }   
`;
export const Ul = styled.ul`${flexDisplay};`;
export const Header = styled.header`
    ${flexDisplay};
    padding: 1%;
    flex-direction: column;
    margin-left: -10px;
    background: linear-gradient(to right, darkgray, darkcyan);
    width: 100%;
    @media only screen and (min-width: 300px) and (max-width: 600px) {
        margin-right: -10px;
    }
`;
export const NavLinks = styled(Link)`
    ${links}; &:link {${links}}; &:visited {${links}};
`;
export const NavList = styled.li`
    list-style-type: none;
    margin-right: 5vw;
    margin-top: 2vw;
    ${navColor};
`;
// These are some special div setups
export const Nav1 = styled.div`
    margin-top: -2%; margin-left: 10vw;
    @media only screen and (min-width: 300px) and (max-width: 750px) {
        margin-left: 0vw;
    }
    @media only screen and (min-width: 751px) and (max-width: 1280px) {
        margin-left: 10vw;
    }
`;
export const LoginNav = styled.div`
    margin-left: 55vw; ${flexDisplay};
    @media only screen and (min-width: 300px) and (max-width: 600px) {
        margin-left: 10vw;
    }
    @media only screen and (min-width: 601px) and (max-width: 1280px) {
        margin-left: 25vw;
    }
`;
export const LogoDiv = styled.div`
    background-image: url("static/logos/AsoVaultPass.png");
    background-size: cover;
    width: 6vw;
    height: 6vw;
    cursor: pointer;
    @media only screen and (min-width: 300px) and (max-width: 600px) {
        width: 14vw; 
        height: 14vw;
        margin-top: -5%;
        margin-left: 8vw
    }
    @media only screen and (min-width: 601px) and (max-width: 1280px) {
        width: 11vw;
        height: 11vw;
    }
`;