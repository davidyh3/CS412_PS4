import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function WithAuth(Component) {
  function AuthenticatedComponent(props) {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      // Check if the user is already authenticated
      const user = window.localStorage.getItem("auth");
      if (user) {
        setIsLoggedIn(true);
      } else {
        // If the user is not authenticated, redirect to the login page
        navigate('/login');
      }

      // Check the user's authentication status every 5 seconds
      const interval = setInterval(() => {
        const user = window.localStorage.getItem("auth");
        if (user) {
          setIsLoggedIn(true);
          clearInterval(interval);
        } else {
          navigate('/login');
        }
      }, 10);

      return () => clearInterval(interval);

    }, [navigate]);

    return isLoggedIn ? <Component {...props} /> : null;
  }

  return AuthenticatedComponent;
}

export default WithAuth;