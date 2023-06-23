import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useMutation, gql, useQuery } from '@apollo/client';
import loadinggif from '../../images/loading.gif'


const CREATE_NEW_USER = gql`
  mutation Mutation($username: String!, $password: String!) {
  createNewUser(username: $username, password: $password) {
    userinfo {
      username
      password
    }
    token
  }
}`;

export const Register = (props) => {

    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const [createNewUser] = useMutation(CREATE_NEW_USER);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (pass !== confirmPass) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            const { data } = await createNewUser({
                variables: { username: name, password: pass },
            });

            const { createNewUser: { token } } = data;

            // save user token to local storage
            localStorage.setItem('nekotsresueht', token);

            setName('');
            setPass('');
            setConfirmPass('')
            navigate('/')
        }   catch (error) {
            console.error(error);
            setErrorMessage("response object lost in the sauce")
        }
        setIsLoading(false);
    };

    const currentToken = localStorage.getItem('nekotsresueht')
    
    useEffect(() => {
        if (currentToken) {
        setIsLoggedIn(true);
        }
        if (isLoggedIn) {
            navigate('/')
        }
    });



    return (
          <div className="auth-form-container">
            {isLoading && <img src={loadinggif} alt="loading" height="64px"/>}
            {!isLoading && <h2>Register</h2>}           
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name"></label>
            
            <input value={name} onChange={(e) => setName(e.target.value)}type="name" placeholder="username" id="name" name="name"/>
            <label htmlFor="password"></label>
            
            <input value={pass} onChange={(e) => setPass(e.target.value)}type="password" placeholder="password" id="password" name="password"/>
            <label htmlFor="confirm-password"></label>
            
            <input value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} type="password" placeholder="confirm password" id="confirm-password" name="confirm-password"/>
            <button type="submit">Log In</button>

        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {isLoading && <div className="error-message">creating user save file. . .</div>}
        <button className="link-btn" onClick={() => navigate('/login')}> Already have an account? Login here. </button>
        </div>  
    )
}

export default Register;


