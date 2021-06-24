import React from "react";
import { Header, Ul, NavList, NavLinks, LoginNav, LogoDiv, Nav1 } from "./Styles";
import { HashRouter, Switch, Route } from "react-router-dom";
import { VaultHome } from "./Vault";

export const TheHeader: React.FC = () => {
    return (
        <div>
        <HashRouter>
            <div>
            <Header>
            <nav>
                <Ul>
                <Nav1>
                    <NavList><LogoDiv></LogoDiv></NavList>
                </Nav1>
                <LoginNav>
                    <NavList><NavLinks to="/login">Login</NavLinks></NavList>
                    <NavList><NavLinks to="/signup">Register</NavLinks></NavList>
                </LoginNav>
                </Ul>
            </nav>
            </Header>
            </div>
            <Switch>
                <Route exact path="/"><VaultHome/></Route>
                <Route path="/services"></Route>
                <Route path="/login"></Route>
                <Route path="/signup"></Route>
            </Switch>
        </HashRouter>
        </div>
    )
}