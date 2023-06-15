import React, { useState } from "react";
import './Login.css';


export const Login = (props) => {
    const[name, setName] = useState('');
    const[pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name); 
    }

    return (
          <div className="auth-form-container">   
           <h2>Login</h2>              
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="name"></label>
            <input value={name} type="name" placeholder="username" id="name" name="name"/>
            <label htmlFor="password"></label>
            <input value={pass} type="password" placeholder="*********" id="password" name="password"/>
            <button type="submit">Log In</button>

        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('register')}> "Don't have an account? Register here. </button>
        </div>  
    )
}

export default Login;