import { React, useState, useEffect } from 'react';
import './ConfirmModal.css';
import AdminAnnouncement from '../contents/Announcement.js';
import ReactDOM from "react-dom";
import Axios from 'axios';


function ConfirmModal(props) { 
    const content = 'AdminAnnouncement';
    const sendContent = (props) => {
     
    }
    const getPermission =()=>{
        alert('fetching...');
    
        Axios.get("http://localhost:5000/product").then((response)=>{
          alert(response.data);
        });  
      }
    //const [showModal, setShowModal] = useState(false);

    return (
      <div class="modal">
        <div class="modal-confirm" >
          <div class="modal-head">
            <h3>Are you sure?</h3>
          </div>
          <div class='button-confirm d-flex'>
            <button class = "button-f" onClick={() => props.sendConfirm(false)}>ยกเลิก</button>
            <button class = "button-t" onClick={() => props.sendConfirm(true)}>ตกลง</button>
          </div>
        </div>
      </div>
    );
  }

  export default ConfirmModal;