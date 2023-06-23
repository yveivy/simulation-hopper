import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useMutation, gql, useQuery } from '@apollo/client';
import loadinggif from '../../images/loading.gif'
import { TOKEN_CHECK } from "../../utils/db/queries";

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

const logout = () =>{
    localStorage.setItem('nekotsresueht', null)
}


export const Login = (props) => {
    const[name, setName] = useState('');
    const[pass, setPass] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        

        navigate('/') 
        

        } catch (error) {
        console.error(error);
        setErrorMessage("Wrong Credentials!")
        }
    setIsLoading(false)
    };

    const currentToken = localStorage.getItem('nekotsresueht')
    const { data } = useQuery(TOKEN_CHECK, { variables: { token: currentToken }});
    console.log(data)
    
    useEffect(() => {
        const setLogInStatus = async (e) => {
            const { userSaveFile } = data;
            const { token } = userSaveFile;
            if (token === currentToken) {
                setIsLoggedIn(true)
            } else {
                return;
            }  
        };
        if (data) {
        setLogInStatus();
        }
        if (isLoggedIn) {
            navigate('/')
            return;
        }
    });

    return (
        <div className="auth-form-container">   
            {isLoading && <img src={loadinggif} alt="loading" height="64px"/>}
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
            {isLoading && <h2>retrieving user save file</h2>}
            <button className="link-btn" onClick={() => navigate('/register')}>Don't have an account? Register here. </button>
        </div>  
    )
}

export default Login;