/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { WebContext } from '../../App.js';

function MemberList(props){

  const { Content, EditProfileID } = useContext(WebContext)
  const [content, setContent] = Content;
  const [editProfileID, setEditProfileID] = EditProfileID;

  const { Query, RoleQuery} = useContext(WebContext);
  const [query, setQuery] = Query;
  const [roleQuery, setRoleQuery] = RoleQuery;
  const [User,setUser] = useState([]);
  
  const getUser = () =>{
    Axios.get("http://localhost:5000/getAllUser").then(response => {
      setUser(response.data)
    })
  }
  
  useEffect(() => {
    getUser();
  }, [])
  
  return (
    User.filter(
      user => user.fname.toLowerCase().includes(query.toLowerCase()) && (roleQuery === '' ? true : user.role === roleQuery)
    ).map((user, index) => (
      
      <div className="list2" key={index}>

        <div className="list2-left">
          <p className='text1'>{user.fname} {user.lname} <br/> ({user.email})</p>
        </div>
        
        <div className="list2-right">
          <button className="button-small sky" type="button" onClick={() => { setEditProfileID(user.id);setContent("FormProfile"); }}> 
            โปรไฟล์
          </button>
        </div>
            
      </div>
    ))
  )
  
}

export default MemberList;