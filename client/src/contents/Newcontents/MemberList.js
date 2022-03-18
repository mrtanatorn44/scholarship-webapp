/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { WebContext } from '../../App.js';

function MemberList(props){

  const { Content, EditProfileID } = useContext(WebContext)
  const [content, setContent] = Content;
  const [editProfileID, setEditProfileID] = EditProfileID;

  const { Query } = useContext(WebContext);
  const [query, setQuery] = Query;
  const [User,setUser] = useState([]);
  
  const getUser = () =>{
    Axios.get("http://localhost:5000/getUser").then(response => {
      setUser(response.data)
    })
  }
  
  useEffect(() => {
    getUser();
  }, [])


  
  return (
    User.filter( user => {
      return user.fname.toLowerCase().includes(query.toLowerCase())
    }).map((user, index) => (
      
      <div className="container1 list2 d-flex" key={index}>

            <div className="name">
              <p>Name : {user.fname} {user.lname}</p>
            </div>
            
            <div className="right">
              <button className="button-2 d-flex" type="button" onClick={() => { setEditProfileID(user.id);setContent("FormProfile"); }}> 
                <i class="bi bi-card-checklist green1"></i>
                <p>ข้อมูลสมาชิก</p>
              </button>
            </div>
            
      </div>
    ))
  )
  
}

export default MemberList;