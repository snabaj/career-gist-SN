import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../assets/CareerGist.png';
import { login } from '../api/authApi.jsx';
import Auth from '../utils/auth';

interface LoginProps {
  setIsLoggedIn: (status: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleLogin = async () => {

    if (!loginData.username || !loginData.password) {
      setError('Username and password are required.');
      return;
    }

    try {
      const data = await login(loginData);
        setError(null);
      alert('Login successful!');
      setIsLoggedIn(true);
      Auth.login(data.token);
      navigate('/saved-jobs');
    } catch (err) {
      console.error('Failed to login', err);
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="main-container">
      <h2 className="login-h2">Welcome Back!</h2>
      <h3 className="login-h3">Found a job you love? Login to your account now.</h3>
      <div className="login-form">
      <input 
        className="login-input" 
        type="text" 
        name='username'
          value={loginData.username || ''}
          onChange={handleChange}
        placeholder="Username" />
        <input 
        className="login-input" 
        type="password" 
        name='password'
          value={loginData.password || ''}
          onChange={handleChange}
        placeholder="Password" />
        <br />
        <button className="Login-button" onClick={handleLogin}>Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <img className="logo2" src={logo} alt="Career Gist Logo" />
    </div>
  );
};

export default Login;
