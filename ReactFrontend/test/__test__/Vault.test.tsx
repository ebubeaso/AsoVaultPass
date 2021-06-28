import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {shallow, configure} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { VaultHome } from '../../src/Vault';
import { Title } from '../../src/Styles';
// configure the enzyme adapter to avoid the adapter error
configure({adapter: new Adapter()});
it("render without crashing", () => {
    render(<VaultHome/>)
});

it("Change the screen resolution", () => {
    let vault = shallow(<VaultHome/>);
    window = Object.assign(window, { innerWidth: 500, innerHeight: 600 });
    expect(window.innerWidth).toEqual(500);
    expect(window.innerHeight).toEqual(600);
})
it("Testing responsiveness", () => {
    let vault = shallow(<VaultHome/>);
    window = Object.assign(window, { innerWidth: 500, innerHeight: 600 });
    expect(window.innerWidth).toEqual(500);
    expect(window.innerHeight).toEqual(600);
    expect(vault.find(Title)).toBeTruthy();
})