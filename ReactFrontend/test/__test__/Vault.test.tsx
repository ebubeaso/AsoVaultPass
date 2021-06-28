import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {shallow, configure} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { VaultHome } from '../../src/Vault';
// configure the enzyme adapter to avoid the adapter error
configure({adapter: new Adapter()});
it("render without crashing", () => {
    render(<VaultHome/>)
});

// const changeWindow = (x: number, y: number) => {
//     // @ts-ignore
//     window.innnerWidth = x;
//     // @ts-ignore
//     window.innerHeight = y;
//     // dispatch the event
//     window.dispatchEvent(new Event('resize'));
// };
// it("Change the screen resolution", () => {
//     const vault = shallow(<VaultHome/>);
//     changeWindow(500, 600);
//     expect(vault.width).toEqual('<div>500 x 600</div>')
// })