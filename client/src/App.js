import React, { useReducer, useState } from "react";
import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage.js';
import MainPage from './pages/MainPage.js';

import './App.css';

const WebContext = React.createContext();

function App() {

  const [test1, setTest1] = useState('TEST1');
  const [test2, setTest2] = useState('TEST2');
  const [editAnnounceID, setEditAnnounceID] = useState(-1);

  const webValue = { 
		Test1: [test1, setTest1], 
		Test2: [test2, setTest2],
    EditAnnounceID: [editAnnounceID, setEditAnnounceID]
	}
  
  return (
    <WebContext.Provider value={webValue}>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/main" element={<MainPage/>} />
        </Routes>
      </div>
    </WebContext.Provider>
  );
}

export { WebContext };
export default App;
