import { React, useState, useEffect } from 'react';
import './ConfirmModal.css';
import ReactDOM from "react-dom";

import Axios from 'axios';

function ConfirmModal(props) { 
  /*
  const content = 'AdminAnnouncement';
  const sendContent = (props) => {
  }
  const getPermission =()=>{
      alert('fetching...');
      Axios.get("http://localhost:5000/product").then((response)=>{
        alert(response.data);
      });  
    }
  */
  return (
    <div className="modal">
      <div className="modal-confirm" >
        <div className="modal-head">
          <h3>Are you sure?</h3>
        </div>
        <div className='button-confirm d-flex'>
          <button className="button-f" onClick={() => props.sendConfirm(false)}>ยกเลิก</button>
          <button className="button-t" onClick={() => props.sendConfirm(true)}>ตกลง</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;