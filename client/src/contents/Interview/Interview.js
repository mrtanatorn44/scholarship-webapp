import React, { useContext, useState, useEffect } from 'react';
import ApplicantList from '../Applicant/ApplicantList';
import IntervieweeList from './IntervieweeList.js';
import { WebContext } from '../../App.js'; 

function Interview(props) {

  const { Query } = useContext(WebContext);
  const [query, setQuery] = Query;

  return (

    <div className="frame">
      <div className="header">
        <div className="left">
          <div className="icons">
            <i className="bi bi-calendar-check"></i>
          </div>
          <div className="topic">
          <h4>การสัมภาษณ์</h4>
          </div>
        </div>
        <div className="right"></div>
      </div>
     
        <form className="interview-row-top d-flex">
          <div className="interview-column-left">
            <div className="interview-left">
              <label>ประเภทของทุน</label><br></br>
              <select  name="capital" id="capital">
                <option value="study">ทุนเรียนดี</option>
                <option value="activity">ทุนกิจกรรมเด่น</option>
                <option value="property">ทุนขาดคุณทรัพย์</option>
                <option value="other">ทุนอื่นๆ</option>
              </select>
            </div>
          </div>
          <div className="interview-column-right" >
            <div className="interview-search">
              <input type="text" placeholder="Search" aria-describedby="button-addon2" onChange={event => setQuery(event.target.value)}/>
              <button className="btn" type="button" >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </form>
        <div className="line-gray"></div>
        <div className="content5">
          <IntervieweeList/>
        </div>
      
    </div>
  )
}

export default Interview;