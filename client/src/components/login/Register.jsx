import React, { useState } from "react";
import './Login.css';

export const Register = (props) => {

    const [name, setName] = useState('');
    const [pass, setPass] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name); 
    }


    return (
          <div className="auth-form-container">    
          <h2>Register</h2>            
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name"></label>
            <input value={name} type="name" placeholder="username" id="name" name="name"/>
            <label htmlFor="password"></label>
            <input value={pass} type="password" placeholder="*********" id="password" name="password"/>
            <label htmlFor="password"></label>
            <input value={pass} type="password" placeholder="*********" id="password" name="password"/>
            <button type="submit">Log In</button>

        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}> Already have an account? Login here. </button>
        </div>  
    )
}

export default Register;


