import React from "react";
import { Header, Ul, NavList, NavLinks, LoginNav, LogoDiv, Nav1, 
    Subtitle, Title } from "./Styles";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { VaultHome, VaultMain} from "./Vault";
import { Signup } from "./Signup";
import request from "superagent";
import https from 'https';
import axios from 'axios';
import { Service, MyAccount } from "./Services";
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
                /* 
                We want to save the user's username in the session so that when we
                refresh the page after updating some data, the user can still remain
                logged into the session 
                */
                window.sessionStorage.setItem("authenticated", authenticate);
            } 
            if (result.Message != "Success") {
                setLogin(false);
                alert("Sorry, you have entered incorrect credentials, please try again");
            }
        })
        .catch(err => {
            alert("Sorry, but we could not connect to the backend service. Try again later.");
            console.log(err);
        });
    }
    if (login == "") {
        return (
        <div>
        <Subtitle>VaultPass Login</Subtitle>
        <div className="TheForm">
            <form id="login">
                <label htmlFor="username" className="FormLabel" id="username-label">Username</label>
                <input type="text" name="username" className="FormInput" id="username" value={user}
                onChange={(e) => setUser(e.target.value)} />
                <label htmlFor="password" className="FormLabel" id="password-label">Password</label>
                <input type="password" name="password" className="FormInput" id="password" value={passwd}
                onChange={(e) => setPasswd(e.target.value)} />
            </form>
            <button className="SubmitButton" id="submit-login" onClick={sendAuth}>Login</button>
        </div>
        </div>
        )
    }
    return login ? <Redirect to="/main" /> : <Redirect to="/unauthorized" />
}
export const TheHeader: React.FC = () => {
    var [session, setSession] = React.useState(false);
    React.useEffect(() => {
        // this will check every 1 second to see if you have logged in
        setInterval(() => {
            if (window.sessionStorage.getItem("authenticated") != null) {
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
                        {(window.sessionStorage.getItem("authenticated") != null || session == true ) ? 
                        <NavLinks to="/main"><LogoDiv></LogoDiv></NavLinks> : <LogoDiv></LogoDiv>}
                    </NavList>
                </Nav1>
                <LoginNav>
                    <NavList>
                        {(window.sessionStorage.getItem("authenticated") != null || session == true) ? 
                        <NavLinks to="/account">Account</NavLinks> : <NavLinks to="/login">Login</NavLinks>}
                    </NavList>
                    <NavList>
                        {(window.sessionStorage.getItem("authenticated") != null ||session == true ) ? 
                        <NavLinks to="/logout" onClick={() => {
                            alert("You have logged out"); window.sessionStorage.removeItem("authenticated"); 
                            setSession(false);}}>Logout</NavLinks> : <NavLinks to="/signup">Register</NavLinks>}
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
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/account" component={MyAccount}/>
                <Route exact path="/logout" component={VaultHome}/>
                <Route exact path="/unauthorized" component={NotAuthorized}/>
                <Route path="/service/:service" component={Service} />
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
