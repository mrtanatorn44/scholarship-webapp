import React from "react";
import { Routes, Route } from 'react-router-dom';
import { WebContext, WebContextProvider} from "./context/WebContext.js";

import LoginPage from './pages/LoginPage.js';
import MainPage from './pages/MainPage.js';

import './App.scss';
import 'react-image-lightbox/style.css';

function App() {
  return (
    <WebContextProvider>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/main" element={<MainPage/>} />
        </Routes>
      </div>
    </WebContextProvider>
  );
}

export { WebContext };
export default App;
