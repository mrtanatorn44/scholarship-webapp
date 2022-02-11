import React from 'react';
import './Profile.css';


function Profile() {
  return(
  <div class="profile">    
    <div class="row-top-profile">
      <div class="form-profile">
        <form className="d-flex ">

          <div className="img-profile">
            <img src="https://i.pinimg.com/564x/e6/c9/78/e6c9783ef31e29427d42939766031372.jpg"/>
            <p>สภาพเป็นแฟนกัน</p>
            
          </div>

          <div class="data-profile d-flex">
            <div class="column-left-profile "> 
              <div class="name-profile">
                <label>ชื่อ - นามสกุล(ภาษาไทย)</label><br></br>
                <input placeholder="ภวัตกะนะโนน" required></input> 
              </div>
              <div class="sector-profile">
                <label >ภาคการเรียนการสอน</label><br></br>
                <input placeholder="ภาคปกติ" required></input>
              </div>
            </div>

            <div class="column-center-profile">
              <div class="code-profile">
                <label >รหัสนิสิต</label><br></br>
                <input class="d-flex" placeholder="62XXXXX" required></input>
              </div>
              <div class="branch-profile">
                <label >สาขา</label><br></br>
                <input placeholder="GMMTV" required></input>
              </div>
            </div>

            <div class="column-right-profile">
              <div class="grade-profile">
                <label >นิสิตชั้นปีที่</label><br></br>
                <input placeholder="5" required></input>
              </div>
            </div>
            
          </div>
        </form>

       
      </div>
      <div class="botton-edit">
        <button>
          <p>แก้ไข้ข้อมูล</p>
        </button>
      </div>
    </div>

    <div class="row-bottom-profile">
      <div class="drop-scholaship">
        <label>ประเภทของทุน</label><br></br>
        <select>
          <option value="study">ทุนเรียนดี</option>
          <option value="activity">ทุนกิจกรรมเด่น</option>
          <option value="property">ทุนขาดคุณทรัพย์</option>
          <option value="other">ทุนอื่นๆ</option>
          </select>
      </div>
    </div>
          
    
  </div>
  )
}

export default Profile;
