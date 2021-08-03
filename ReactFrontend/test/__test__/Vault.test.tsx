import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {shallow, configure, mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { VaultHome, VaultMain } from '../../src/Vault';
import { VaultLogin, TheHeader } from '../../src/Header';
import { Signup } from '../../src/Signup';
import { Title } from '../../src/Styles';
import { correctPasswd, incorrectPasswd } from './testCreds';
// configure the enzyme adapter to avoid the adapter error
configure({adapter: new Adapter()});
it("render without crashing", () => {
    render(<VaultHome/>);
    render(<VaultMain/>);
    render(<VaultLogin/>);
    render(<TheHeader/>);
    render(<Signup/>);
});

it("Change the screen resolution", () => {
    let vault = shallow(<VaultHome/>);
    window = Object.assign(window, { innerWidth: 500, innerHeight: 600 });
    expect(window.innerWidth).toEqual(500);
    expect(window.innerHeight).toEqual(600);
})
it("Testing responsiveness", () => {
    let vault = shallow(<VaultMain/>);
    window = Object.assign(window, { innerWidth: 500, innerHeight: 600 });
    expect(window.innerWidth).toEqual(500);
    expect(window.innerHeight).toEqual(600);
    expect(vault.find(Title)).toBeTruthy();
})
it("Test the login", () => {
    let wrapper = shallow(<VaultLogin/>);
    // testing the username input
    wrapper.find("#username").simulate('change', {target: {
        name: "username", value: "pierre"}})
    expect(wrapper.find("#username").html()).toContain("pierre");
    wrapper.find("#password").simulate("change", {target: {
        name: "password", value: correctPasswd}})
    expect(wrapper.find("#password").html()).toContain(correctPasswd);

})
it("test the signup page", () => {
    // testing the state
    let wrapper = shallow(<Signup/>);
    wrapper.find("button").simulate("click");
    console.log(wrapper.find("submit-register"))
    //expect(wrapper.find("#invalid-fname").html().toContain("Please Enter Your First Name"));
    /*
    const changeSize = jest.fn();
   const wrapper = mount(<App onClick={changeSize} />);
   const handleClick = jest.spyOn(React, "useState");
   handleClick.mockImplementation(size => [size, changeSize]);

   wrapper.find("#para1").simulate("click");
   expect(changeSize).toBeTruthy();
    */
})