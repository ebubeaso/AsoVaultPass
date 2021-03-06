import React from 'react';
import { render, fireEvent, getByText, screen } from '@testing-library/react';
import {shallow, configure } from 'enzyme';
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
it("test the signup page with no entries", () => {
    // testing the state
    let wrapper = render(<Signup/>);
    fireEvent.click(screen.getByText("Signup!"));
    expect(screen.getByText("Please enter your first name")).toBeTruthy();
    // now to enter in some text
    fireEvent.change(screen.getByLabelText("First Name"), {target: {value: 'Ebube'}});
    fireEvent.click(screen.getByText("Signup!"));
    expect(screen.getByDisplayValue('Ebube')).toBeTruthy();

})
it("test the signup page with adding the last name", () => {
    render(<Signup/>);
    fireEvent.click(screen.getByText("Signup!"));
    expect(screen.getByText("Please enter your last name")).toBeTruthy();
    fireEvent.change(screen.getByLabelText("Last Name"), {target: {value: "Aso"}});
    fireEvent.click(screen.getByText("Signup!"));
    expect(screen.getByDisplayValue("Aso")).toBeTruthy();
});
it("test the signup page with adding the username", () => {
    render(<Signup/>);
    fireEvent.click(screen.getByText("Signup!"));
    expect(screen.getByText("Please Enter a username")).toBeTruthy();
    fireEvent.change(screen.getByLabelText("Username"), {target: {value: "easo"}});
    fireEvent.click(screen.getByText("Signup!"));
    expect(screen.getByDisplayValue("easo")).toBeTruthy();
});
it("test the signup page with adding the email", () => {
    render(<Signup/>);
    fireEvent.click(screen.getByText("Signup!"));
    expect(screen.getByText("Please enter in your email")).toBeTruthy();
    fireEvent.change(screen.getByLabelText("Email Address"), {target: {value: "asoebube1.com"}});
    fireEvent.click(screen.getByText("Signup!"));
    expect(screen.getByText("Please Enter a valid email address")).toBeTruthy();
    fireEvent.change(screen.getByLabelText("Email Address"), {target: {value: "escalade938@gmail.com"}});
    fireEvent.click(screen.getByText("Signup!"));
    expect(screen.getByDisplayValue("escalade938@gmail.com")).toBeTruthy();
});