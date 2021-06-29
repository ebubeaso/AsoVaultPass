import React from 'react';
import { Title, Subtitle, IntroParagraph } from './Styles';

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
    let buttonCss: React.CSSProperties = {backgroundColor: buttonColor}
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
            <div className="SiteGrid">
                <div className="GridItem">Facebook</div>
                <div className="GridItem">Gmail</div>
                <div className="GridItem">Outlook</div>
                <div className="GridItem">Dropbox</div>
                <div className="GridItem">Fashion Nova</div>
                <div className="GridItem">Bank of America</div>
                <div className="GridItem">Paypal</div>
            </div>
            </div>
        </div>
    )
}
