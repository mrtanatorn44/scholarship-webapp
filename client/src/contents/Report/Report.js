import React, { useContext, useState, useEffect } from 'react';
import Report_list from './ReportList';

function Report(props) {

  return (
    <div className="frame">
      <div className="header ">
        <div className="left">
          <div className="icons">
            <i className="bi bi-files"></i>
          </div>
          <div className="topic">
            <h4>รายงานทุน</h4>
          </div>
        </div>
        <div className="right"></div>
      </div>
      <div className="contents">
        <form className="form4" >
          <div className="select1">
            <label>ทุนปีการศึกษา</label><br></br>
              <select  name="capital">
                <option value="2564">2564</option>
                <option value="2563">2563</option>
                <option value="2562">2562</option>
                <option value="2561">2561</option>
              </select>
          </div> 
          <div className="select1">
            <label>เทอม</label>
            <select  name="capital" >
              <option value="first">ต้น</option>
              <option value="final">ปลาย</option>
            </select>
          </div>
          <div className="select1">
            <label>ทุนประเภท</label>
            <select  name="capital" id="capital">
              <option value="study">ทุนเรียนดี</option>
              <option value="activity">ทุนกิจกรรมเด่น</option>
              <option value="property">ทุนขาดคุณทรัพย์</option>
              <option value="other">ทุนอื่นๆ</option>
            </select>
          </div>
          <div className="select1">
            <label>โดย</label>
            <select  name="capital" id="capital">
              <option value="study">ผู้สนับสนุน</option>
            </select>  
          </div> 
          
        </form>
        <div className="line-gray"></div>
        <div className="content5">
          <Report_list/>
        </div>
      </div>
    </div>
  ) 
}
export default Report;
