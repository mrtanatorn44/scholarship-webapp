import React from 'react';



function ProfileCheck(props) {
  return(
    <div className="frame-content">    
      <div className="profile-row-top">
        <div className="profile-form ">
          <form className="d-flex ">
            <div className="profile-img">
              <img src="https://i.pinimg.com/564x/e6/c9/78/e6c9783ef31e29427d42939766031372.jpg"/>
              <p>สภาพเป็นแฟนกัน</p>
            </div>

            <div className="profile-data d-flex">
              <div className="profile-column-left"> 
                <div className="profile-name">
                  <label>ชื่อ - นามสกุล(ภาษาไทย)</label><br></br>
                  <input placeholder="" required></input> 
                </div>
                <div className="profile-sector">
                  <label >ภาคการเรียนการสอน</label><br></br>
                  <input placeholder="" required></input>
                </div>
              </div>

              <div className="profile-column-center">
                <div className="profile-code">
                  <label >รหัสนิสิต</label><br></br>
                  <input className="d-flex" placeholder="" required></input>
                </div>
                <div className="profile-branch">
                  <label >สาขา</label><br></br>
                  <input placeholder="" required></input>
                </div>
              </div>

              <div className="profile-column-right">
                <div className="profile-grade">
                  <label >นิสิตชั้นปีที่</label><br></br>
                  <input placeholder="" required/>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>

      <div className="profile-row-bottom">
        <div className="drop-scholaship">
          <label>ประเภทของทุน</label><br></br>
          <select>
            <option value="study">    ทุนเรียนดี       </option>
            <option value="activity"> ทุนกิจกรรมเด่น   </option>
            <option value="property"> ทุนขาดคุณทรัพย์ </option>
            <option value="other">    ทุนอื่นๆ         </option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default ProfileCheck;
