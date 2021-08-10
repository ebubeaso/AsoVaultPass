import React from 'react';
import { Subtitle } from './Styles';
import { httpsAgent, authenticate } from './Header';
import axios from 'axios';
import { currentUser } from './Vault';
import { useHistory } from 'react-router-dom';
export const Service: React.FC = (props: any) => {
    var history = useHistory();
    var [theData, setTheData] = React.useState<Array<any>>([]);
    var [editPopup, setEditPopup] = React.useState<boolean>(false);
    var [deletePopup, setDeletePopup] = React.useState<boolean>(false);
    var [editUser, setEditUser] = React.useState<string>("");
    var [editPasswd, setEditPasswd] = React.useState<string>("");
    React.useEffect(() => {
        console.log("props");
        console.log(props.match.params)
        axios.get(`https://192.168.1.103:5500/vault/${currentUser}/${props.match.params.service}`, 
            {httpsAgent, headers: {"Content-Type": "application/json"}})
            .then(response => {
                let result = response.data;
                setTheData(result);
                //console.log(result);
            }).catch(err => {
                console.log(err); 
                alert("Sorry, we could not connect to the resource. Try again later")
            })
    }, [])
    const editService = () => {
        let request = {SessionUser: authenticate, Username: editUser, Password: editPasswd}
        axios.put(`https://192.168.1.103:5500/vault/${currentUser}/${props.match.params.service}`,
        request, {httpsAgent, headers: {"Content-Type": "application/json"}})
        .then(response => {
            let result = response.data;
            alert(result.Result);
            closeEditPopup();
            window.location.reload();
        })
    }    
    const showEditPopup = () => {setEditPopup(true);}
    const closeEditPopup = () => {setEditPopup(false);}
    const showDeletePopup = () => {}
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
    return (
        <div>
        <div className="ServiceInfo">
            <div className="DataOptions">
                <button className="EditButton" onClick={showEditPopup}>Edit Info</button>
                <button className="CloseButton" id="close-details" onClick={showDeletePopup}>Remove</button>
            </div>
            {theData.map((d) => (
            <div key={d["ID"]}>
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
    return (<div></div>)
}