import React, { useContext, useState, useEffect } from 'react';
import ApplicantList from './ApplicantList';
import { WebContext } from '../../App.js'; 

function Applicant() {

  const { Query } = useContext(WebContext);
  const [query, setQuery] = Query;

  return (
    <div className="frame">
      <div className="header">
        <div className="left">
          <div className="icons">
            <i className="bi bi-calendar-check"/>
          </div>
          <div class="topic">
            <h4>ตรวจสอบข้อมูล</h4>
          </div>
        </div>
        <div className="right"></div>
      </div>
      <div className="contents">
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
              <input type="text" placeholder="Search" aria-describedby="button-addon2" onChange={event => setQuery(event.target.value)}/>
              <button className="btn " type="button" >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </form>
        <div className="line-gray"></div>

        <div className="content5">
          <ApplicantList/>
        </div>
      </div> 
    </div>
  )
}

export default Applicant;