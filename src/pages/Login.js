import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { FormValidator } from '../shared/validations';
import { loginApi } from '../services/Auth';

const Login = () => {

    const [creadentials, setCredentials] = React.useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const cred = { ...creadentials };
        const err = { ...error };
        cred[e.target.name] = e.target.value;
        err[e.target.name] = '';
        setCredentials(cred);
        setError(err);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        let error = FormValidator(creadentials);
        if (error) {
            setError(error);
            return;
        } else {
            try {
                let response = await loginApi({
                    email: creadentials.email,
                    password: creadentials.password
                });
                if (response && response.status === 200) {
                    localStorage.setItem('token', response.data.token);
                    toast('Successfully logged in');
                    navigate("/users");
                } 
            } catch (err) {
                toast.error(err.response.data.error);
            }
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="emailId">Email{' '}</Label>
                    <Input
                        type="email"
                        name="email"
                        id="emailId"
                        placeholder="Enter Email"
                        onChange={handleChange}
                        value={creadentials.email}
                        autoComplete="off"
                    />
                    {error?.email && (
                        <div>
                            <small className='error-message'>{error?.email}</small>
                        </div>
                    )}
                </FormGroup>
                <FormGroup>
                    <Label for="pswd">Password{' '}</Label>
                    <Input
                        type="password"
                        name="password"
                        id="pswd"
                        placeholder="Enter Password"
                        onChange={handleChange}
                        value={creadentials.password}
                    />
                    {error?.password && (
                        <div>
                            <small className='error-message'>{error?.password}</small>
                        </div>
                    )}
                </FormGroup>
                <Button type='submit'>
                    Login
                </Button>
                <p>No Account? {' '}</p>
                <Link
                    to="signup"
                >
                    Create Account
                </Link>
            </Form>
        </div>
    )
}

export default Login;
