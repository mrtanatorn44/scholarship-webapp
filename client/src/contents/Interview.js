import React from 'react';
import ApplicantList from '../components/ApplicantList';
import IntervieweeList from '../components/IntervieweeList';
function Interview(props) {

  return (
    <div className="frame-content">
      <div className="head-content d-flex">
        <div className="icons">
          <i className="bi bi-calendar-check"></i>
        </div>
        <div className="topic">
        <h4>การสัมภาษณ์</h4>
        </div>
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
              <input type="text" placeholder="Search" aria-describedby="button-addon2"/>
              <button className="btn" type="button" >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>

        </form>
      
          <div className="frame-subcontent5">
            <IntervieweeList/>
          </div>
    </div>
  )
}

export default Interview;