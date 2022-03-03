import React, { useReducer, useState } from "react";
import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage.js';
import MainPage from './pages/MainPage.js';

import './App.scss';

const WebContext = React.createContext();

function App() {

  const [scholarShipCreate, StudentScholarshipCreate] = useState('');
  const [query, setQuery] = useState('');
  const [editAnnounceID, setEditAnnounceID] = useState(-1);
  const [content, setContent] = useState("Announcement");
  const [profile, setProfile] = useState('');

  const [user, setUser] = useState({
    id    : '',
    imgUrl: '',
    email : '',
    name  : '',
    fname : '',
    lname : '',
    role  : '',
    isLogin: false
  });

  const webValue = { 
    EditAnnounceID: [editAnnounceID, setEditAnnounceID],
    ScholarShipCreate: [scholarShipCreate, StudentScholarshipCreate],
    User: [user, setUser],
    Content: [content, setContent],
    Query: [query, setQuery],
    Profile: [profile, setProfile]
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
