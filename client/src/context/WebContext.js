import React, { createContext, useState } from 'react'
import Controller from '../controller/Controllers'

const WebContext = createContext();

function WebContextProvider ({ children }) {

  // Form
  const [scholarshipForm, setScholarshipForm]         = useState('');
  const [attrForm, setAttrForm]                       = useState([]);
  const [fileForm, setFileForm]                       = useState([]);
  const [rateForm, setRateForm]                       = useState([]);

  // Search Filter
  const [query, setQuery]                             = useState('');
  const [statusQuery, setStatusQuery]                 = useState('');
  const [typeQuery, setTypeQuery]                     = useState('');
  const [roleQuery, setRoleQuery]                     = useState('');
  const [termQuery, setTermQuery]                     = useState('');
  const [yearQuery, setYearQuery]                     = useState('');
  const [donatorQuery, setDonatorQuery]               = useState('');

  // LocalStorage
  const [editProfileID, setEditProfileID]             = useState(-1);
  const [editAnnounceID, setEditAnnounceID]           = useState();
  const [editScholarshipID,setEditScholarshipID]      = useState();

  const [allScholarship, setAllScholarship]           = useState([]);
  const [content, setContent]                         = useState("");
  const [profile, setProfile]                         = useState('');
  const [sponsor, setSponsor]                         = useState('');
  const [announce,setAnnounce]                        = useState([]);  
  const [scholarshipList, setScholarshipList]         = useState([]);
  const [user, setUser]                               = useState({
    id      : '',
    imgUrl  : '',
    email   : '',
    name    : '',
    fname   : '',
    lname   : '',
    role    : '',
    isLogin : false
  });

  const GlobalValue = { 
    AllScholarship      : [allScholarship, setAllScholarship],
    EditScholarshipID   : [editScholarshipID,setEditScholarshipID],
    Announce            : [announce, setAnnounce],
    EditAnnounceID      : [editAnnounceID, setEditAnnounceID],
    EditProfileID       : [editProfileID, setEditProfileID],
    User                : [user, setUser],
    Content             : [content, setContent],
    Profile             : [profile, setProfile],
    ScholarshipForm     : [scholarshipForm, setScholarshipForm],
    ScholarshipList     : [scholarshipList, setScholarshipList],
    Sponsor             : [sponsor,setSponsor],

    Query               : [query, setQuery],
    StatusQuery         : [statusQuery, setStatusQuery],
    TypeQuery           : [typeQuery, setTypeQuery],
    YearQuery           : [yearQuery, setYearQuery],
    TermQuery           : [termQuery, setTermQuery],
    DonatorQuery        : [donatorQuery , setDonatorQuery],
    RoleQuery           : [roleQuery, setRoleQuery],

    AttrForm            : [attrForm, setAttrForm],
    FileForm            : [fileForm, setFileForm],
    RateForm            : [rateForm, setRateForm],
	}

  return (
    <WebContext.Provider value={GlobalValue}>
      <Controller/>
      {children}
    </WebContext.Provider>
  )
}

export { WebContext, WebContextProvider};