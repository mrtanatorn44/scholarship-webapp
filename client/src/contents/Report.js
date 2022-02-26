import React, { useContext, useState, useEffect } from 'react';
import Report_list from '../components/ReportList';

function Report(props) {

  return (
    <div className="frame-content">
      <div className="head-content d-flex">
        <div className="icons">
          <i className="bi bi-files"></i>
        </div>
        <div class="topic">
          <h4>รายงานทุน</h4>
        </div>
      </div>
      <form className="report-row-top d-flex" >
        <div className="report-scholarship">
          <label>ทุนปีการศึกษา</label><br></br>
            <select  name="capital">
              <option value="2564">2564</option>
              <option value="2563">2563</option>
              <option value="2562">2562</option>
              <option value="2561">2561</option>
            </select>
        </div> 
        <div className="report-term">
          <label>เทอม</label>
          <select  name="capital" >
            <option value="first">ต้น</option>
            <option value="final">ปลาย</option>
          </select>
        </div>
        <div className="report-type">
          <label>ทุนประเภท</label>
          <select  name="capital" id="capital">
            <option value="study">ทุนเรียนดี</option>
            <option value="activity">ทุนกิจกรรมเด่น</option>
            <option value="property">ทุนขาดคุณทรัพย์</option>
            <option value="other">ทุนอื่นๆ</option>
          </select>
        </div>
        <div className="report-sponcer">
          <label>โดย</label>
          <select  name="capital" id="capital">
            <option value="study">ผู้สนับสนุน</option>
          </select>  
        </div>
      </form>
      
      <div className="frame-subcontent2">
        <Report_list/>
      </div>
    </div>
  ) 
}
export default Report;
