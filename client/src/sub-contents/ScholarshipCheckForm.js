import { React, useState, useEffect } from 'react';
import './ScholarshipCheckForm.css';
import myForm from '../components/ScholarshipFormFormat.js'

function ScholarshipCheckForm() {
  return (
    <div class="scholarshipCheckForm">
        <div class="header d-flex">
            <div class="icon-three-dots">
                <i class="bi bi-three-dots"></i>
                
            </div>
            <h4>ตรวจสอบข้อมูล</h4>
            
        </div>
        <div class="forms-list">
          <myForm/>
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
            <select class="form-select form-select-lg mb-3" required>
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
            <select class="form-select form-select-lg mb-3" required>
              <option value="0">เลือก</option>
              <option value="ภาคปกติ">ภาคปกติ</option>
              <option value="ภาคพิเศษ">ภาคพิเศษ</option>
            </select>
          </div>
          
          <div>
            <label>สาขา</label><br></br>
            <select class="form-select form-select-lg mb-3" required>
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
          <div class="form-checks d-flex">
              <div class="form-check-true">
                <input type="radio" id="check1"></input>
                <label for="check1">สมบูรณ์</label>
              </div>
              
              <div class="form-check-false">
                <input type="radio" id="check2"></input>
                <label for="check2">ไม่สมบูรณ์</label>
              </div> 
          </div>

          <div class="form-note">
            <div class="note">
              <label>หมายเหตุ</label><br></br>
              <input></input>
            </div>
          </div>
        </form>

        <div class="form-footer">
          <div class="next-p1 d-flex">
            <p>หน้า 1</p>
            <button>Next</button>
          </div>
        </div>
      </div>
  
    </div>
    
  );
}

export default ScholarshipCheckForm;
