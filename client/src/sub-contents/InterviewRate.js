import { React, useState, useEffect } from 'react';
import './InterviewRate.css';

function InterviewRate(props) {
  return (
  <div class="interviewrate">
    <div class="header d-flex">
      <h4>คะแนนการสัมภาษณ์</h4>
    </div>
    <div class="center d-flex">
      <form>
        <div class="detail1">
          <p>เมินด้าน1</p>
          <input type="text" placeholder="50.00"></input>
        </div>
        <br></br>

        <div class="detail2">
          <p>เมินด้าน2</p>
          <input type="text" placeholder="70.00"></input>
        </div>
        <br></br>
                
        <div class="detail3">
          <p>เมินด้าน3</p>
          <input type="text" placeholder="90.00"></input>
        </div>
        <br></br>

        <div class="detail4">
          <div class="detail4.1">
            <p>ประเมินด้านxxx</p>
            <button type = "button">
              <p>ผ่าน</p>
            </button>
            <button type = "button">
            <p>ไม่ผ่าน</p>
            </button>
          </div>
          <div class="detail4.2">
            <p>ประเมินด้านxxx</p>
            <button type = "button">
              <p>ผ่าน</p>
            </button>
            <button type = "button">
              <p>ไม่ผ่าน</p>
            </button>
          </div>
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


export default InterviewRate;
