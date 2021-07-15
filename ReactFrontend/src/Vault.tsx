import React from 'react';
import { Title, Subtitle, IntroParagraph } from './Styles';
import { authenticate, httpsAgent } from './Header';
import axios from 'axios';

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
    var [popup, setPopup] = React.useState<boolean>(false);
    let buttonCss: React.CSSProperties = {backgroundColor: buttonColor};
    React.useEffect(() => {
        axios.get(`https://192.168.1.103:5500/vault/${authenticate}`, 
        {httpsAgent, headers: {"Content-Type": "application/json"}})
        .then(response => {
            let result = response.data;
            setAppData(result);
        })
    }, [])
    // This function is used to display the popup service
    const servicePopup = () => {
        
    }
    return (
        <div>
        <div className="SearchDiv">
            <input type="search" name="search" id="search" placeholder="Search"/>
            <button style={buttonCss} className="SearchButton" 
                onMouseOver={() => setButtonColor("#2ddc2d")}
                onMouseOut={() => setButtonColor("green")}>Search</button>
        </div>
        <Title>My Sites</Title>
            <div className="Sites">
                <Subtitle>Frequently Used</Subtitle>
                {appData.map((d) => (
                <div className="SiteGrid" key={d.Username}>
                    <div className="GridItem">
                        <p className="Icon">{d.Service[0]}</p>
                        <p className="Service">{d.Service}</p>
                    </div>
                    <div className="GridItem">
                        <p className="Icon" id="NewService" onClick={servicePopup}>+</p>
                        <p className="Service">Add Service</p>
                    </div>
                </div>
                ))}

            </div>
        </div>
    )
}
