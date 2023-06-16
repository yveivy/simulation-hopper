import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useMutation, gql } from '@apollo/client';

const USER_LOGIN = gql`
    mutation Mutation($username: String!, $password: String!) {
  userLogIn(username: $username, password: $password) {
    userinfo {
      username
    }
    token
  }
}
`;


export const Login = (props) => {
    const[name, setName] = useState('');
    const[pass, setPass] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const [userLogIn] = useMutation(USER_LOGIN);

    const handleSubmit = async (e) => {
    e.preventDefault();

        try {
        const { data } = await userLogIn({
            variables: { username: name, password: pass },
        });
        
        const { token } = data.userLogIn
        // save user token to local storage
        localStorage.setItem('nekotsresueht', token);

        setName('');
        setPass('');
        // window.location.href = '/game'
        navigate('/game')
        } catch (error) {
        console.error(error);
        setErrorMessage("Wrong Credentials!")
        }
    }

    return (
          <div className="auth-form-container">   
           <h2>Login</h2>              
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="name"></label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="username" id="name" name="name"/>

            <label htmlFor="password"></label>
            <input value={pass} onChange={(e) => setPass(e.target.value)}type="password" placeholder="password" id="password" name="password"/>
            <button type="submit">Log In</button>

        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button className="link-btn" onClick={() => navigate('/register')}>Don't have an account? Register here. </button>
        </div>  
    )
}

export default Login;