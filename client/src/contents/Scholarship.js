import React, { useContext, useState, useEffect } from 'react';
import ScholarshipList from '../components/ScholarshipList.js';
import { WebContext } from '../App';

function Scholarship(props) {
  const { Content } = useContext(WebContext)
  const [content, setContent] = Content;

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="frame-content">
      <div className="head-content d-flex">
         
          <div className="icons">
            <i className="bi bi-card-list"></i>
          </div>  
          <div className="topic">
            <h4>ทุนที่เปิดให้ลงทะเบียน</h4>
          </div>
        
          <button className = "button-add d-flex" type = "button" onClick={ () => setContent('ScholarshipListCreate') } >
            <i className="bi bi-plus-lg"/>
            <p>สร้างทุน</p>
          </button>
      </div>
      <div className="frame-subcontent1">
        <ScholarshipList/>
      </div>
    </div>
  )
}

export default Scholarship;
