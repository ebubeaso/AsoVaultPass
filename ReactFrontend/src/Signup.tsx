import React from 'react';
import { httpsAgent } from './Header';
import { Title } from './Styles';
import validator from './formValidator';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
export const Signup: React.FC = () => {
    let history = useHistory();
    var [fname, setFname] = React.useState<string>("");
    var [lname, setLname] = React.useState<string>("");
    var [registerUser, setRegisterUser] = React.useState<string>("");
    var [registerPasswd, setRegisterPasswd] = React.useState<string>("");
    var [confirmPasswd, setConfirmPasswd] = React.useState<string>("");
    var [registerEmail, setRegisterEmail] = React.useState<string>("");

    const setForm = (validate:any) => {
        // get the values from the form (initial state)
        var [inputs, setInputs] = React.useState({
            firstname: "", lastname: "", username: "", password: "", confirm: "", email: ""
        })
        const [formErrors, setFormErrors] = React.useState({
            //the initial state of the form errors
            firstname: " ", lastname: " ", username: " ", password: " ", confirm: "", email: " "
        });
        // recognizes any change in the form
        const changing = (e: any) => {
            var {name, value} = e.target; // some destructuring
            setInputs({...inputs, [name]: value}) //using spread syntax
        }
        // recognizes a form submission
        const submission = () => {
            // this will be for the form validation
            setFormErrors(validate(inputs));
            // This code below verifies that there are no form error messages
            var valid: string | boolean = "";
            var errorCount: number = 0;
            let errorList = Object.values(formErrors); // turns the object into a list
            let inputList = Object.values(inputs);
            for (let val of errorList) {
                // checks to see if Please or Password is in one of the values from formError
                // This will signify that the form is not valid and it won't send the request
                if (val.includes("Please") || val.includes("Password") || val.includes(" ")) {
                    valid = false;
                    errorCount++;
                    break;
                }
            };
            if (errorCount == 0 || inputList.includes("") == false && inputs.password == inputs.confirm) {
                if (inputs.password.length >= 8 && /[A-Z]/.test(inputs.password) && 
                /[0-9]/.test(inputs.password) && /[\! || \? || \@ || \$ || \%]/.test(inputs.password)) {
                    valid = true
                }
            };
            if (valid) {
                alert("Congrats! You have signed up successfully!");
                let request = {firstName: inputs.firstname, lastName: inputs.lastname, 
                    username: inputs.username, password: inputs.password, email: inputs.email};
                // send the data to the backend service to register
                axios.post("https://192.168.1.103:9900/newuser", request,
                {httpsAgent, headers : {"Content-Type": "application/json"}})
                .then(response => {
                    let result = response.data;
                    if (result.Message == "Success!") {
                        alert("Congrats! You have signed up successfully!");
                        history.push("/login");
                    } else {
                        alert("Sorry, that username was taken");
                    }
                }).catch(err => {
                    alert("Sorry, but we could not connect to the backend service. Try again later.");
                    console.log(err);
                });
            };
        }
        return {changing, inputs, submission, formErrors};
    }
    // using the custom hook that I made for form validation
    const {changing, inputs, submission, formErrors} = setForm(validator);

    return (
        <div>
        <Title>Signup</Title>
        <div className="TheForm">
            <form id="register">
                <br/>
                {formErrors.firstname && <p className="Invalid">{formErrors.firstname}</p>}
                <label htmlFor="first-name" className="FormLabel" id="first-name-label">First Name</label>
                <input type="text" name="firstname" className="FormInput" id="first-name" 
                value={inputs.firstname} onChange={changing} />
                
                {formErrors.lastname && <p className="Invalid">{formErrors.lastname}</p>}
                <label htmlFor="last-name" className="FormLabel" id="last-name-label">Last Name</label>
                <input type="text" name="lastname" className="FormInput" id="last-name" 
                value={inputs.lastname} onChange={changing} />

                {formErrors.email && <p className="Invalid">{formErrors.email}</p>}
                <label htmlFor="new-email" className="FormLabel" id="email-label">Email Address</label>
                <input type="text" name="email" className="FormInput" id="new-email" 
                value={inputs.email} onChange={changing} />

                {formErrors.username && <p className="Invalid">{formErrors.username}</p>}
                <label htmlFor="register-user" className="FormLabel" id="new-user-label">Username</label>
                <input type="text" name="username" className="FormInput" id="register-user" 
                value={inputs.username} onChange={changing} />

                {formErrors.password && <p className="Invalid" id="invalid-pass">{formErrors.password}</p>}
                <label htmlFor="register-pass" className="FormLabel" id="new-pass-label">Password</label>
                <input type="password" name="password" className="FormInput" id="register-pass" 
                value={inputs.password} onChange={changing} />

                {formErrors.confirm && <p className="Invalid">{formErrors.confirm}</p>}
                <label htmlFor="confirm-pass" className="FormLabel" id="confirm-label">Confirm Password</label>
                <input type="password" name="confirm" className="FormInput" id="confirm-pass" 
                value={inputs.confirm} onChange={changing} />
            </form>
            <div className="Send" id="signup">
            <button className="SubmitButton" id="submit-register" onClick={submission}>Signup!</button>
            </div>
        </div>
        </div>
    )
}