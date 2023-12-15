import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterForm({  toggleUserType }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const host = window.location.host;
      const url = `http://${host}`;
      const response = await axios.post(`${url}/api/register/`, { email, username, password, user_type: 'normal' });
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
  
    // Redirect based on user type
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.role === 'normal') {
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
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
        className="input-field"
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        className="input-field"
      />

      <button type="submit" className="submit-button">Register</button>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div onClick={toggleUserType} className="user-type-toggle">
        
      </div>
      
    </form>
  );
}
