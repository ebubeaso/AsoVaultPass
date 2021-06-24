import React from 'react';
import { Title, Subtitle, IntroParagraph } from './Styles';

export const VaultHome: React.FC = () => {
    return (
        <div>
            <Title>Aso Vault Pass</Title>
            <Subtitle>Your secrets are safe with me</Subtitle>
            <IntroParagraph>
                Have a hard time remembering passwords? This custom password manager
                tool will help you with just that! This app will save your credentials
                to different sites so that it will make it easier for you to remember 
                your username and password to the different sites and services that you
                use.
            </IntroParagraph>
        </div>
    )
}