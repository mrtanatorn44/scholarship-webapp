import React, { useState } from 'react';
import './ScholarshipListCreate.css';
import ConfirmModal from '../../modal/ConfirmModal.js';
import Axios from "axios";

function ScholarshipListCreate(props) {

  const [showModal, setShowModal] = useState(false);

  
  
  function getConfirm(data) {
    if (data) {
      //alert('TRUE !')
      // PUSH DATA TO DATABASE
      // CLOSE OR SAVE
      props.sendContent(['admin','AdminScholarshipList']);
    } else {
      //alert('FALSE !')
    }
    setShowModal(false);
  }

  const createSCLS = () => {
    console.log("sdasd");
    Axios.post("http://localhost:5000/creatSCLS", {
      sclsType : "ทุนเรียนดี",
      sclsYears : 2565,
      sclsAttribute :"บัตรประชา",
      sclsSupporter : "นายก",
      sclsPrice : 15000
    })
  };

  return (
    <div class="schlorshiplistcreate">
      <div class="header d-flex">
        <div class="column-left d-flex">
          <div class="icon-plus">
            <i class="bi bi-plus-lg"></i>
          </div>
          <h4>เพิ่มทุน</h4>
        </div>

        <div class='column-center'></div>

        <div class="column-right d-flex">
          
            <button class="savebutton" onClick={() => (setShowModal(true), alert('SAVE'))}>
              <i class="bi bi-save"></i>
            </button>
            {showModal && <ConfirmModal sendConfirm={getConfirm}/>}
            
            <button class="cancelbutton" onClick={() => (setShowModal(true), alert('CANCEL'))}>
              <i class="bi bi-x"></i>
            </button>
            {showModal && <ConfirmModal sendConfirm={getConfirm}/>}

          
          
        </div>
      </div>

      <div className="center">
        <form>
          <div class="topic">
            <input type="text" placeholder="ประเภททุน"></input>
            <input type="text" placeholder="ประจำปีการศึกษา"></input>
          </div>
          
          <br></br>
          <div class="detail">
            <input type="text" placeholder="คุณสมบัติผู้รับทุน"></input>
          </div>

          <br></br>
          <div class="add-row-bottom d-flex">
            <div class="contributor">
              <input type="text" placeholder="ผู้สนับสนุน"></input>
            </div>
            <div class="contributor2">
              <input type="text" placeholder="จำนวนเงิน"></input>
            </div>
            <div class="insertbutton d-flex">

              <p>หน้า1</p>
              <button type = "button" onClick ={ ()=> createSCLS()}>
                next
              </button>
            </div>
          </div>
            
           
        </form>
      </div> 
    </div>
  );
}


export default ScholarshipListCreate;
