import React from 'react';
import { httpsAgent } from './Header';
import { Title } from './Styles';
export const Signup: React.FC = () => {
    var [fname, setFname] = React.useState<string>("");
    var [lname, setLname] = React.useState<string>("");
    var [registerUser, setRegisterUser] = React.useState<string>("");
    var [registerPasswd, setRegisterPasswd] = React.useState<string>("");
    var [confirmPasswd, setConfirmPasswd] = React.useState<string>("");
    var [registerEmail, setRegisterEmail] = React.useState<string>("");
    // these states are for validation
    var [validFname, setValidFname] = React.useState<string | boolean>("");
    var [validLname, setValidLname] = React.useState<string | boolean>("");
    var [validUser, setValidUser] = React.useState<string | boolean>("");
    var [validPasswd, setvalidPasswd] = React.useState<string | boolean>("");
    var [validConfirm, setValidConfirm] = React.useState<string | boolean>("");
    var [validEmail, setValidEmail] = React.useState<string | boolean>("");
    // the element to show when you put an invalid password
    var inValidPassword: JSX.Element = (
        <div className="InvalidPasswd">
            <p className="Invalid">Invalid Password</p>
            <p className="Invalid">Your password must match the following:</p>
            <p className="Invalid">Must be at least 8 characters long</p>
            <p className="Invalid">Must be have at least one capital letter and number</p>
            <p className="Invalid">Must contain a special character (e.g. ! ? $ @)</p>
        </div>
    )
    const register = () => {
        let request = {firstName: fname, lastName: lname, username: registerUser,
        password: registerPasswd, email: registerEmail}
    }
    return (
        <div>
        <Title>Signup</Title>
        <div className="TheForm">
            <form id="register">
                <br/>
                {validFname === true || validFname == "" ? 
                null : <p className="Invalid">Please Enter Your First Name</p>}
                <label htmlFor="first-name" className="FormLabel" id="first-name-label">First Name</label>
                <input type="text" name="firstname" className="FormInput" id="first-name" 
                value={fname} onChange={(e) => setFname(e.target.value)} />
                
                {validLname === true || validLname == "" ? 
                null : <p className="Invalid">Please Enter Your Last Name</p>}
                <label htmlFor="last-name" className="FormLabel" id="last-name-label">Last Name</label>
                <input type="text" name="lastname" className="FormInput" id="last-name" 
                value={lname} onChange={(e) => setLname(e.target.value)} />

                {validEmail ===  true || validEmail == "" ? 
                null : <p className="Invalid">Please Enter a Valid Email</p>}
                <label htmlFor="new-email" className="FormLabel" id="email-label">Email Address</label>
                <input type="text" name="email" className="FormInput" id="new-email" 
                value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />

                {validUser === true || validUser == "" ? 
                null : <p className="Invalid">Please Enter A Username</p>}
                <label htmlFor="register-user" className="FormLabel" id="new-user-label">Username</label>
                <input type="text" name="username" className="FormInput" id="register-user" 
                value={registerUser} onChange={(e) => setRegisterUser(e.target.value)} />

                {validPasswd === true || validPasswd == "" ? null : inValidPassword}
                <label htmlFor="register-pass" className="FormLabel" id="new-pass-label">Password</label>
                <input type="password" name="password" className="FormInput" id="register-pass" 
                value={registerPasswd} onChange={(e) => setRegisterPasswd(e.target.value)} />

                {validConfirm === true || validConfirm == "" ? null : <p className="Invalid">Passwords do Not Match</p>}
                <label htmlFor="confirm-pass" className="FormLabel" id="confirm-label">Confirm Password</label>
                <input type="password" name="password" className="FormInput" id="confirm-pass" 
                value={confirmPasswd} onChange={(e) => setConfirmPasswd(e.target.value)} />
            </form>
            <button className="SubmitButton" id="submit-login" onClick={register}>Signup!</button>
        </div>
        </div>
    )
}