import React, { useState } from 'react';
import './ScholarshipListRegister.css';

function ScholarshipListRegister(props) {
  return (
    <div className="frame-content">
        <div className="head-content d-flex">
            <div className="icons">
                <i className="bi bi-three-dots"></i>
            </div>
            <div class="topic">
              <h4>กรอกประวัติแรกเข้า</h4>
            </div>
        </div>
        <div className="frame-subcontent3"> 
        <div class="name">
          <h5>กรอกประวัติแรกเข้า</h5>
        </div>
        <form className="scholarReg-form">
          <div>
            <label>ชื่อ-นามสกุล(ภาษาไทย)</label><br></br>
            <input placeholder="ชื่อภาษาไทย" required></input>
          </div>
          <br></br>
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
          <br></br>
          <div>
            <label>รหัสนิสิต</label><br></br>
            <input placeholder="รหัสนิสิต" required></input>
          </div>
          <br></br>
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
          <br></br>
          <div>
            <label>ที่อยู่ปัจจุบัน(ที่ติดต่อได้สะดวก)</label><br></br>
            <input placeholder = "ที่อยู่ปัจจุบัน" required></input>
          </div>
          <br></br>
          <div>
            <label>เบอร์โทรศัพท์</label><br></br>
            <input placeholder = "เบอร์โทรศัพท์" required></input>
          </div>
          <br></br>
          <div>
            <label>อัพโหลดรูปโปรไฟล์</label><br></br>
            <input type="file" placeholder = "รูปโปรไฟล์" required></input>
          </div>

          <div class="topic-fam">
            <h5>ประวัติครอบครัว</h5>
          </div>

          <div>
            <label>ชื่อ-นามสกุล(บิดา)</label><br></br>
            <input placeholder = "ชื่อภาษาไทย" required></input>
          </div> 
          <br></br>
          <div class="profile-fam d-flex">
            <div class="fam1-edit">
              <label>อายุ</label><br></br>
              <input className = "halfbar" placeholder="อายุ" required></input>
            </div>
            <div class="fam2-edit">
              <label>สถานะภาพ</label><br></br>
              <select className="form-select form-select-lg mb-3" required>
                <option value="0">เลือก</option>
                <option value="ยังมีชีวิตอยู่">ยังมีชีวิตอยู่</option>
                <option value="ถึงแก่กรรม">ถึงแก่กรรม</option>
              </select>
            </div>
          </div>

          <div class="profile-fam d-flex">
            <div class="fam1-edit">
              <label>อาชีพ</label><br></br>
              <input className = "halfbar" placeholder="ระบุอาชีพ" required></input>
            </div>
            <div class="fam2-edit">
              <label>เบอร์โทรศัพท์</label><br></br>
              <input className = "halfbar" placeholder="ระบุเบอร์โทรศัพท์" required></input>
            </div>
          </div>

          <div class="profile-fam d-flex">
            <div class="fam1-edit">
              <label>รายได้ต่อเดือน</label><br></br>
              <input className = "halfbar" placeholder="ระบุรายได้ต่อเดือน" required></input>
            </div>
            <div class="fam2-edit">
              <label>สถานที่ประกอบอาชีพ</label><br></br>
              <input className = "halfbar" placeholder="สถานที่ประกอบอาชีพ" required></input>
            </div>
          </div>
          <br></br>
          <div>
            <label>ที่อยู่ของบิดา</label><br></br>
            <input placeholder="ที่อยู่ของบิดา" required></input>
          </div>
          <br></br>
          <div>
            <label>ชื่อ-นามสกุล(มาราดา)</label><br></br>
            <input placeholder = "ชื่อภาษาไทย" required></input>
          </div>
          <br></br>
          <div class="profile-fam d-flex">
            <div class="fam1-edit">
              <label>อายุ</label><br></br>
              <input className = "halfbar" placeholder="อายุ" required></input>
            </div>
            <div class="fam2-edit">
              <label>สถานะภาพ</label><br></br>
              <select className="form-select form-select-lg mb-3" required>
                <option value="0">เลือก</option>
                <option value="ยังมีชีวิตอยู่">ยังมีชีวิตอยู่</option>
                <option value="ถึงแก่กรรม">ถึงแก่กรรม</option>
              </select>
            </div>
          </div>

          <div class="profile-fam d-flex">
            <div class="fam1-edit">
              <label>อาชีพ</label><br></br>
              <input className = "halfbar" placeholder="ระบุอาชีพ" required></input>
            </div>
            <div class="fam2-edit">
              <label>เบอร์โทรศัพท์</label><br></br>
              <input className = "halfbar" placeholder="ระบุเบอร์โทรศัพท์" required></input>
            </div>
          </div>

          <div class="profile-fam d-flex">
            <div class="fam1-edit">
              <label>รายได้ต่อเดือน</label><br></br>
              <input className = "halfbar" placeholder="ระบุรายได้ต่อเดือน" required></input>
            </div>
            <div class="fam2-edit">
              <label>สถานที่ประกอบอาชีพ</label><br></br>
              <input className = "halfbar" placeholder="สถานที่ประกอบอาชีพ" required></input>
            </div>
          </div>
          <br></br>
          <div>
            <label>ที่อยู่ของมารดา</label><br></br>
            <input placeholder="ที่อยู่ของมารดา" required></input>
          </div>
          <br></br>
          <div>
          <label>สถานะสมรสบิดา-มารดา</label><br></br>
            <select className="form-select form-select-lg mb-3" required>
                <option value="0">เลือก</option>
                <option value="แยกกันอยู่">แยกกันอยู่</option>
                <option value="หย่าร้าง">หย่าร้าง</option>
                <option value="อยู่ด้วยกัน">อยู่ด้วยกัน</option>
            </select>
          </div>
          <div>
            <p>พี่น้องร่วมบิดา มารดาและระดับการศึกษาหรืออาชีพ เรียงตามลำดับดังนี้(รวมนิสิตผู้สมัครด้วย) </p>
          </div>
          <div>
            <label>ชื่อ-นามสกุล</label><br></br>
            <input placeholder="ชื่อ-นามสกุล" required></input>
          </div>
          <br></br>
          <div>
            <label>ระดับการศึกษา</label><br></br>
            <input placeholder="ระดับการศึกษา" required></input>
          </div>
          <br></br>
          <div>
            <label>อาชีพ</label><br></br>
            <input placeholder="อาชีพ" required></input>
          </div>
          <br></br>
          <div>
            <label>สถานที่ประกอบอาชีพ/สถานศึกษา</label><br></br>
            <input placeholder="สถานที่ประกอบอาชีพ/สถานศึกษา" required></input>
          </div>
          <div class="topic-doc">
            <h5>เอกสารที่นิสิตต้อง Upload</h5>
          </div>
          <div>
            <label>สำเนาบัตรประชาชน</label><br></br>
            <input type="file" placeholder = "สำเนาบัตรประชาชน" required></input>
          </div>
          <br></br>
          <div>
            <label>แบบจิตอาสา กยศ.</label><br></br>
            <input type="file" placeholder = "แบบจิตอาสา กยศ." required></input>
          </div>
          <br></br>
          <div>
            <label>ใบแจ้งหนี้ค่าลงทะเบียน</label><br></br>
            <input type="file" placeholder = "ใบแจ้งหนี้ค่าลงทะเบียน" required></input>
          </div>
          <br></br>
          <div>
            <label>ใบลงทะเบียน</label><br></br>
            <input type="file" placeholder = "ใบลงทะเบียน" required></input>
          </div>
          <br></br>
          <div>
            <label>ใบเกรด(GPA)</label><br></br>
            <input type="file" placeholder = "ใบเกรด(GPA)" required></input>
          </div>
        </form>
      </div>
      <div className="register-footer">
        <div className="btn-confirm-scholarLisRig d-flex">
          <button className="btn-confirm">บันทึก</button>
        </div>
      </div>
    </div> 
  );
}

export default ScholarshipListRegister;
