import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SchlorshipList.css';
//import AdminScholarshipListCreate   from '../sub-contents/admin/ScholarshipListCreate.js';

function ScholarshipList(props) {

  const navigate = useNavigate();
  const content = 'AdminScholarshipListCreate';
  
  const sendContent = (props) => {
    
  }

  return(
    <div class="schlorshiplist">

        <div class="header d-flex">
            <div class="icon-card-list">
                <i class="bi bi-card-list"></i>
            </div>
            <h4>ทุนที่เปิดให้ลงทะเบียน</h4>

            <button class = "add-capital d-flex" type = "button" onClick={ () => props.sendContent(['admin', 'ScholarshipListCreate']) } >
                <i class="bi bi-plus-lg"></i>
                <p>สร้างทุน</p>
            </button>
        </div>
    </div>
  );
}

export default ScholarshipList;

