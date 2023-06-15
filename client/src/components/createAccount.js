import React, { useState } from 'react';
import { createNewUserAndSeedDatabase } from '../../../server/config/db';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verify if the passwords match
    if (password !== verifyPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Call the createNewUserAndSeedDatabase function from your backend file
      await createNewUserAndSeedDatabase({ username, password });

      // If the user is created successfully, perform necessary actions
      // ...

      // Redirect to the dashboard or another page
      window.location.href = '/dashboard';
    } catch (error) {
      // Handle error if user creation fails
      // ...
    }
  };

return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="password"
        value={verifyPassword}
        onChange={(e) => setVerifyPassword(e.target.value)}
        placeholder="Verify Password"
      />
      {error && <p>{error}</p>}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;