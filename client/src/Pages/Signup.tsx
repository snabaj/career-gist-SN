import React, { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  dob: string;
  address: string;
  country: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  securityQuestion1: string;
  securityQuestion2: string;
  securityQuestion3: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    dob: '',
    address: '',
    country: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    securityQuestion1: '',
    securityQuestion2: '',
    securityQuestion3: ''
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (formData.password !== formData.confirmPassword) {
      newErrors.push('Passwords do not match.');
    }

    // Password must be at least 8 characters, with one number, one special character, and one uppercase letter
    if (!/\d/.test(formData.password) || !/[A-Z]/.test(formData.password) || !/[^a-zA-Z\d]/.test(formData.password) || formData.password.length < 8) {
      newErrors.push('Password must include at least one number, one uppercase letter, one special character, and be at least 8 characters long.');
    }

    // Security questions must have a minimum of 4 characters
    if (formData.securityQuestion1.length < 4 || formData.securityQuestion2.length < 4 || formData.securityQuestion3.length < 4) {
      newErrors.push('Each security answer must be at least 4 characters long.');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dob: formData.dob,
      address: formData.address,
      country: formData.country,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      securityQuestions: {
        question1: formData.securityQuestion1,
        question2: formData.securityQuestion2,
        question3: formData.securityQuestion3,
      }
    };

    try {
      const response = await fetch('http://your-backend-url/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Failed to register user.');
      }

      const result = await response.json();
      setSuccessMessage('Registration successful! You can now log in.');
      setErrors([]);
    } catch (error) {
      console.error('Signup failed:', error);
      setErrors(['Registration failed. Please try again later.']);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {successMessage && <p className="success">{successMessage}</p>}
      {errors.length > 0 && (
        <ul className="error">
          {errors.map((error, index) => <li key={index}>{error}</li>)}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" required />
        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" required />
        <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
        <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" required />
        <input type="text" name="country" value={formData.country} onChange={handleInputChange} placeholder="Country" required />
        <input type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder="Username" required />
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" required />
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Confirm Password" required />
        
        <h3>Security Questions</h3>
        <input type="text" name="securityQuestion1" value={formData.securityQuestion1} onChange={handleInputChange} placeholder="What is your favorite book?" required />
        <input type="text" name="securityQuestion2" value={formData.securityQuestion2} onChange={handleInputChange} placeholder="What was the name of your first pet?" required />
        <input type="text" name="securityQuestion3" value={formData.securityQuestion3} onChange={handleInputChange} placeholder="What city were you born in?" required />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
