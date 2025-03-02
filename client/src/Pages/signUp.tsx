import { useState, FormEvent, ChangeEvent } from "react";
import Auth from "../utils/auth";
import { createUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (signUpData.password !== signUpData.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const data = await createUser({
        username: signUpData.username,
        password: signUpData.password,
      });
      Auth.login(data.token);
      navigate("/");
    } catch (err) {
      console.error("Failed to sign up", err);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>

        <label>Username</label>
        <input
          type="text"
          name="username"
          value={signUpData.username}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={signUpData.password}
          onChange={handleChange}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={signUpData.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
