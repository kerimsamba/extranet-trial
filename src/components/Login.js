import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg'; // Make sure to add your logo file to the assets folder

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/gigs');
  };

  return (
    <div className="login-screen">
      <img src={logo} alt="Community Band App Logo" className="logo" />
      <h1>Community Band App</h1>
      <button onClick={handleLogin}>Log in with Google</button>
      <button onClick={handleLogin}>Log in with Apple</button>
    </div>
  );
}

export default Login;