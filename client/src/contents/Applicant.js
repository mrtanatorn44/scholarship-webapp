import { React, useState, useEffect } from 'react';
import './Applicant.css';
import ApplicantList from '../components/ApplicantList';

function Applicant(props) {

  return (
    <div className="schlorshipcheck">
      <div className="header d-flex">
        <div className="icon-calendar-check">
          <i className="bi bi-calendar-check"/>
        </div>
          <h4>ตรวจสอบข้อมูล</h4>
      </div>
      <div className="row-top-check">
        <form className="d-flex">
          <div className="column-left-check">
            <div className="check-left">
              <label>ประเภทของทุน</label><br></br>
              <select  name="capital" id="capital">
                <option value="study">ทุนเรียนดี</option>
                <option value="activity">ทุนกิจกรรมเด่น</option>
                <option value="property">ทุนขาดคุณทรัพย์</option>
                <option value="other">ทุนอื่นๆ</option>
              </select>  
            </div>
          </div>
          <div className="column-right-check" >
            <div className="search-check">
              <input type="text" placeholder="Search" aria-describedby="button-addon2"/>
              <button className="btn " type="button" >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div calss="row-center-interview ">
        <div className="checklist ">
          <ApplicantList/>
        </div>
      </div>
    </div>
  )
}

export default Applicant;