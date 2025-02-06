// Login.tsx
import React, { useState } from 'react';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginAttempts, setLoginAttempts] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const handleLogin = async () => {
    if (isLocked) {
      alert("Your account is locked. Please wait an hour or reset your password.");
      return;
    }

    // Here you would call your API to check credentials
    const success = false; // This should be the result of your API call

    if (!success) {
      setLoginAttempts(prev => prev + 1);
      if (loginAttempts >= 2) {
        setIsLocked(true);
        setTimeout(() => setIsLocked(false), 3600000); // Locks the account for an hour
      }
    } else {
      // Handle successful login
    }
  };

  return (
    <div>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin} disabled={isLocked}>Login</button>
      {loginAttempts > 0 && <p>Incorrect username or password. Attempts left: {3 - loginAttempts}</p>}
    </div>
  );
};

export default Login;
