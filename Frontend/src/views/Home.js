import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Your Store!</h1>
      <div className="auth-links">
        <div className="auth-section">
          <h2>User</h2>
          <Link to="/user-registration" className="auth-link">
            Register
          </Link>
          <Link to="/user-login" className="auth-link">
            Login
          </Link>
          <Link to="/cart" className="auth-link">
            Cart
          </Link>
        </div>
        <div className="auth-section">
          <h2>Store</h2>
          <Link to="/store-registration" className="auth-link">
            Register
          </Link>
          <Link to="/store-login" className="auth-link">
            Login
          </Link>
          <Link to="/product-management" className="auth-link">
            Store Owner
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
