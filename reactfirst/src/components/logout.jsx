import React from 'react';
import './Header.css';
import { useState, useEffect } from 'react';
import profile from '../components/bitmap.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';

library.add(faSignOut);

const Logout = () => {
  const navigate = useNavigate(); // Change from history to navigate
  
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    fetchUserEmail();
  }, []); // Fetch user email on component mount

  const fetchUserEmail = async () => {
    try {
      const response = await axios.get('http://localhost:5255/api/Users/omar%40gmail.com'); 
      setUserEmail(response.data.email);
    } catch (error) {
      console.error('Error fetching user email:', error);
    }
  };
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5255/api/Users/logout');

      if (response.status === 200) {
        // redirect to login page
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="profile-box">
      <div className="profile-pic">
        <img src={profile} alt="Profile Picture" />
      </div>
      <div className="info">
        <p className='email'>{userEmail}</p>
        <p><a className="logout-btn" onClick={handleLogout}><span className='lo'>Logout <FontAwesomeIcon icon={faSignOut} className='fa-sign-out'/></span></a></p>
      </div>
    </div>
  );
};

export default Logout;
