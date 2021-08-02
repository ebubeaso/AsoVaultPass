import React from 'react';
import { Title, Subtitle, IntroParagraph } from './Styles';
import { authenticate, httpsAgent } from './Header';
import axios from 'axios';
var currentUser = window.sessionStorage.getItem("authenticated");
export const VaultHome: React.FC = () => {
    return (
        <div>
            <Title>Aso VaultPass</Title>
            <IntroParagraph>
                Having a hard time with remembering your passwords? No worries!
                This web app serves as a password vault to store your account info 
                and have it readily available for you to access your favorite sites.
            </IntroParagraph>
            <IntroParagraph>
                Once you make an account and login, you will have the option to add, 
                manage, view and delete your passwords. Click the "+" button to add 
                a new password. You can also click each box that represents each service
                that you have currently saved in this environment. Once you click on the box,
                you can then edit your saved information or delete it from the password vault.
            </IntroParagraph>
            <IntroParagraph>
                If you haven't made an account already, click on the "Register" button to 
                create an account. If you already have an account, login and start using the 
                password manager today!
            </IntroParagraph>
        </div>
    )
}
export const VaultMain: React.FC = () => {
    var [buttonColor, setButtonColor] = React.useState<string>("green");
    var [appData, setAppData] = React.useState<Array<any>>([]);
    var [details, setDetails] = React.useState<boolean>(false);
    var [newUser, setNewUser] = React.useState<string>("");
    var [newPasswd, setNewPasswd] = React.useState<string>("");
    var [newService, setNewService] = React.useState<string>("");
    var [editUser, setEditUser] = React.useState<string>("");
    var [editPasswd, setEditPasswd] = React.useState<string>("");
    var [addPopup, setAddPopup] = React.useState<boolean>(false);
    var [editPopup, setEditPopup] = React.useState<boolean>(false);
    let buttonCss: React.CSSProperties = {backgroundColor: buttonColor};
    React.useEffect(() => {
        if (authenticate.length > 0) { 
            axios.get(`https://192.168.1.103:5500/vault/${authenticate}`, 
            {httpsAgent, headers: {"Content-Type": "application/json"}})
            .then(response => {
                let result = response.data;
                setAppData(result);
            }).catch(err => {
                console.log(err); 
                alert("Sorry, we could not connect to the resource. Try again later")
            }) 
        } else {
            axios.get(`https://192.168.1.103:5500/vault/${currentUser}`, 
            {httpsAgent, headers: {"Content-Type": "application/json"}})
            .then(response => {
                let result = response.data;
                setAppData(result);
            }).catch(err => {
                console.log(err); 
                alert("Sorry, we could not connect to the resource. Try again later")
            })
        }
    }, [])
    // These functions are used to display or hide the popup screen that adds a new service.
    const showAddPopup = () => {setAddPopup(true);}
    const closeAddPopup = () => {setAddPopup(false);}
    // These functions are used to display or hide the popup screen that edits information.
    const showEditPopup = () => {setEditPopup(true);}
    const closeEditPopup = () => {setEditPopup(false);}
    const showDetails = () => {setDetails(true)};
    // this function shows the details of the account
    const showData = (user: any, passwd: any): JSX.Element => {
        const TheDetails: JSX.Element =  (
            <div>
                <div className="DataOptions">
                <button className="EditButton" onClick={showEditPopup}>Edit Info</button>
                <button className="CloseButton" id="close-details" onClick={closeDetails}> X </button>
                </div>
                <p className="Service">Username: {user}</p>
                <p className="Service">Password: {passwd}</p>
            </div>
        )
        return TheDetails;
    }
    const closeDetails = () => {setDetails(false);}
    // this sends the new service to the database
    const addService = () => {
        let request = {
            SessionUser: authenticate, Username: newUser, 
            Password: newPasswd, Service: newService
        }
        axios.post(`https://192.168.1.103:5500/vault/${currentUser}`, request,
        {httpsAgent, headers: {"Content-Type": "application/json"}})
        .then(response => {
            let result = response.data;
            // I am using setTimeout to run the alert since "setRequestStatus" runs asynchronously
            setTimeout(() => {alert(result.Result); window.location.reload();}, 1000);
        }).catch(err => console.log(err));
    };
    const editService = () => {

    }
    const addingPopup: JSX.Element = (
        <div className="Popup">
            <div className="TheForm" id="add-service">
            <form id="add-form">
                <button className="CloseButton" id="close-add" onClick={closeAddPopup}> X </button>
                <Subtitle>Add a New Service</Subtitle>
                <label htmlFor="add-service" className="FormLabel" id="add-service-label">Service</label>
                <input type="text" name="add-service" className="FormInput" id="add-service" value={newService}
                    onChange={(e) => setNewService(e.target.value)} />
                <label htmlFor="add-username" className="FormLabel" id="add-user-label">Username</label>
                <input type="text" name="add-username" className="FormInput" id="add-username" value={newUser}
                    onChange={(e) => setNewUser(e.target.value)} />
                <label htmlFor="add-password" className="FormLabel" id="add-pass-label">Password</label>
                <input type="password" name="add-password" className="FormInput" id="add-password" 
                    value={newPasswd} onChange={(e) => setNewPasswd(e.target.value)} />
            </form>
            <button className="SubmitButton" id="add-service" onClick={addService}>Add Service</button>
            </div>
        </div>
    )
    const changePopup: JSX.Element = (
        <div className="Popup">
            <div className="TheForm" id="add-service">
            <form id="add-form">
                <button className="CloseButton" id="close-edit" onClick={closeEditPopup}> X </button>
                <Subtitle>Edit Credentials</Subtitle>
                <label htmlFor="edit-username" className="FormLabel" id="edit-user-label">Username</label>
                <input type="text" name="username" className="FormInput" id="edit-username" value={editUser}
                    onChange={(e) => setEditUser(e.target.value)} />
                <label htmlFor="edit-password" className="FormLabel" id="edit-pass-label">Password</label>
                <input type="password" name="password" className="FormInput" id="edit-password" 
                    value={editPasswd} onChange={(e) => setEditPasswd(e.target.value)} />
            </form>
            <button className="SubmitButton" id="add-service" onClick={editService}>Update Info</button>
            </div>
        </div>
    )
    const mappings = appData.map((d) => (
        <div className="SiteGrid" key={d["ID"]}>
            <div className="GridItem">
                <p className="Icon">{` ${d.Service[0]} `}</p>
                <p className="Service" id="ServiceName" 
                onClick={showDetails}>{d.Service}</p>
                {details ? showData(d.Username, d.Password) : null}
            </div>
        </div>))
    return (
        <div>
        <div className="SearchDiv">
            <input type="search" name="search" id="search" placeholder="Search"/>
            <button style={buttonCss} className="SearchButton" 
                onMouseOver={() => setButtonColor("#2ddc2d")}
                onMouseOut={() => setButtonColor("green")}>Search</button>
        </div>
        <Title>Hello {(authenticate.length > 0)? authenticate : currentUser}!</Title>
            <div className="UserData">
            <Subtitle>Frequently Used Sites</Subtitle>
            <div className="Sites">
                {mappings}
                <div className="GridItem" id="service-button">
                    <p className="Icon" id="NewService" onClick={showAddPopup}>+</p>
                    <p className="Service">Add Service</p>
                </div>
            </div>
                {(addPopup) ? addingPopup : null}
                {(editPopup) ? changePopup : null}
            </div>
        </div>
    )
}
export const MyAccount: React.FC = () => {
    return (<div></div>)
}