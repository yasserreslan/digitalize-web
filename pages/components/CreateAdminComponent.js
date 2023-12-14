import React, { useState } from 'react';
import axios from 'axios';

export default function CreateAdminComponent() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');





  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
        const token = localStorage.getItem('digitalize_token');

      const response = await axios.post('http://localhost:8000/register/', { email, username, password, user_type: 'admin' },  {headers: { Authorization: token }});
      if (response.status === 200) {
        setSuccessMessage("Admin user created successfully!")
        
      } else {
        setErrorMessage(response.data.error || 'An error occurred');
      }

    } catch (error) {
      setErrorMessage(error.response?.data.error || 'An error occurred');
    }

  };


  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <input
        type="text"
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
      <button type="submit" className="submit-button">Create Admin</button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

    </form>
  );
}
