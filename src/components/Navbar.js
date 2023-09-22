import React from 'react';
import './Navbar.css';

const Navbar = ({ username, profileImage }) => {
  return (
    <nav className="navbar">
      <div className="profile">
        <img src={profileImage} alt={`${username}'s Profile`} />
        <p>Welcome, {username}</p>
      </div>
    </nav>
  );
};

export default Navbar;
