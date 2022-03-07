import React, { useContext, useEffect, useState } from 'react'
import { WebContext } from '../context/WebContext';
import { useNavigate, Navigate } from 'react-router-dom';
import Axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const { User, Content, Announce } = useContext(WebContext);
  const           [ user, setUser ] = User;

  useEffect(() => { 
    if (localStorage.getItem('isSignedIn') === 'true') {
      navigate('/main');
    } else  {
      navigate('/');
    }
  }, [user])

  return null;
}

export default Login