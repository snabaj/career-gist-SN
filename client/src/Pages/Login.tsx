import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

interface LoginProps {
  setIsLoggedIn: (status: boolean) => void; // Prop to update the login state
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // For navigation after login success

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      setError(null);
      alert('Login successful!');

      // Update the login state and navigate to the home page
      setIsLoggedIn(true);
      navigate('/');
    } catch (err: any) {
      console.error('Login error:', err.message);
      setError(err.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <>
    <h2 className="login-h2">Welcome Back!</h2>
    <h3 className="login-h3">Found a job you love? Login to your account now.</h3>
    <div className="login-form">
      <input
        className="login-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        className="login-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <br />
      <button className="Login-button" onClick={handleLogin}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    </>
  );
};

export default Login;
