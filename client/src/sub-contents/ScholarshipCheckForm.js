import { React, useState, useEffect } from 'react';
import './ScholarshipCheckForm.css';

function ScholarshipCheckForm() {
  return (
    <div className="scholarshipCheckForm">
        <div className="header d-flex">
            <div className="icon-three-dots">
                <i className="bi bi-three-dots"></i>
            </div>
            <h4>ตรวจสอบข้อมูล</h4>
        </div>
        <div className="forms-list">
          <center>
            <h5>ตรวจสอบข้อมูล</h5>
          </center>
        <form className="form-profile">
          <div>
            <label>ชื่อ - นามสกุล (ภาษาไทย)</label><br></br>
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

        <form>
          <div className="form-checks d-flex">
              <div className="form-check-true">
                <input type="radio" id="check1"></input>
                <label for="check1">สมบูรณ์</label>
              </div>
              
              <div className="form-check-false">
                <input type="radio" id="check2"></input>
                <label for="check2">ไม่สมบูรณ์</label>
              </div> 
          </div>

          <div className="form-note">
            <div className="note">
              <label>หมายเหตุ</label><br></br>
              <input></input>
            </div>
          </div>
        </form>

        <div className="form-footer">
          <div className="next-p1 d-flex">
            <p>หน้า 1</p>
            <button>Next</button>
          </div>
        </div>
      </div>
  
    </div>
    
  );
}

export default ScholarshipCheckForm;
