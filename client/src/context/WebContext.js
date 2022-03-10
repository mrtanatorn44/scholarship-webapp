import React, { createContext, useState } from 'react'
import Controller from '../controller/Controllers'

const WebContext = createContext();

function WebContextProvider ({ children }) {

  const [announce,setAnnounce]                        = useState([]);  
  const [query, setQuery]                             = useState('');

  const [fileForm, setFileForm]                       = useState([])
  const [editProfileID, setEditProfileID]             = useState(-1);
  const [editAnnounceID, setEditAnnounceID]           = useState();
  const [editScholarshipID,setEditScholarshipID]      = useState();
  const [content, setContent]                         = useState("");
  const [profile, setProfile]                         = useState('');
  const [sponsor, setSponsor]                         = useState('');
  const [scholarshipForm, setScholarshipForm]         = useState('');
  const [scholarshipList, setScholarshipList]         = useState([]);
  const [user, setUser]                               = useState({
    id    : '',
    imgUrl: '',
    email : '',
    name  : '',
    fname : '',
    lname : '',
    role  : '',
    isLogin: false
  });

  
  
  

  const GlobalValue = { 

    EditScholarshipID    :[editScholarshipID,setEditScholarshipID],
    Announce            : [announce, setAnnounce],
    EditAnnounceID      : [editAnnounceID, setEditAnnounceID],
    EditProfileID       : [editProfileID, setEditProfileID],
    User                : [user, setUser],
    Content             : [content, setContent],
    Query               : [query, setQuery],
    Profile             : [profile, setProfile],
    ScholarshipForm     : [scholarshipForm, setScholarshipForm],
    ScholarshipList     : [scholarshipList, setScholarshipList],
    Sponsor             : [sponsor,setSponsor],
    FileForm            : [fileForm, setFileForm]
	}

  return (
    <WebContext.Provider value={GlobalValue}>
      <Controller/>
      {children}
    </WebContext.Provider>
  )
}

export { WebContext, WebContextProvider};