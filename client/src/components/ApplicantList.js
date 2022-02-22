import React, { useContext, useState, useEffect } from 'react';
import Aplicants from '../data/datanews.js';

function ApplicantList(props){

  return (
    Aplicants.map((aplicant,index) => (
      <div className="scholar-Interview" key={index} >
        <div className='title'>
          <h2>{aplicant.title}</h2>
        </div>
        <div className="button-Interview" >
          <button className="button-search d-flex" type="button" onClick={ () => props.sendContent(['admin','ScholarshipCheckForm']) }>
            <i className="bi bi-search"></i>
            <p>ตรวจสอบเอกสาร</p>
          </button>

          <button className="button-search d-flex"  type="button" onClick={ () => props.sendContent(['admin','ProfileCheck']) }>
            <i className="bi bi-search"></i>
            <p>ตรวจสอบประวัติ</p>
          </button>  
          <button className="button-search" type="button" onClick={() => props.sendContent(['admin', 'InterviewRate'])}>
            <i className="bi bi-search"/>
            <p>การประเมิน</p>
          </button>
          <button className="button-clock"  type="button"onClick={() => props.sendContent(['admin', 'InterviewSchedule'])}>
            <i className="bi bi-clock"/>
            <p>เวลาสัมภาษณ์</p>
          </button>  
        </div>
        <div className='bottom'>
          <h3>{aplicant.date}</h3>
        </div>
      </div>
    ))
  )
}

export default ApplicantList;
