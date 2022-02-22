import React from 'react';
import ApplicantList from '../components/ApplicantList';

function Interview(props) {

  return (
    <div className="interview">
      <div className="header d-flex">
        <div className="icon-calendar-check">
          <i className="bi bi-calendar-check"></i>
        </div>
        <h4>การสัมภาษณ์</h4>
      </div>
      <div className="row-top-interview">
        <form className="d-flex">
          <div className="column-left-interview">
            <label>ประเภทของทุน</label><br></br>
            <select  name="capital" id="capital">
              <option value="study">ทุนเรียนดี</option>
              <option value="activity">ทุนกิจกรรมเด่น</option>
              <option value="property">ทุนขาดคุณทรัพย์</option>
              <option value="other">ทุนอื่นๆ</option>
            </select>
          </div>
          <div className="column-right-interview" >
            <div className="input-group">
              <input type="text" placeholder="Search" aria-describedby="button-addon2"/>
              <button className="btn" type="button" >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
        <div calss="row-center-interview ">
          <div className="scholarnews ">
            <ApplicantList/>
          </div>
        </div>
    </div>
  )
}

export default Interview;