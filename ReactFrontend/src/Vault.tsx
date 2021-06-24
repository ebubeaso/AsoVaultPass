import React from 'react';
import { Title, Subtitle } from './Styles';

export const VaultHome: React.FC = () => {
    return (
        <div>
        <div className="SearchDiv">
            <input type="search" name="search" id="search" placeholder="Search"/>
        </div>
        <Title>My Sites</Title>
        <div className="SiteGrid">

        </div>
        </div>
    )
}