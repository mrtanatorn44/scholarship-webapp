import { React } from "react";
import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage.js';
import MainPage from './pages/MainPage.js';

import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/main" element={<MainPage/>} />
      </Routes>
    </div>
  );
}

export default App;
