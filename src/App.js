import React, { useState } from 'react';
import './App.css';
import Hero from './components/Hero';
import Images from './components/Images';
import SignIn from './components/LogIn';
import { useAuth } from './components/authContext';

function App() {
  const { currentUser, signIn, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="container mt-5">
      {currentUser ? (
        <>
          <Hero />
          <Images />
          <button
            onClick={handleSignOut}
            className="btn btn-danger mr-2"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <button
            onClick={handleSignIn}
            className="btn btn-primary"
          >
            Sign In
          </button>
        </>
      )}
    </div>
  );
}

export default App;









// <div className="App">
//   {isAuthorized ? (
//     // Render these components when user is authorized
//     <>
//       <Hero />
//       <Images />
//     </>
//   ) : (
//     // Render the SignIn component when user is not authorized
//     <SignIn />
//   )}
// </div>