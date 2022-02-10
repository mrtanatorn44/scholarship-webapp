import React from 'react';

function ProfileCreate() {
  return (
    <div class="profile-create">
      <div class="header d-flex" >
        <div class="icon-profile">
          <i class="bi bi-list-ul"></i>
        </div>
        <h4>กรอกข้อมูล</h4>
      </div>
      <div class="forms-list">
        <center>
          
          <h5>กรอกประวัติแรกเข้า</h5>
        </center>
        <form className="form-profile">
          <div>
            <label>1.ชื่อ - นามสกุล(ภาษาไทย)</label><br></br>
            <input placeholder="ชื่อภาษาไทย" required></input>
          </div>
          <div>
            <label>2.นิสิตชั้นปีที่</label><br></br>
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
            <label>3.อายุ</label><br></br>
            <input placeholder="อายุ" required></input>
          </div>
          <div>
            <label>4.รหัสนิสิต</label><br></br>
            <input placeholder="รหัสนิสิต" required></input>
          </div>
          <div>
            <label>5.ภาคการเรียนการสอน</label><br></br>
            <select class="form-select form-select-lg mb-3" required>
              <option value="0">เลือก</option>
              <option value="ภาคปกติ">ภาคปกติ</option>
              <option value="ภาคพิเศษ">ภาคพิเศษ</option>
            </select>
          </div>
          
          <div>
            <label>6.สาขา</label><br></br>
            <select class="form-select form-select-lg mb-3" required>
                <option value="0">เลือก</option>
                <option value="5">คอมพิวเตอร์</option>
                <option value="4">ไฟฟ้า</option>
                <option value="4">เครื่องกล</option>
                <option value="4">หุ่นยนต์</option>
            </select>
          </div>
          <div>
            <label>7.ที่อยู่ปัจจุบัน (ที่ติดต่อได้สะดวก)</label><br></br>
            <input placeholder="ที่อยู่ปัจจุบัน" required></input>
          </div>
          <label>8.เบอร์โทรศัพท์</label><br></br>
          <input placeholder="เบอร์โทรศัพท์"></input>
          <div>
            <label>9.อัพโหลดรูปโปรไฟล์</label><br></br>
            <input type="file" name="myfile" required></input>
          </div>
          <div>
            <label>10.ชื่อ - นามสกุล บิดา-มารดา(ภาษาไทย)</label><br></br>
            <input placeholder="ชื่อภาษาไทย" required></input>
          </div>

          
            <form >
              <label>11.อายุ</label><br></br>
              <input class = "halfbar" placeholder="อายุ" required></input>
            
            <br></br>
              <select class="form-select form-select-lg mb-3" required>
                <option value="0">สถานะภาพ</option>
                <option value="ยังมีชีวิตอยู่">ยังมีชีวิตอยู่</option>
                <option value="ถึงแก่กรรม">ถึงแก่กรรม</option>
              </select>
            </form>
          
          <div>
            <label>12.อาชีพ</label><br></br>
            <input class = "halfbar" placeholder="ระบุอาชีพ" required></input>
          </div>
          <div>
            <label>เบอร์โทรศัพท์</label><br></br>
            <input class = "halfbar" placeholder="ระบุเบอร์โทรศัพท์" required></input>
          </div>

        </form>
        <div class="footer d-flex">
          <p class="page">หน้า 1</p>
          <button class = "next" >ถัดไป</button>
        </div>
        
      </div>
  
    </div>
  );  
}

export default ProfileCreate;
