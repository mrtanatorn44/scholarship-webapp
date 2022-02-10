import React from 'react';
import './Profile.css';


function Profile() {
  return(
  <div class="profile">    
    <div class="row-top-profile">
      <form className="form-profile ">

        <div className="img-profile">
          <img src="" width="100" height="150" />
          <p>สภาพจิตไม่ปกติ</p>
        </div>

        <div class="column-center-profile d-flex"> 
          <div class="name-profile">
            <label>ชื่อ - นามสกุล(ภาษาไทย)</label><br></br>
            <input placeholder="ชื่อภาษาไทย" required></input> 
          </div>
          <div>
            <label>นิสิตชั้นปีที่</label><br></br>
            <input placeholder="" required></input>
          </div>
        </div>

        <div class="column-right-profile d-flex">
          <div >
            <label>ภาคการเรียนการสอน</label><br></br>
              <input placeholder="" required></input>
          </div>
          <div>
            <label>สาขา</label><br></br>
            <input placeholder="" required></input>
          </div>
        </div>
      </form> 

    </div>
    <div class='bottom'>
      <div class="edit">
          <h4>แก้ไขข้อมูล</h4>
        </div>
    </div>
        
    
  </div>
  )
}

export default Profile;
