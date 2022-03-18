/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import ScholarshipList from './ScholarshipList.js';
import { WebContext } from '../../App';

function Scholarship(props) {

  const { Content, User } = useContext(WebContext)
  const [ content, setContent] = Content;
  const [ user, setUser] = User;
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="frame">
      <div className="header">
    
        <div className="left">
          <div className="icons">
            <i className="bi bi-card-list"></i>
          </div>  
          <div className="topic">
            <h4>ทุนที่เปิดให้ลงทะเบียน</h4>
          </div>
        </div>

        <div className="right">
          { 
            user.role === 'admin' &&
            <button className = "button-add d-flex" type = "button" onClick={ () => setContent('ScholarshipCreate') } >
              <i className="bi bi-plus-lg green1"/>
              <p>สร้างทุน</p>
            </button> 
          }
        </div>

      </div>

      <div className="contents">
        <div className="content1">
          <ScholarshipList/>
        </div>
      </div> 
    </div>
  )
}

export default Scholarship;
//
