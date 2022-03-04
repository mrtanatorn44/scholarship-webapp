import React, { createContext, useState } from 'react'
import Controller from './Controller'

const WebContext = createContext();

function WebContextProvider ({ children }) {

  const [announce,setAnnounce]                        = useState([]);  
  const [scholarshipCreate, setScholarshipCreate] = useState('');
  const [query, setQuery]                             = useState('');
  const [editProfileID, setEditProfileID]             = useState(-1);
  const [editAnnounceID, setEditAnnounceID]           = useState();
  const [content, setContent]                         = useState("");
  const [profile, setProfile]                         = useState('');
  const [scholar, setScholar]                         =useState({
    sponser_id : '', 
    is_public:'', 
    type : '', 
    create_date :'',  
    amount : '', 
    detail :'',
    min_student_year : '', 
    max_student_year : '', 
    on_year : '', 
    on_term : '',
    open_date : '',
    close_date:''
  })
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
    Announce            : [announce, setAnnounce],
    EditAnnounceID      : [editAnnounceID, setEditAnnounceID],
    EditProfileID       : [editProfileID, setEditProfileID],
    ScholarshipCreate   : [scholarshipCreate, setScholarshipCreate],
    User                : [user, setUser],
    Content             : [content, setContent],
    Query               : [query, setQuery],
    Profile             : [profile, setProfile],
    Scholar             : [scholar, setScholar]
	}

  return (
    <WebContext.Provider value={GlobalValue}>
      <Controller/>
      {children}
    </WebContext.Provider>
  )
}

export { WebContext, WebContextProvider};