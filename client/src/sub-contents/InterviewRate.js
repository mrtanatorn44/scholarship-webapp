import { React, useState, useEffect } from 'react';
import './InterviewRate.css';

function InterviewRate(props) {
  return (
  <div className="interviewrate">
    <div className="header d-flex">
      <h4>คะแนนการสัมภาษณ์</h4>
    </div>
    <div className="center d-flex">
      <form>
        <div className="score">
          <div className="detail1">
            <p>ประเมินด้าน1</p>
            <input type="text" placeholder="50.00"></input>
          </div>
          <br></br>

          <div className="detail2">
            <p>ประเมินด้าน2</p>
            <input type="text" placeholder="70.00"></input>
          </div>
          <br></br>
                  
          <div className="detail3">
            <p>ประเมินด้าน3</p>
            <input type="text" placeholder="90.00"></input>
          </div>
          <br></br>
        </div>

        <div className="detail4">
          <div className="interview-topic">
              <p>ประเมินด้าน xxx</p>
          </div>
          <div className="interview-checks d-flex ">
              <div className="interview-check-true">
                <input type="radio" id="check1"></input>
                <label for="check1">สมบูรณ์</label>
              </div>
              
              <div className="interview-check-false">
                <input type="radio" id="check2"></input>
                <label for="check2">ไม่สมบูรณ์</label>
              </div> 
          </div>
          <div className="interview-topic">
              <p>ประเมินด้าน 2</p>
          </div>
          <div className="interview-checks d-flex ">
              <div className="interview-check-true">
                <input type="radio" id="check1"></input>
                <label for="check1">สมบูรณ์</label>
              </div>
              
              <div className="interview-check-false">
                <input type="radio" id="check2"></input>
                <label for="check2">ไม่สมบูรณ์</label>
              </div> 
          </div>
         
        </div>   
      </form>
    </div>
    <br></br>
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


export default InterviewRate;
