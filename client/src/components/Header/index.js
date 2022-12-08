import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss'
import heroImage from '../../images/homeBackground.png'

import Auth from '../../utils/auth';

const Header = () => {

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };




  return (
    <header >
   
        <Link className="" to="/">
          <h1 >
            MIGRATE
          </h1>
        </Link> 
        <nav className='navbar'>
          {Auth.loggedIn() ? (
            <button className="" onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <Link className="navLink" to="/login">
                Login
              </Link>
              <Link className="navLink" to="/signup">
                Signup
              </Link>
            </>
          )}
        </nav> 
     
    </header >
  );
};

export default Header;
