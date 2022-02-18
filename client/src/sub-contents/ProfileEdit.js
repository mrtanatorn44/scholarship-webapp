import React from 'react';
import './ProfileEdit.css'

function ProfileEdit() {
  return (
    <div className="profile-create">
      <div className="header d-flex" >
        <div className="icon-profile">
          <i className="bi bi-list-ul"></i>
        </div>
        <h4>กรอกประวัติ</h4>
      </div>
      <div className="forms-list">
        <center>
          <h5>กรอกประวัติแรกเข้า</h5>
        </center>
        <form className="form-profile">
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
            <label>ที่อยู่ปัจจุบัน (ที่ติดต่อได้สะดวก)</label><br></br>
            <input placeholder="ที่อยู่ปัจจุบัน" required></input>
          </div>
          <br></br>
          <div>
            <label>เบอร์โทรศัพท์</label><br></br>
            <input placeholder="เบอร์โทรศัพท์"></input>
          </div>
          <br></br>
          <div>
            <label>อัพโหลดรูปโปรไฟล์</label><br></br>
            <input type="file" name="myfile" required></input>
          </div>
          <div>
            <h5>ประวัติครอบครัว</h5>
          </div>
          <div>
            <label>ชื่อ-นามสกุล(บิดา)</label><br></br>
            <input placeholder="ชื่อภาษาไทย" required></input>
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
        
          <div>
            <label>ที่อยู่ของบิดา</label><br></br>
            <input className = "halfbar" placeholder="ที่อยู่ของบิดา" required></input>
          </div>
          <br></br>

          <div>
            <label>ชื่อ-นามสกุล(มารดา)</label><br></br>
            <input className = "halfbar" placeholder="ชื่อ-สกุล(มารดา)" required></input>
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
            <input className = "halfbar" placeholder="สถานที่ประกอบอาชีพ" required></input>
          </div>
          <br></br>
          <div>
            <label>สถานะสมรสของบิดา-มารดา</label><br></br>
            <input className = "halfbar" placeholder="สถานะสมรสของบิดา-มารดา" required></input>
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

export default ProfileEdit;
