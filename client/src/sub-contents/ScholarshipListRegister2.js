import React, { useState } from 'react';


function ScholarshipListRegister2() {
  return (
    <div className="frame-content">
        <div className="head-content d-flex">
            <div className="icons">
                <i className="bi bi-three-dots"></i>
            </div>
            <div class="topic">
              <h4>ใบสมัครทุนการศึกษา</h4>
            </div>
        </div>
        <div className="forms-list">
        <center>
          
          <h5>กรอกประวัติแรกเข้า</h5>
        </center>
        <form className="form-profile">
          <div>
            <label>ชื่อ - นามสกุล(ภาษาไทย)</label><br></br>
            <input placeholder="ชื่อภาษาไทย" required></input>
          </div>
          <div>
            <label>นิสิตชั้นปีที่</label><br></br>
            <select className="form-select form-select-lg mb-3" required>
              <option value="0">เลือก</option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </select>
          </div>
          <div>
            <label>อายุ</label><br></br>
            <input placeholder="อายุ" required></input>
          </div>
          <div>
            <label>รหัสนิสิต</label><br></br>
            <input placeholder="รหัสนิสิต" required></input>
          </div>
          <div>
            <label>ภาคการเรียนการสอน</label><br></br>
            <select className="form-select form-select-lg mb-3" required>
              <option value="0">เลือก</option>
              <option value="ภาคปกติ">ภาคปกติ</option>
              <option value="ภาคพิเศษ">ภาคพิเศษ</option>
            </select>
          </div>
          
          <div>
            <label>สาขา</label><br></br>
            <select className="form-select form-select-lg mb-3" required>
                <option value="0">เลือก</option>
                <option value="5">คอมพิวเตอร์</option>
                <option value="4">ไฟฟ้า</option>
                <option value="4">เครื่องกล</option>
                <option value="4">หุ่นยนต์</option>
            </select>
          </div>
          <div>
            <label>คะแนนเฉลี่ยนสะสม(GPA)</label><br></br>
            <input placeholder = "คะแนนเฉลี่ยสะสม(GPA)" required></input>
          </div>
          <div>
            <label>ที่อยู่ปัจจุบัน(ที่ติดต่อได้สะดวก)</label><br></br>
            <input placeholder = "ที่อยู่ปัจจุบัน" required></input>
          </div>
          <div>
            <label>เบอร์โทรศัพท์</label><br></br>
            <input placeholder = "เบอร์โทรศัพท์" required></input>
          </div>
        </form>
        <button>Next</button>
      </div>
  
    </div>
    
  );
}

export default ScholarshipListRegister2