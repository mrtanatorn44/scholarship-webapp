import React, { useContext } from 'react'
import { WebContext } from '../context/WebContext';

// Import controller component
import MainController from './MainController';
import LoginController from './LoginController';
import ScholarshipController from './ScholarshipController';

function Controllers() {
  return (
    <>
      <MainController/>
      <LoginController/>
      <ScholarshipController/>
    </>
  )
}

export default Controllers;