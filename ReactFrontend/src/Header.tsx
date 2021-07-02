import React from "react";
import { Header, Ul, NavList, NavLinks, LoginNav, LogoDiv, Nav1, 
    Subtitle, Title } from "./Styles";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { VaultHome, VaultMain} from "./Vault";
import request from "superagent";
import https from 'https';
import axios from 'axios';
// determine the login session
export var authenticate: string | boolean = "";
export const VaultLogin: React.FC = () => {
    var [login, setLogin] = React.useState<string | boolean>("");
    var [,setState] = React.useState<any>();
    var [user, setUser] = React.useState<string>("");
    var [passwd, setPasswd] = React.useState<string>("");
    // this is used to send the account credentials
    var auth = {username: user, password: passwd}
    const sendAuth = () => {
        var httpsAgent = new https.Agent({rejectUnauthorized: false})
        setLogin(false);
        axios.post("https://192.168.1.103:9900/vaultuser", auth, 
        {httpsAgent, headers: {"Content-Type": "application/json"}})
        .then(response => {
            let result = response.data;
            console.log(result);
            if (result.Message == "Success") {
                setLogin(true);
            } 
            if (result.Message == "Failed") { 
                setLogin(false);
            }
        })
        .catch(err => console.log(err));
    }
    if (login == "") {
        return (
        <div>
        <Subtitle>VaultPass Login</Subtitle>
        <div className="TheForm">
            <form id="login">
                <label htmlFor="username" id="username-label">Username</label>
                <input type="text" name="username" id="username" value={user}
                onChange={(e) => setUser(e.target.value)} />
                <label htmlFor="password" id="password-label">Password</label>
                <input type="password" name="password" id="password" value={passwd}
                onChange={(e) => setPasswd(e.target.value)} />
            </form>
            <button id="submit-login" onClick={sendAuth}>Login</button>
        </div>
        </div>
        )
    }
    return login ? <AppHeader/> : <NotAuthorized/>
}
export const TheHeader: React.FC = () => { 
    return <VaultLogin/>;
}
export const AppHeader: React.FC = () => {
    return (
        <div>
        <HashRouter>
            <div>
            <Header>
                <nav>
                <Ul>
                <Nav1>
                    <NavList>
                        <NavLinks to="/"><LogoDiv></LogoDiv></NavLinks>
                    </NavList>
                </Nav1>
                <LoginNav>
                    <NavList>
                        <NavLinks to="/account">Account</NavLinks>
                    </NavList>
                    <NavList>
                        <NavLinks to="/logout">Logout</NavLinks>
                    </NavList>
                </LoginNav>
                </Ul>
                </nav>
            </Header>
            </div>
            <Switch>
                <Route path="/"><VaultMain/></Route>
                <Route path="/account"></Route>
                <Route path="/logout"><VaultLogin/></Route>
            </Switch>
        </HashRouter>
        </div>
    )
}
const NotAuthorized: React.FC = () => {
    return (
        <div>
        <HashRouter>
            <div>
            <Header>
                <nav>
                <Ul>
                <Nav1></Nav1>
                <LoginNav>
                    <NavList>
                        <NavLinks to="/Login">Login</NavLinks>
                    </NavList>
                    <NavList>
                        <NavLinks to="/signup">Register</NavLinks>
                    </NavList>
                </LoginNav>
                </Ul>
                </nav>
            </Header>
            </div>
            <Switch>
                <Route path="/login"><VaultLogin/></Route>
                <Route path="/signup"><Title>Signup</Title></Route>
            </Switch>
        </HashRouter>
        <Title>You are not authorized</Title>
        <Subtitle>Either login with the right credentials or create a new account</Subtitle>
        </div>
    )
}