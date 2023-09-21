import React, { useState } from 'react';
import { useAuth } from './authContext';
import './LogIn.css'; // Import the CSS file

function SignIn() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    // Validate email
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignIn = async () => {
    if (validateForm()) {
      try {
        await signIn(email, password);
      } catch (error) {
        console.error('Error signing in:', error);
      }
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
        <span className="error-message">{errors.email}</span>
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
        <span className="error-message">{errors.password}</span>
      </div>
      <button onClick={handleSignIn} className="btn btn-primary">
        Sign In
      </button>
    </div>
  );
}

export default SignIn;
