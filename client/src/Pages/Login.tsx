//Dummy Login Page for testing and design purposes
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../assets/CareerGist.png';

interface LoginProps {
  setIsLoggedIn: (status: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // **🔹 Dummy Credentials for Testing**
  const DUMMY_USER = {
    username: "testuser",
    password: "password123",
    token: "dummy-jwt-token", // Simulating a backend response
  };

  const handleLogin = async () => {
    const username = usernameRef.current?.value.trim() || '';
    const password = passwordRef.current?.value.trim() || '';

    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    // **🔹 Check Dummy Credentials**
    if (username === DUMMY_USER.username && password === DUMMY_USER.password) {
      setError(null);
      alert('Login successful!');

      // ✅ Simulate Storing JWT Token (For Future API Requests)
      localStorage.setItem('authToken', DUMMY_USER.token);

      // ✅ Update Global Login State
      setIsLoggedIn(true);

      // ✅ Redirect to Saved Jobs Page for Testing
      navigate('/saved-jobs');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="main-container">
      <h2 className="login-h2">Welcome Back!</h2>
      <h3 className="login-h3">Found a job you love? Login to your account now.</h3>
      <div className="login-form">
        <input className="login-input" type="text" ref={usernameRef} placeholder="Username" />
        <input className="login-input" type="password" ref={passwordRef} placeholder="Password" />
        <br />
        <button className="Login-button" onClick={handleLogin}>Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <img className="logo2" src={logo} alt="Career Gist Logo" />
    </div>
  );
};

export default Login;
