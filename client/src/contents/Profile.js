import React from 'react';
import './Profile.css';

function Profile(props) {
  return(
    <div className="profile">    
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
                  <input placeholder="ภวัตกะนะโนน" required></input> 
                </div>
                <div className="sector-profile">
                  <label >ภาคการเรียนการสอน</label><br></br>
                  <input placeholder="ภาคปกติ" required></input>
                </div>
              </div>

              <div className="column-center-profile">
                <div className="code-profile">
                  <label >รหัสนิสิต</label><br></br>
                  <input className="d-flex" placeholder="62XXXXX" required></input>
                </div>
                <div className="branch-profile">
                  <label >สาขา</label><br></br>
                  <input placeholder="GMMTV" required></input>
                </div>
              </div>

              <div className="column-right-profile">
                <div className="grade-profile">
                  <label >นิสิตชั้นปีที่</label><br></br>
                  <input placeholder="5" required></input>
                </div>
              </div>

            </div>
          </form>
        </div>
        
        <div className="botton-edit">
        <button onClick = {() => props.sendContent(['student','ProfileEdit'])}>
            <p>แก้ไข้ข้อมูล</p>
          </button>
        </div>
      </div>
      <div className="row-bottom-profile">
        <div className="drop-scholaship">
          <label>ประเภทของทุน</label>
          <br></br>
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
