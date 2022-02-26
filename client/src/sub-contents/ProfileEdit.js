import React from 'react';
import './ProfileEdit.css'

function ProfileEdit() {

  return (
    <div className="frame-content">
      <div className="head-content d-flex" >
        <div className="icons">
          <i className="bi bi-list-ul"/>
        </div>
        <div class="topic">
          <h4>กรอกประวัติ</h4>
        </div>
      </div>
      <div className="frame-subcontent3">
        <div class="name">
          <h5>กรอกประวัติแรกเข้า</h5>
        </div>
        <form className="profileEdit-form">
          <div>
            <label></label><br></br>
            <input placeholder="ชื่อภาษาไทย" required id="mydata"/>
          </div>
          <div>
            <label>นิสิตชั้นปีที่</label>
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
            <input placeholder="อายุ" required/>
          </div>
          <div>
            <label>รหัสนิสิต</label><br></br>
            <input placeholder="รหัสนิสิต" required/>
          </div>
          <div>
            <label>ภาคการเรียนการสอน</label>
            <select className="form-select form-select-lg mb-3" required>
              <option value="0">        เลือก       </option>
              <option value="ภาคปกติ">   ภาคปกติ    </option>
              <option value="ภาคพิเศษ">  ภาคพิเศษ   </option>
            </select>
          </div>
          
          <div>
            <label>สาขา</label>
            <select className="form-select form-select-lg mb-3" required>
                <option value="0">  เลือก       </option>
                <option value="5">  คอมพิวเตอร์  </option>
                <option value="4">  ไฟฟ้า      </option>
                <option value="4">  เครื่องกล    </option>
                <option value="4">  หุ่นยนต์     </option>
            </select>
          </div>
          
          <div>
            <label>ที่อยู่ปัจจุบัน (ที่ติดต่อได้สะดวก)</label><br></br>
            <input placeholder="ที่อยู่ปัจจุบัน" required/>
          </div>
          <div>
            <label>เบอร์โทรศัพท์</label><br></br>
            <input placeholder="เบอร์โทรศัพท์"/>
          </div>
          <div>
            <label>อัพโหลดรูปโปรไฟล์</label><br></br>
            <input type="file" name="myfile" required/>
          </div>
          <div>
            <h5>ประวัติครอบครัว</h5>
          </div>
          <div>
            <label>ชื่อ-นามสกุล(บิดา)</label><br></br>
            <input placeholder="ชื่อภาษาไทย" required/>
          </div>
          <div class="profile-fam d-flex">
            <div class="fam1-edit">
              <label>อายุ</label><br></br>
              <input className = "halfbar" placeholder="อายุ" required/>
            </div>
            <div class="fam2-edit">
              <label>สถานะภาพ</label>
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
              <input className = "halfbar" placeholder="ระบุอาชีพ" required/>
            </div>
            <div class="fam2-edit">
              <label>เบอร์โทรศัพท์</label><br></br>
              <input className = "halfbar" placeholder="ระบุเบอร์โทรศัพท์" required/>
            </div>
          </div>
       
          <div class="profile-fam d-flex">
            <div class="fam1-edit">
              <label>รายได้ต่อเดือน</label><br></br>
              <input className = "halfbar" placeholder="ระบุรายได้ต่อเดือน" required/>
            </div>
            <div class="fam2-edit">
              <label>สถานที่ประกอบอาชีพ</label><br></br>
              <input className = "halfbar" placeholder="สถานที่ประกอบอาชีพ" required/>
            </div>
          </div>
        
          <div>
            <label>ที่อยู่ของบิดา</label><br></br>
            <input className = "halfbar" placeholder="ที่อยู่ของบิดา" required/>
          </div>

          <div>
            <label>ชื่อ-นามสกุล(มารดา)</label><br></br>
            <input className = "halfbar" placeholder="ชื่อ-สกุล(มารดา)" required/>
          </div>
          <div class="profile-fam d-flex">
            <div class="fam1-edit">
              <label>อายุ</label><br></br>
              <input className="halfbar" placeholder="อายุ" required/>
            </div>
            <div class="fam2-edit">
              <label>สถานะภาพ</label>
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
              <input className = "halfbar" placeholder="ระบุอาชีพ" required/>
            </div>
            <div class="fam2-edit">
              <label>เบอร์โทรศัพท์</label><br></br>
              <input className = "halfbar" placeholder="ระบุเบอร์โทรศัพท์" required/>
            </div>
          </div>

          <div class="profile-fam d-flex">
            <div class="fam1-edit">
              <label>รายได้ต่อเดือน</label><br></br>
              <input className = "halfbar" placeholder="ระบุรายได้ต่อเดือน" required/>
            </div>
            <div class="fam2-edit">
              <label>สถานที่ประกอบอาชีพ</label>
              <input className = "halfbar" placeholder="สถานที่ประกอบอาชีพ" required/>
            </div>
          </div>
          <div>
            <label>ที่อยู่ของมารดา</label><br></br>
            <input className = "halfbar" placeholder="สถานที่ประกอบอาชีพ" required/>
          </div>
          <div>
            <label>สถานะสมรสของบิดา-มารดา</label><br></br>
            <input className = "halfbar" placeholder="สถานะสมรสของบิดา-มารดา" required/>
          </div>

        </form>
      </div>
      <div className="profile-footer">
        <div className="profile-btn-confirm d-flex">
          <button className="btn-confirm">บันทึก</button>
        </div>
      </div>
    </div>
  ) 
}

export default ProfileEdit;
