import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css';

export const Register = (props) => {

    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        if (pass !== confirmPass) {
            setErrorMessage("Passwords do not match");
            return;
        }
        console.log(name); 
        setErrorMessage('');
    }


    return (
          <div className="auth-form-container">    
          <h2>Register</h2>            
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name"></label>
            <input value={name} type="name" placeholder="username" id="name" name="name"/>
            <label htmlFor="password"></label>
            <input value={pass} type="password" placeholder="*********" id="password" name="password"/>
            <label htmlFor="confirm-password"></label>
            <input value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} type="password" placeholder="*********" id="confirm-password" name="confirm-password"/>
            <button type="submit">Log In</button>

        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button className="link-btn" onClick={() => navigate('/login')}> Already have an account? Login here. </button>
        </div>  
    )
}

export default Register;


