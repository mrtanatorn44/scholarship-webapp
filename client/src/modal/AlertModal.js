import React, {useState} from 'react';
import './AlertModal.css';

function AlertModel() {

  const [showModal, setShowModal] = useState(false);
  return (
    <div class="modal">
      <div class="modal-content" >
        <div class="modal-body">
          <center class = "icon"><i class="bi bi-clock"></i></center><br></br>
          <center>วันที่ 30 กุมภาพันธ์ 2570</center><br></br>
          <center>เวลา : 12.00 น.</center><br></br>
          <center>รหัส Meeting : qweasd</center><br></br>
          <center>ลิงค์สัมภาษณ์ : http.//.com</center><br></br>
        </div>
      </div>
    </div>
  );
}

export default AlertModel;
