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
                <option value="คอมพิวเตอร์">คอมพิวเตอร์</option>
                <option value="ไฟฟ้า">ไฟฟ้า</option>
                <option value="เครื่องกล">เครื่องกล</option>
                <option value="หุ่นยนต์">หุ่นยนต์</option>
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
          <div class="topic-fam" >
            <h5>ประวัติครอบครัว</h5>
          </div>
          <div>
            <label>ชื่อ-นามสกุล(บิดา)</label><br></br>
            <input placeholder = "ชื่อ-นามสกุล(บิดา)" required></input>
          </div>
          <br></br>

          <div class="scholar-check d-flex">
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

          <div class="scholar-check d-flex">
            <div class="fam1-edit">
              <label>อาชีพ</label><br></br>
              <input placeholder = "อาชีพ" required></input>
            </div>
            <div class="fam2-edit">
              <label>เบอร์โทรศัพท์</label><br></br>
              <input placeholder = "เบอร์โทรศัพท์" required></input>
            </div>
          </div>

          <div class="scholar-check d-flex">
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
            <input placeholder = "ที่อยู่ของบิดา" required></input>
          </div>
          <br></br>
          <div>
            <label>ชื่อ-นามสกุล(มารดา)</label><br></br>
            <input placeholder = "ชื่อ-นามสกุล(มารดา)" required></input>
          </div>
          <br></br>
          <div class="scholar-check d-flex">
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

          <div class="scholar-check d-flex">
            <div class="fam1-edit">
              <label>อาชีพ</label><br></br>
              <input placeholder = "อาชีพ" required></input>
            </div>
            <div class="fam2-edit">
              <label>เบอร์โทรศัพท์</label><br></br>
              <input placeholder = "เบอร์โทรศัพท์" required></input>
            </div>
          </div>

          <div class="scholar-check d-flex">
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
            <input placeholder = "ที่อยู่ของมารดา" required></input>
          </div>
          <br></br>
          <div>
            <label>สถานะสมรสบิดา-มารดา</label><br></br>
            <select className="form-select form-select-lg mb-3" required>
                <option value="0">เลือก</option>
                <option value="อยู่ด้วยกัน">อยู่ด้วยกัน</option>
                <option value="แยกกันอยู่">แยกกันอยู่</option>
                <option value="หย่าร้าง">หย่าร้าง</option>   
            </select>
          </div>
          <div>
            <p>พี่น้องร่วมบิดา มารดาและระดับการศึกษาหรืออาชีพ เรียงตามลำดับดังนี้(รวมนิสิตผู้สมัครด้วย) </p>
          </div>
          
          <div>
            <label>ชื่อ-นามสกุล</label><br></br>
            <input placeholder = "ชื่อ-นามสกุล" required></input>
          </div>
          <br></br>
          <div>
            <label>ระดับการศึกษา</label><br></br>
            <input placeholder = "ระดับการศึกษา" required></input>
          </div>
          <br></br>
          <div>
            <label>อาชีพ</label><br></br>
            <input placeholder = "อาชีพ" required></input>
          </div>
          <br></br>
          <div>
            <label>สถานที่ประกอบอาชีพ/สถานศึกษา</label><br></br>
            <input placeholder = "สถานที่ประกอบอาชีพ/สถานศึกษา" required></input>
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
      </div>
      <div className="footer">
        <div className="save d-flex">
          <button>บันทึก</button>
        </div>
      </div>
  
    </div>
    
  );
}

export default ScholarshipCheckForm;
