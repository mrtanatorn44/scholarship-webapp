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
    <div className="announcementCreate">
      <div className="header d-flex">
        <div className="column-left d-flex">
          <div className="icon-plus">
            <i className="bi bi-plus-lg"></i>
          </div>
          <h4>เพิ่มข่าวสาร</h4>
        </div>

        <div className='column-center'></div>

        <div className="column-right d-flex">
          
            <button className="savebutton" onClick={() => (setShowModal(true))}>
              <i className="bi bi-save"></i>
            </button>
            {showModal && <ConfirmModal sendConfirm={getConfirm}/>}
            
            <button className="cancelbutton" onClick={() => (setShowModal(true))}>
              <i className="bi bi-x"></i>
            </button>
            {showModal && <ConfirmModal sendConfirm={getConfirm}/>}

          
          
        </div>
      </div>

      <div className="center d-flex">
        <form>
          <div className="topic">
            <input type="text" placeholder="หัวข้อข่าว"></input>
          </div>
          
          <br></br>
          <div className="detail">
            <input type="text" placeholder="รายละเอียดข่าวสาร"></input>
          </div>

          <br></br>
          <div className="add-row-bottom d-flex">
            <div className="date">
              <input type="text" placeholder="วัน/เดือนปี ที่ลงข่าว"></input>
            </div>
            <div className="insertbutton d-flex">
              <button>
                  <i className="bi bi-card-image"></i>  
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
