import { React } from 'react';
import ScholarshipList from '../components/ScholarshipList.js';
import './SchlorshipList.css';

function Scholarship(props) {

  return (
    <div className="frame-content">
      <div className="head-content d-flex">
        
          <div className="icon-news">
            <i className="bi bi-card-list"></i>
          </div>  
          <div className="topic">
            <h4>ทุนที่เปิดให้ลงทะเบียน</h4>
          </div>
        
          <button className = "button-add d-flex" type = "button" onClick={ () => props.sendContent(['admin', 'ScholarshipListCreate']) } >
            <i className="bi bi-plus-lg"/>
            <p>สร้างทุน</p>
          </button>
      </div>
      <div className="frame-subcontent">
        <ScholarshipList/>
      </div>
    </div>
  )
}

export default Scholarship;
