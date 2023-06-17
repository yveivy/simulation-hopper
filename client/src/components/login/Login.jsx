import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useMutation, gql } from '@apollo/client';
import loadinggif from '../../images/loading.gif'

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
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const [userLogIn] = useMutation(USER_LOGIN);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
        try {
        const { data } = await userLogIn({
            variables: { username: name, password: pass },
        });
        console.log(data)
        const { token } = data.userLogIn

        // save user token to local storage
        localStorage.setItem('nekotsresueht', token);

        setName('');
        setPass('');
        
        //uncomment once gamepage is exported as component. for now use win.loc
        navigate('/play') 
        
        // window.location.href = '/'
        } catch (error) {
        console.error(error);
        setErrorMessage("Wrong Credentials!")
        }
    setIsLoading(false)
    }

    return (
        <div className="auth-form-container">   
            {isLoading && <img src={loadinggif} height="64px"/>}
            {!isLoading && <h2>Login</h2>}
            {/* <h2>Login</h2> */}
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="name"></label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="username" id="name" name="name"/>

                <label htmlFor="password"></label>
                <input value={pass} onChange={(e) => setPass(e.target.value)}type="password" placeholder="password" id="password" name="password"/>
                <button type="submit" disabled={isLoading}>Log In</button>

            </form>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button className="link-btn" onClick={() => navigate('/register')}>Don't have an account? Register here. </button>
        </div>  
    )
}

export default Login;