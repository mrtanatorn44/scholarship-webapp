import { React, useState, useEffect } from 'react';
import ApplicantList from '../components/ApplicantList';

function Applicant(props) {

  return (
    <div className="frame-content">
      <div className="head-content d-flex">
        <div className="icons">
          <i className="bi bi-calendar-check"/>
        </div>
        <div class="topic">
           <h4>ตรวจสอบข้อมูล</h4>
        </div>
      </div>
        <form className="applicant-row-top d-flex">
          <div className="applicant-column-left">
            <div className="applicant-select">
              <label>ประเภทของทุน</label><br></br>
              <select  name="capital" id="capital">
                <option value="study">ทุนเรียนดี</option>
                <option value="activity">ทุนกิจกรรมเด่น</option>
                <option value="property">ทุนขาดคุณทรัพย์</option>
                <option value="other">ทุนอื่นๆ</option>
              </select>  
            </div>
          </div>
          <div className="applicant-column-right" >
            <div className="applicant-search">
              <input type="text" placeholder="Search" aria-describedby="button-addon2"/>
              <button className="btn " type="button" >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </form>
     
        <div className="frame-subcontent5">
          <ApplicantList/>
      </div>
    </div>
  )
}

export default Applicant;