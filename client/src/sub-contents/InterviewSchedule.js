import { React, useState, useEffect } from 'react';
import './InterviewSchedule.css';

function InterviewSchedule(props) {
  return (
    <div class="interviewschedule">
      <div class="header d-flex">
        <h4>กำหนดวันเวลลาสัมภาษณ์</h4>
      </div>
    <div class="center d-flex">
      <form>
        <div class="detail1">
          <p>สัมภาษณ์ ณ วันที่</p>
          <input type="text" placeholder="31 กุมภาพันธ์ 2565"></input>
        </div>
        <br></br>

        <div class="detail2">
          <p>เวลา</p>
          <input type="text" placeholder="28:39"></input>
        </div>
        <br></br>
                
        <div class="detail3">
          <p>รายชื่อกรรมการที่จะทำการสัมภาษณ์</p>
          <select>
            <option value="people1">ประยุท</option>
            <option value="people2">ประวิทย์</option>
            <option value="people3">เสี่ยโอ</option>
          </select>
        </div>
        <br></br>
	
        <div class="detail4">
          <p>ช่องทางการสัมภาษณ์</p>
          <input type="text" placeholder="Zoom meeting"></input>
        </div>

      </form>
    </div>
    <div class="confirm d-flex">
    	<button type = "button">
        ยืนยัน
      </button>    
    </div>
  </div>
  );
}

export default InterviewSchedule;
