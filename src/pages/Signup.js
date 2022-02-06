import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { FormValidator } from '../shared/validations';
import { registerApi } from '../services/Auth';
import { toast } from 'react-toastify';

const Signup = () => {

    const [signupInfo, setSignupInfo] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [error, setError] = React.useState({});

    const handleChange = (e) => {
        const info = { ...signupInfo };
        const err = { ...error };
        info[e.target.name] = e.target.value;
        err[e.target.name] = '';
        setSignupInfo(info);
        setError(err);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        let error = FormValidator(signupInfo);
        if (error) {
            setError(error);
            return;
        } else {
            try {
                let response = await registerApi({
                    email: signupInfo.email,
                    password: signupInfo.password
                });
                if (response && response.status === 200) {
                    toast('Successfully signed up');
                }
            } catch (err) {
                toast.error(err.response.data.error);
            }
        }
    }

    return (
        <div>
            <h2>Signup</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>First Name{' '}</Label>
                    <Input
                        type="text"
                        name="firstName"
                        placeholder="Enter First Name"
                        onChange={handleChange}
                        value={signupInfo.firstName}
                    />
                    {error?.firstName && (
                        <div>
                            <small className='error-message'>{error?.firstName}</small>
                        </div>
                    )}
                </FormGroup>
                <FormGroup>
                    <Label>Last Name{' '}</Label>
                    <Input
                        type="text"
                        name="lastName"
                        placeholder="Enter Last Name"
                        onChange={handleChange}
                        value={signupInfo.lastName}
                    />
                    {error?.lastName && (
                        <div>
                            <small className='error-message'>{error?.lastName}</small>
                        </div>
                    )}
                </FormGroup>
                <FormGroup>
                    <Label>Email{' '}</Label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        onChange={handleChange}
                        value={signupInfo.email}
                    />
                    {error?.email && (
                        <div>
                            <small className='error-message'>{error?.email}</small>
                        </div>
                    )}
                </FormGroup>
                <FormGroup>
                    <Label>Password{' '}</Label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        onChange={handleChange}
                        value={signupInfo.password}
                    />
                    {error?.password && (
                        <div>
                            <small className='error-message'>{error?.password}</small>
                        </div>
                    )}
                </FormGroup>
                <Button type='submit'>
                    Signup
                </Button>
                <br /><br />
                <Link to="/">Login with existing account</Link>
            </Form>
        </div>
    )
}

export default Signup;
