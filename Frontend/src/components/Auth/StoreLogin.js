import React, { useState } from 'react';
import axios from 'axios';

import './AuthForm.css'; 
const StoreLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/stores/login', {
        email,
        password,
      });

      setMessage('Store login successful!'); 
    } catch (error) {
      setMessage('Store login failed. Please check your credentials.');
    }
  };

  return (
    <div className="auth-form">
      <h2>Store Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default StoreLogin;
