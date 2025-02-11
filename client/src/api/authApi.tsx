import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo)
    });

    const data = await response.json();

    if (!response.ok) {

      throw new Error(`Login failed`);
    }

    localStorage.setItem('id_token', data.token);
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Network error or server is unreachable');
  }
}

export { login };