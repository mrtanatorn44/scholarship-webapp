import React, { useContext } from 'react'
import { WebContext } from '../context/WebContext';

// Import controller component
import MainController from './MainController';
import LoginController from './LoginController';

function Controllers() {
  return (
    <>
      <MainController/>
      <LoginController/>
    </>
  )
}

export default Controllers;