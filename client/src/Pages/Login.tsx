//useRef: allows us to reference the input fields without re-rendering
//useState: allows us to manage the error message
//useNavigate: allows us to navigate to another page
//handleLogin: sends a POST request to the server to log in the user
//Login.css: styles for the login form
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

//Props for managing the Login state
//setIsLoggedIn: function that updates the login status (passed from a parent component)
//the function changes the UI when the user logs in (e.g.hiding the login button, showing the logout button)
interface LoginProps {
  setIsLoggedIn: (status: boolean) => void;
}

//useRef<HTMLInputElement>null: 
  //(1) stores references to the input fields 
  //(2) instead of using useState, we read values only when the LogIn button is clicked
const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  //useState: manages the error message. Only updates when needed
  const [error, setError] = useState<string | null>(null);

  //useNavigate: used to redirect the users after a successful login
  const navigate = useNavigate();

  //Login Logic
  //gets the username and password from the input fields
  //trims extra spaces (e.g. username: '  user  ' -> 'user')
  //if either fields are empty, an error message is displayed
  const handleLogin = async () => {
    const username = usernameRef.current?.value.trim() || '';
    const password = passwordRef.current?.value.trim() || '';
  
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }
  
  //API call to login
  //POST request to the server (backend handles the authentication)
  //sends the username & password in JSON format
  //if the response is not OK, an error message is displayed
  //if the login is successful: 
    // (1) set Error(null) clears any previous error messages
    // (2) alert('Login successful!') displays a success message
    // (3) console.log(data) helps us debug the response

  //note that the apis here are placeholders and need to be replaced with the actual API endpoints
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

      //call setIsLoggedIn to update the login status (provided by a parent component)
      //This updates the global state so that the other components know the user is logged in
        //redirects the user to the homepage (/) using navigate ('/)

      setIsLoggedIn(true);
      navigate('/');

      //Handling Errors
        //Catches any errors (like network issues or wrong credentials)
        //Logs the error to the console (console.error ())
        //Updates the error state (setError()) to show the user an error message
    } catch (err: any) {
      console.error('Login error:', err.message);
      setError(err.message || 'An error occurred. Please try again.');
    }
  };

  //UI Rendenring
    //Shows the login form
    //ref={usernameRef} and ref={passwordRef} do not trigger re-renders
    //onClick={handleLogin} login is only attempted when the button is clicked
    //displays an error message if error exists
  return (
    <>
      <h2 className="login-h2">Welcome Back!</h2>
      <h3 className="login-h3">Found a job you love? Login to your account now.</h3>
      <div className="login-form">
        <input className="login-input" type="text" ref={usernameRef} placeholder="Username" />
        <input className="login-input" type="password" ref={passwordRef} placeholder="Password" />
        <br />
        <button className="Login-button" onClick={handleLogin}>Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </>
  );
};

export default Login;
