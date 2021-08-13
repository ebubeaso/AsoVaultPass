import React from 'react';
import { Subtitle, Title } from './Styles';
import { httpsAgent, authenticate } from './Header';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
export const Service: React.FC = (props: any) => {
    var history = useHistory();
    var [theData, setTheData] = React.useState<Array<any>>([]);
    var [editPopup, setEditPopup] = React.useState<boolean>(false);
    var [editUser, setEditUser] = React.useState<string>("");
    var [editPasswd, setEditPasswd] = React.useState<string>("");
    React.useEffect(() => {
        let current = window.sessionStorage.getItem("authenticated");
        axios.get(`https://192.168.1.103:5500/vault/${current}/${props.match.params.service}`, 
            {httpsAgent, headers: {"Content-Type": "application/json"}})
            .then(response => {
                let result = response.data;
                setTheData(result);
            }).catch(err => {
                console.log(err); 
                alert("Sorry, we could not connect to the resource. Try again later")
            })
    }, [])
    const editService = () => {
        let current = window.sessionStorage.getItem("authenticated");
        let request = {SessionUser: current, Username: editUser, Password: editPasswd}
        axios.put(`https://192.168.1.103:5500/vault/${current}/${props.match.params.service}`,
        request, {httpsAgent, headers: {"Content-Type": "application/json"}})
        .then(response => {
            let result = response.data;
            alert(result.Result);
            closeEditPopup();
            window.location.reload();
        }).catch(err => {
            console.log(err); 
            alert("Sorry, we could not connect to the resource. Try again later")
        })
    }    
    const deleteService = () => {
        let confirmation  = confirm("This data will be removed. Are you sure you want to continue?");
        if (confirmation) {
            let current = window.sessionStorage.getItem("authenticated");
            axios.delete(`https://192.168.1.103:5500/vault/${current}/${props.match.params.service}`, 
            {httpsAgent, headers: {"Content-Type": "application/json"}})
            .then(response => {
                let result = response.data;
                alert(result.Result);
                history.push("/main");
                window.location.reload();
            }).catch(err => {
                console.log(err); 
                alert("Sorry, we could not connect to the resource. Try again later")
            });
        }
    };
    const showEditPopup = () => {setEditPopup(true);}
    const closeEditPopup = () => {setEditPopup(false);}
    const changePopup: JSX.Element = (
        <div className="Popup">
            <div className="TheForm">
            <form id="edit-form">
                <button className="CloseButton" id="close-edit" onClick={closeEditPopup}> X </button>
                <Subtitle>Edit Credentials</Subtitle>
                <label htmlFor="edit-username" className="FormLabel" id="edit-user-label">Username</label>
                <input type="text" name="username" className="FormInput" id="edit-username" value={editUser}
                    onChange={(e) => setEditUser(e.target.value)} />
                <label htmlFor="edit-password" className="FormLabel" id="edit-pass-label">Password</label>
                <input type="password" name="password" className="FormInput" id="edit-password" 
                    value={editPasswd} onChange={(e) => setEditPasswd(e.target.value)} />
            </form>
            <div className="Send">
            <button className="SubmitButton" id="add-service" onClick={editService}>Update Info</button>
            </div>
            </div>
        </div>
    )
    return (
        <div>
        <div className="ServiceInfo">
            {theData.map((d) => (
            <div key={d["ID"]}>
                <div className="DataOptions">
                    <button className="EditButton" onClick={showEditPopup}>Edit Info</button>
                    <button className="CloseButton" id="close-details" onClick={deleteService}>Remove</button>
                </div>
                <Subtitle>Service: {d.Service}</Subtitle>
                <p className="ServiceData">Username: {d.Username}</p>
                <p className="ServiceData">Password: {d.Password}</p>
            </div>
            ))}
            <button className="SubmitButton" id="go-back" 
                onClick={() => history.push("/main")}>Back to main</button>
        </div>
        {(editPopup) ? changePopup : null}
        </div>
    )
}
export const MyAccount: React.FC = () => {
    var history = useHistory();
    var [accountData, setAccountData] = React.useState<Array<any>>([]);
    var [accountFname, setAccountFname] = React.useState<string>("");
    var [accountLname, setAccountLname] = React.useState<string>("");
    var [accountEmail, setAccountEmail] = React.useState<string>("");
    React.useEffect(() => {
        let current = window.sessionStorage.getItem("authenticated");
        axios.get(`https://192.168.1.103:9900/account/${current}`,
        {httpsAgent, headers: {"Content-Type": "application/json"}})
        .then(response => {
            let result = [response.data];
            setAccountData(result);
        }).catch(err => {
            console.log(err); 
            alert("Sorry, we could not connect to the resource. Try again later")
        });
    }, []);
    const updateInfo = (user: string, passwd: string) => {
        let request = {firstName: accountFname, lastName: accountLname,
        username: user, password: passwd, email: accountEmail}
        axios.put(`https://192.168.1.103:9900/account`, request,
        {httpsAgent, headers: {"Content-Type": "application/json"}})
        .then(response => {
            let result = response.data;
            alert(result.Message);
            window.location.reload();
        }).catch(err => {
            console.log(err); 
            alert("Sorry, we could not connect to the resource. Try again later")
        });
    }
    return (
        <div>
        <Title>My Account</Title>
        {accountData.map( (account) => (
            <div key={account["_id"]}>
            <div className="TheForm" id="my-account">
            <button className="SubmitButton" id="go-back2" 
                onClick={() => history.push("/main")}>Back to main</button>
                <form id="account-form">
                    <label htmlFor="account-fname" className="FormLabel" id="acc-fname-label">First Name</label>
                    <input type="text" name="account-fname" className="FormInput" id="account-fname" 
                    placeholder={account.firstName} onChange={(e) => {setAccountFname(e.target.value)}} />
                    <label htmlFor="account-lname" className="FormLabel" id="acc-lname-label">Last Name</label>
                    <input type="text" name="account-username" className="FormInput" id="account-lname" 
                    placeholder={account.lastName} onChange={(e) => {setAccountLname(e.target.value)}} />
                    <label htmlFor="account-email" className="FormLabel" id="acc-email-label">Email Address</label>
                    <input type="text" name="account-email" className="FormInput" id="account-email" 
                    placeholder={account.email} onChange={(e) => {setAccountEmail(e.target.value)}} />
                </form>
                <div className="Send" id="modify-account">
                <button className="SubmitButton" onClick={() => updateInfo(account.username, account.password)}>Update Info!</button>
                </div>
            </div>
            </div>))}
        </div>
    )
}