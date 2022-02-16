import React, { useState } from 'react';
import './AnnouncementCreate.css';
import ConfirmModal from '../modal/ConfirmModal.js';



function AnnouncementCreate(props) {
  /*xxxx*/
  const [showModal, setShowModal] = useState(false);

  
  
  function getConfirm(data) {
    if (data) {
      //alert('TRUE !')
      // PUSH DATA TO DATABASE
      // CLOSE OR SAVE
      props.sendContent(['admin','Announcement']);
    } else {
      //alert('FALSE !')
    }
    setShowModal(false);
  }

  return (
    <div class="announcementCreate">
      <div class="header d-flex">
        <div class="column-left d-flex">
          <div class="icon-plus">
            <i class="bi bi-plus-lg"></i>
          </div>
          <h4>เพิ่มข่าวสาร</h4>
        </div>

        <div class='column-center'></div>

        <div class="column-right d-flex">
          
            <button class="savebutton" onClick={() => (setShowModal(true))}>
              <i class="bi bi-save"></i>
            </button>
            {showModal && <ConfirmModal sendConfirm={getConfirm}/>}
            
            <button class="cancelbutton" onClick={() => (setShowModal(true))}>
              <i class="bi bi-x"></i>
            </button>
            {showModal && <ConfirmModal sendConfirm={getConfirm}/>}

          
          
        </div>
      </div>

      <div className="center d-flex">
        <form>
          <div class="topic">
            <input type="text" placeholder="หัวข้อข่าว"></input>
          </div>
          
          <br></br>
          <div class="detail">
            <input type="text" placeholder="รายละเอียดข่าวสาร"></input>
          </div>

          <br></br>
          <div class="add-row-bottom d-flex">
            <div class="date">
              <input type="text" placeholder="วัน/เดือนปี ที่ลงข่าว"></input>
            </div>
            <div class="insertbutton d-flex">
              <button>
                  <i class="bi bi-card-image"></i>  
              </button>
              <p>เพิ่มรูปภาพ</p>
            </div>
          </div>
            
           
        </form>
      </div> 
    </div>
  );
}

export default AnnouncementCreate;
