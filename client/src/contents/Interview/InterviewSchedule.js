/*eslint no-unused-vars:*/

import React, { useState, useContext } from 'react';
import { WebContext } from '../../App';

function InterviewSchedule(props) {
  const { Content } = useContext(WebContext)
  const [ content, setContent] = Content;

  return (
    <div className="frame">
      {/* ----- HEADER ----- */}
      <div className="header">
        <div class="left">
          <div className="icons">
            <i className="bi bi-clock"/>
          </div>
          <div class="topic">
            <h4>กำหนดวันเวลาสัมภาษณ์</h4>
          </div>
        </div>
        <div className="right"></div>
        </div>

      {/* ----- CONTENT ----- */}
      <div className="contents">
        <div className="content1">
          <form className="form5">
            
            <div className="detail1">
              <p>สัมภาษณ์ ณ วันที่</p>
              <input type="date" placeholder="31 กุมภาพันธ์ 2565"/>
            </div>

            <div className="detail2">
              <p>เวลา</p>
              <input type="time" placeholder="28:39"/>
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
              <select>
                <option value="people1">Zoom</option>
                <option value="people2">MS-TEAM</option>
              </select>
            </div>
          </form>
          
          {/* ----- FOOTER ----- */}
          <div className="footer3">
            <div className="confirm"> 
              <button className= "button-confirm green1" onClick={() => setContent('Interview')}>ยืนยัน</button>    
            </div>
          </div>

        </div>
      </div>
      
    </div>
  )
  
}

export default InterviewSchedule;
