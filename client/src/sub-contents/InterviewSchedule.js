import { React, useState, useEffect } from 'react';
import './InterviewSchedule.css';

function InterviewSchedule(props) {
  return (
    <div className="frame-content">
      <div className="head-content d-flex">
        <div class="topic">
          <h4>กำหนดวันเวลาสัมภาษณ์</h4>
        </div>
      </div>
    <div className="interviewSchedule-center d-flex">
      <form>
        <div className="detail1">
          <p>สัมภาษณ์ ณ วันที่</p>
          <input type="text" placeholder="31 กุมภาพันธ์ 2565"/>
        </div>

        <div className="detail2">
          <p>เวลา</p>
          <input type="text" placeholder="28:39"/>
        </div>
                
        <div className="detail3">
          <p>รายชื่อกรรมการที่จะทำการสัมภาษณ์</p>
          <select>
            <option value="people1">ประยุท</option>
            <option value="people2">ประวิทย์</option>
            <option value="people3">เสี่ยโอ</option>
          </select>
        </div>
	
        <div className="detail4">
          <p>ช่องทางการสัมภาษณ์</p>
          <input type="text" placeholder="Zoom meeting"/>
        </div>

      </form>
    </div>
    <div className="interviewSchedule-fotter d-flex">
      <div className="confirm"> 
        <button type = "button">ยืนยัน</button>    
      </div>
    </div>
  </div>/*กูนอนอยู่นะ ไม่ได้คุยกับใคร */
  )
}

export default InterviewSchedule;
