import React from 'react';
import './ProfileCheck.css';


function ProfileCheck(props) {
  return(
    <div className="profileCheck">    
      <div className="row-top-profile">
        <div className="form-profile">
          <form className="d-flex ">
            <div className="img-profile">
              <img src="https://i.pinimg.com/564x/e6/c9/78/e6c9783ef31e29427d42939766031372.jpg"/>
              <p>สภาพเป็นแฟนกัน</p>
            </div>

            <div className="data-profile d-flex">
              <div className="column-left-profile "> 
                <div className="name-profile">
                  <label>ชื่อ - นามสกุล(ภาษาไทย)</label><br></br>
                  <input placeholder="" required></input> 
                </div>
                <div className="sector-profile">
                  <label >ภาคการเรียนการสอน</label><br></br>
                  <input placeholder="" required></input>
                </div>
              </div>

              <div className="column-center-profile">
                <div className="code-profile">
                  <label >รหัสนิสิต</label><br></br>
                  <input className="d-flex" placeholder="" required></input>
                </div>
                <div className="branch-profile">
                  <label >สาขา</label><br></br>
                  <input placeholder="" required></input>
                </div>
              </div>

              <div className="column-right-profile">
                <div className="grade-profile">
                  <label >นิสิตชั้นปีที่</label><br></br>
                  <input placeholder="" required/>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>

      <div className="row-bottom-profile">
        <div className="drop-scholaship">
          <label>ประเภทของทุน</label>
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
