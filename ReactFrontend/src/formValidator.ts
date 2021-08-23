// This Typescript file will be used for form validation
export default function validator(values: any) {
    let formErrors = {
        firstname: "", lastname: "", username: "", password: "", confirm: "", email: ""
    } // capture the form errors
    if (values.firstname.length == 0) {
        formErrors.firstname = " * Please enter your first name";
    }
    if (values.lastname.length == 0) {
        formErrors.lastname = " * Please enter your last name";
    }
    if (values.email.length == 0) {
        formErrors.email = " * Please enter in your email";
    } else if (!values.email.includes("@")) {
        formErrors.email = " * Please Enter a valid email address";
    }
    if (values.username.length == 0) {
        formErrors.username = " * Please Enter a username";
    }
    if (values.password.length < 8 || !/[A-Z]/.test(values.password)) {
        formErrors.password = " * Invalid Password: It needs to be larger than 8 characters,\n";
        formErrors.password += "it must have at least one number in it and at least one special\n";
        formErrors.password += "character (e.g. !, ?, @, $, %)";
    } else if (!/[0-9]/.test(values.password) || !/[\! || \? || \@ || \$ || \%]/.test(values.password)) {
        formErrors.password = " * Invalid Password: It needs to be larger than 8 characters,\n";
        formErrors.password += "it must have at least one number in it and at least one special\n";
        formErrors.password += "character (e.g. !, ?, @, $, %)";
    }
    if (values.password != values.confirm) {
        formErrors.confirm = " * Passwords do not match";
    } else if (values.confirm.length == 0) {
        formErrors.confirm = " * Please enter your password again";
    }
    // return the form errors
    return formErrors; 
}