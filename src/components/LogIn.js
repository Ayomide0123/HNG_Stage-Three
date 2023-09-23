import React, { useState } from 'react';
import { useAuth } from './authContext';
import './LogIn.css';


function SignIn() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [signInError, setSignInError] = useState('');


  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };
  
    // Remove extra spaces from the email address
    const trimmedEmail = email.trim();
  
    if (!trimmedEmail) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
  
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
    setSignInError(''); // Clear any previous error messages
    console.log('Attempting sign-in');
  
    if (validateForm()) {
      try {
        await signIn(email, password);
        console.log('Sign-in successful');
      } catch (error) {
        // Display the error message to the user
        setSignInError(error.message);
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
      {signInError && <div className="error-message">{signInError}</div>}
      <button onClick={handleSignIn} className="btn btn-primary">
        Sign In
      </button>
      <div className="mt-3">
        <p>First time? <span className="text-primary links">Sign up</span></p>
        <p><span className="text-primary links">Forgot your password?</span></p>
      </div>
    </div>
  );
}

export default SignIn;
