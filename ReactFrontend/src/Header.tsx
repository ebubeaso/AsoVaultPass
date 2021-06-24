import React from "react";
import { Header, Ul, NavList, NavLinks, LoginNav, LogoDiv } from "./Styles";
import { HashRouter, Switch, Link, Route } from "react-router-dom";
import { VaultHome } from "./Vault";

export const TheHeader: React.FC = () => {
    return (
        <div>
        <HashRouter>
            <div>
            <Header>
            <nav>
                <Ul>
                <div id="nav1">
                    <NavList><LogoDiv></LogoDiv></NavList>
                    <NavList><Link to="/">Home</Link></NavList>
                    <NavList><Link to="/services">Services</Link></NavList>
                </div>
                <LoginNav>
                    <NavList><Link to="/login">Login</Link></NavList>
                    <NavList><Link to="/signup">Register</Link></NavList>
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