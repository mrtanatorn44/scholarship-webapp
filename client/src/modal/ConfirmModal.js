import { React, useState, useEffect } from 'react';
import './ConfirmModal.css';
import AdminAnnouncement from '../contents/admin/Announcement.js';
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
        <div class="modal-content" >
          <div class="modal-body">
            <center>Are you sure?</center>
          </div>
          <div class='d-flex'>
            <button class = "button" onClick={() => props.sendConfirm(true)}>yes</button>
            <button class = "button" onClick={() => props.sendConfirm(false)}>no</button>
            
          </div>
        </div>
      </div>
    );
  }

  export default ConfirmModal;