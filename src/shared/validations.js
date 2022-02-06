export const FormValidator = (data) => {
    const errors = {};
    if (!/([^\s])/.test(data['password'])) errors["password"] = "Please enter your password.";

    if (data['password'].length < 4 && data['password'].length > 0) {
        errors['password'] = 'Password is too short. It should be minimum 4 characters.'
    }

    if (!/([^\s])/.test(data['email'])) errors["email"] = "Please enter your email address.";

    if (!/([^\s])/.test(data['firstName'])) errors["firstName"] = "Please enter your first name.";

    if (!/([^\s])/.test(data['lastName'])) errors["lastName"] = "Please enter your last name.";

    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data['email']) && data['email'].length > 0) { errors["email"] = "Please enter valid email address."; }

    return Object.keys(errors).length === 0 ? null : errors
}