import React from "react";
import { Header, Ul, NavList, NavLinks, LoginNav, LogoDiv, Nav1, 
    Subtitle, Title } from "./Styles";
import { HashRouter, Switch, Route, useHistory, Redirect } from "react-router-dom";
import { VaultHome, VaultMain} from "./Vault";
import request from "superagent";
import https from 'https';
import axios from 'axios';
// determine the login session
export var httpsAgent: https.Agent;
export var authenticate: string = "";

export const VaultLogin: React.FC = () => {
    var [login, setLogin] = React.useState<string | boolean>("");
    var [user, setUser] = React.useState<string>("");
    var [passwd, setPasswd] = React.useState<string>("");
    // this is used to send the account credentials
    var auth = {username: user, password: passwd}
    const sendAuth = () => {
        httpsAgent = new https.Agent({rejectUnauthorized: false})
        axios.post("https://192.168.1.103:9900/vaultuser", auth, 
        {httpsAgent, headers: {"Content-Type": "application/json"}})
        .then(response => {
            let result = response.data;
            if (result.Message == "Success") {
                setLogin(true);
                authenticate = user;
            } else {
                setLogin(false);
                alert("Sorry, you have entered incorrect credentials, please try again");
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
    return login ? <div><Redirect to="/main"/></div> : <div><Redirect to="/unauthorized"/></div>
}
export const TheHeader: React.FC = () => {
    var [session, setSession] = React.useState(false);
    React.useEffect(() => {
        // this will check every 1 second to see if you have logged in
        setInterval(() => {
            if (authenticate.length > 0) {
                setSession(true);
            }
            if (session == true) {clearInterval()}
        }, 1000)
    }, [])
    return (
        <div>
        <HashRouter>
            <div>
            <Header>
                <nav>
                <Ul>
                <Nav1>
                    <NavList>
                    {session ? <NavLinks to="/main"><LogoDiv></LogoDiv></NavLinks> : 
                    <LogoDiv></LogoDiv>}
                    </NavList>
                </Nav1>
                <LoginNav>
                    <NavList>
                        {session ? <NavLinks to="/account">Account</NavLinks> : 
                        <NavLinks to="/login">Login</NavLinks>}
                    </NavList>
                    <NavList>
                        {session ? <NavLinks to="/logout">Logout</NavLinks> : 
                        <NavLinks to="/signup">Register</NavLinks>}
                    </NavList>
                </LoginNav>
                </Ul>
                </nav>
            </Header>
            </div>
            <Switch>
                <Route exact path="/" component={VaultHome}/>
                <Route exact path="/main" component={VaultMain}/>
                <Route exact path="/login" component={VaultLogin}/>
                <Route path="/signup"><Title>Signup</Title></Route>
                <Route path="/account"/>
                <Route path="/logout" component={VaultLogin}/>
                <Route exact path="/unauthorized" component={NotAuthorized}/>
            </Switch>
        </HashRouter>
        </div>
    )
}

const NotAuthorized: React.FC =  () => {
    return (
        <div>
        <Title>You are not authorized</Title>
        <Subtitle>Either login with the right credentials or create a new account</Subtitle>
        </div>
    )
}
