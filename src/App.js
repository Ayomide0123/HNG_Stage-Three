import React from 'react';
import './App.css';
import Hero from './components/Hero';
import Images from './components/Images';
import SignIn from './components/LogIn';
import Navbar from './components/Navbar';
import profileImage from './img/user.jpg';
import { useAuth } from './components/authContext';

function App() {
  const { currentUser, signOut } = useAuth();
  const username = 'User';

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
          <Navbar username={username} profileImage={profileImage} />
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
        <SignIn />
      )}
    </div>
  );
}

export default App;
