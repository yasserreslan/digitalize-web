import React, { useState,useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if a token is present in local storage
    const token = localStorage.getItem('digitalize_token');

    if (token) {
      try {
        // Parse the token as a JSON object
        const tokenData = JSON.parse(atob(token.split('.')[1]));

        // Check the token expiration time
        const tokenExpiration = tokenData.exp;
        const currentTime = Math.floor(Date.now() / 1000);

        if (tokenExpiration > currentTime) {

          const userRole = tokenData.role;


          if (userRole === 'admin') {
            // Redirect to the admin screen
            window.location.href = '/admin';
          } else if (userRole === 'normal') {
            // Redirect to the user screen
            window.location.href = '/user';
          }
        } else {
          // Token is expired, remove it from local storage
          localStorage.removeItem('digitalize_token');
        }
      } catch (error) {
        console.error('Error checking token:', error);
      }
    }
  }, []);



  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const toggleUserType = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className={`auth-form ${isAdmin ? 'admin' : ''}`}>
        <img src="/logo.png" alt="Logo" className="logo" />
      {isLogin ? 
        <LoginForm isAdmin={isAdmin} toggleUserType={toggleUserType} /> : 
        <RegisterForm />
      }
      <button onClick={toggleForm} className="toggle-button">
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
    </div>
  );
}
