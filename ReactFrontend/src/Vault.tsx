import React from 'react';
import { Title, Subtitle } from './Styles';

export const VaultHome: React.FC = () => {
    var [login, setLogin] = React.useState(false);
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
};
