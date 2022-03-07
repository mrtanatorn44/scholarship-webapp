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


  
    return(
    /*
    setEditAnnounceID(news.id)
     */
      
      User.filter( user => {
        if(query === ''){
          return user;
        }else if(user.fname.toLowerCase().includes(query.toLowerCase())){
          return user;
        }
      }).map((user, index) => (
        <div className="roleList" key={index}>
          <div className="roleList-form">
            <div className="d-flex">
              <div className="name">
                <p>Name : {user.fname} {user.lname}</p>
              </div>
              
              <div className="memberList-right">
                <button className="button-checklist d-flex" type="button" onClick={() => { setEditProfileID(user.id);setContent("FormProfile"); }}> 
                  <i class="bi bi-card-checklist"></i>
                  <p>ข้อมูลสมาชิก</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))
    )
  }
  
  export default MemberList;