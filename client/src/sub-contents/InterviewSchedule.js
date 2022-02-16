import { React, useState, useEffect } from 'react';
import './InterviewSchedule.css';

function InterviewSchedule(props) {
  return (
    <div className="interviewschedule">
      <div className="header d-flex">
        <h4>กำหนดวันเวลลาสัมภาษณ์</h4>
      </div>
    <div className="center d-flex">
      <form>
        <div className="detail1">
          <p>สัมภาษณ์ ณ วันที่</p>
          <input type="text" placeholder="31 กุมภาพันธ์ 2565"></input>
        </div>
        <br></br>

        <div className="detail2">
          <p>เวลา</p>
          <input type="text" placeholder="28:39"></input>
        </div>
        <br></br>
                
        <div className="detail3">
          <p>รายชื่อกรรมการที่จะทำการสัมภาษณ์</p>
          <select>
            <option value="people1">ประยุท</option>
            <option value="people2">ประวิทย์</option>
            <option value="people3">เสี่ยโอ</option>
          </select>
        </div>
        <br></br>
	
        <div className="detail4">
          <p>ช่องทางการสัมภาษณ์</p>
          <input type="text" placeholder="Zoom meeting"></input>
        </div>

      </form>
    </div>
    <div className="fotter-confirm d-flex">
      <div className="confirm"> 
        <button type = "button">
          <p>ยืนยัน</p>
        </button>    
        </div>
    </div>
  </div>
  );
}

export default InterviewSchedule;
