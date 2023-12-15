import React, { useState } from 'react';
import axios from 'axios';

export default function LoginForm({ isAdmin, toggleUserType }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userType = isAdmin ? 'admin' : 'normal';

    const host = window.location.host;
    const url = `http://${host}`;

    console.log(url)
    try {
      const response = await axios.post(`${url}/api/login/`, { username, password, user_type: userType });
      if (response.status === 200) {
        const { token } = response.data;
        handleToken(token);
      } else {

        setErrorMessage(response.data.error || 'An error occurred');

      }
    } catch (error) {

      setErrorMessage(error.response?.data.error || 'An error occurred');
      
    }

  };

  const handleToken = (token) => {
    // Save token in localStorage
    localStorage.setItem('digitalize_token', token);
  
    // Redirect
    const payload = JSON.parse(atob(token.split('.')[1])); 
    if (payload.role === 'admin') {
      window.location.href = '/admin';
    } else {
      window.location.href = '/user';
    }
  };


  return (
    <form onSubmit={handleSubmit} className="form">
      <input 
        type="username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Username"
        className="input-field"
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        className="input-field"
      />
      <button type="submit" className="submit-button">Login</button>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div onClick={toggleUserType} className="user-type-toggle">
        {isAdmin ? 'Login as a normal user ➞' : 'Login as an admin ➞'}
      </div>
    </form>
  );
}
