import React from "react";
import { Header, Ul, NavList, NavLinks, LoginNav, LogoDiv, Nav1, 
    Subtitle, Title, IntroParagraph } from "./Styles";
import { HashRouter, Switch, Route, Redirect, useHistory } from "react-router-dom";
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
    var history = useHistory();
    var [login, setLogin] = React.useState<string | boolean>("");
    var [user, setUser] = React.useState<string>("");
    var [passwd, setPasswd] = React.useState<string>("");
    var [forgot, setForgot] = React.useState<boolean>(false);
    var [recoverEmail, setRecoverEmail] = React.useState<string>("");
    var [enterCode, setEnterCode] = React.useState<boolean>(false);
    var [code, setCode] = React.useState<string>("");
    // this is used to send the account credentials
    var auth = {username: user, password: passwd}
    const sendAuth = () => {
        httpsAgent = new https.Agent({rejectUnauthorized: false})
        axios.post("https://192.168.1.103:9900/vaultuser", auth, 
        {httpsAgent, headers: {"Content-Type": "application/json"}})
        .then(response => {
            let result = response.data;
            if (result.Message == "Success") {
                setLogin(true); authenticate = user;
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
    const closeForgotPopup = () => setForgot(false);
    const showForgotPopup = () => setForgot(true);
    const sendEmail = () => {
        let request = {recipients: recoverEmail, code: Math.floor(Math.random() * (999999 - 100000)+100000)};
        let currentUser = window.sessionStorage.getItem("authenticated");
        axios.post(`https://192.168.1.103:5500/recover/${currentUser}`, request,
        {httpsAgent, headers: {"Content-Type": "application/json"}})
        .then(response => {
            let result = response.data;
            result.Message == "Success" ? setEnterCode(true) : alert(result.Result);
        }).catch(err => {
            alert("Sorry, but we could not connect to the backend service. Try again later.");
            console.log(err);
        })
    };
    const sendCode = () => {
        let request = {recoveryCode: code};
        let currentUser = window.sessionStorage.getItem("authenticated");
        axios.put(`https://192.168.1.103:5500/recover/${currentUser}`, request,
        {httpsAgent, headers: {"Content-Type": "application/json"}})
        .then(response => {
            let result = response.data;
            if (result.Message.includes("invalid")) {
                alert(result.Message);
            } else {
                alert(result.Message); history.push("/password/update");
            }
        }).catch(err => {
            alert("Sorry, but we could not connect to the backend service. Try again later.");
            console.log(err);
        })
    }
    const forgotPopup = (enterCode) ? 
    (
        <div className="Popup">
        <div className="TheForm" id="recovery">
            <form id="enter-code">
            <button className="CloseButton" onClick={closeForgotPopup}> X </button>
                <Subtitle>Recovery Email Sent!</Subtitle> 
                <Subtitle>Check your email for the recovery code</Subtitle>
                <label htmlFor="email-recover" className="FormLabel" id="forgot-label">Recovery Code</label>
                <input type="text" name="forgot" className="FormInput" id="forgot-password" value={code}
                    onChange={(e) => setCode(e.target.value)} />
            </form>
            <div className="Send">
            <button className="SubmitButton" id="the-code" onClick={sendCode}>Submit</button>
            </div>
        </div>
        </div>
    ) : 
    (
        <div className="Popup">
        <div className="TheForm" id="forgot">
            <form id="forgot-form">
                <button className="CloseButton" id="close-forgot" onClick={closeForgotPopup}> X </button>
                <label htmlFor="email-recover" className="FormLabel" id="forgot-label">Enter your Email Address:</label>
                <input type="text" name="forgot" className="FormInput" id="forgot-password" value={recoverEmail}
                    onChange={(e) => setRecoverEmail(e.target.value)} />
            </form>
            <div className="Send">
            <button className="SubmitButton" id="send-email" onClick={sendEmail}>Submit</button>
            </div>
        </div>
        </div>
    )
    if (login == "") {
        return (
        <div>
        <Subtitle>VaultPass Login</Subtitle>
        <div className="TheForm" id="form-login">
            <form id="login">
                <label htmlFor="username" className="FormLabel" id="username-label">Username</label>
                <input type="text" name="username" className="FormInput" id="username" value={user}
                onChange={(e) => setUser(e.target.value)} />
                <label htmlFor="password" className="FormLabel" id="password-label">Password</label>
                <input type="password" name="password" className="FormInput" id="password" value={passwd}
                onChange={(e) => setPasswd(e.target.value)} />
            </form>
            <div className="Login">
                <button className="SubmitButton" id="submit-login" onClick={sendAuth}>Login</button>
                <button className="SubmitButton" id="forgot" onClick={showForgotPopup}>Forgot Password</button>
            </div>
        </div>{(forgot) ? forgotPopup: null}</div>
        )
    }
    return login ? <Redirect to="/main" /> : null;
}
export const TheHeader: React.FC = () => {
    var [session, setSession] = React.useState(false);
    React.useEffect(() => {
        // this will check every 1 second to see if you have logged in
        setInterval(() => {
            if (window.sessionStorage.getItem("authenticated") != null) { setSession(true); }
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
                <Route exact path="/password/update" component={UpdatePassword}/>
                <Route path="/service/:service" component={Service} />
            </Switch>
        </HashRouter>
        </div>
    )
}
const UpdatePassword: React.FC = () => {
    var  theHistory = useHistory();
    var [accountUser, setAccountUser] = React.useState<string>("");
    var [password, setPassword] = React.useState<string>("");
    var [confirm, setConfirm] = React.useState<string>("");
    var [userError, setUserError] = React.useState<boolean>(false);
    var [passwdError, setPasswdError] = React.useState<boolean>(false);
    var [confirmError, setConfirmError] = React.useState<boolean>(false);
    const newPassword = () => {
        if (accountUser.length < 1) {setUserError(true)} else {setUserError(false)};
        if (password == confirm) {setConfirmError(false)} else {setConfirmError(true)}
        if (password.length >= 8 && /[A-Z]/.test(password) && 
        /[0-9]/.test(password) && /[\! || \? || \@ || \$ || \%]/.test(password)) {
            if (password == confirm) {
                setPasswdError(false);
                setConfirmError(false);
                let request = {user: accountUser, passwd: password};
                axios.put(`https://192.168.1.103:9900/recovery`, request,
                {httpsAgent, headers: {"Content-Type": "application/json"}})
                .then(response => {
                    let result = response.data;
                    if (result.Message.includes("Sorry")) {
                        alert(result.Message); window.location.reload();
                    } else {
                        if (window.sessionStorage.getItem("authenticated") != null) {
                            window.sessionStorage.removeItem("authenticated");
                            alert(result.Message);
                            theHistory.push("/login");
                            window.location.reload();
                        } else {
                            alert(result.Message);
                            theHistory.push("/login");
                        }
                        
                    }
                }).catch(err => {
                    alert("Sorry, but we could not connect to the backend service. Try again later.");
                    console.log(err);
                })
            } else { setConfirmError(true); }
        } else { setPasswdError(true); }
    }
    let badUsername = "* Please enter in your account username"
    let badPassword = " * Invalid Password: It needs to be larger than 8 characters,\n";
    badPassword += "it must have at least one number in it and at least one special\n";
    badPassword += "character (e.g. !, ?, @, $, %)";
    let badConfirm = "* Passwords do not match";
    return (
        <div>
            <Subtitle>Update Your Account Password</Subtitle>
            <div className="TheForm" id="update-password">
            <form id="update-password-form">
                {(userError) ? <p className="Invalid">{badUsername}</p> : null}
                <label htmlFor="your-username" className="FormLabel" id="your-username-label">
                    Your Account Username
                </label>
                <input type="text" name="your-username" className="FormInput" id="your-username"
                    value={accountUser} onChange={(e) => setAccountUser(e.target.value)}/>
                {(passwdError) ? <p className="Invalid">{badPassword}</p> : null}
                <label htmlFor="set-password" className="FormLabel" id="set-password-label">
                    New Password
                </label>
                <input type="password" name="password" className="FormInput" id="set-password" 
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                {(confirmError) ? <p className="Invalid">{badConfirm}</p> : null}
                <label htmlFor="set-confirmation" className="FormLabel" id="set-confirmation-label">
                    Confirm Password
                </label>
                <input type="password" name="password" className="FormInput" id="set-confirm" 
                    value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </form>
            <div className="Login">
                <button className="SubmitButton" id="submit-passwd" onClick={newPassword}>Submit</button>
            </div>
        </div>
        </div>
    )
}
