/*eslint no-unused-vars:*/

import React, { useState, useContext } from 'react';
import { WebContext } from '../../App';


import CFileForm from './CreateFileform.js';
import RateForm from './CreateRateform.js';
import DetailForm from './CreateDetail.js'; 

// Alert & Image Modal
import Swal from 'sweetalert2'

import Axios from 'axios';
function ScholarshipListCreate() {
   
  const { Content, ScholarshipForm, FileForm, ScoringFormat } = useContext(WebContext)
  const [ content , setContent]               = Content;
  const [scholarshipForm, setScholarshipForm] = ScholarshipForm;
  const [ fileForm , setFileForm]             = FileForm;
  const [scoringFormat, setScoringFormat] = ScoringFormat;

  function insertScholarshipToDB(donator_id) {
    Axios.post("http://localhost:5000/addScholar",{
      donator_id      : donator_id,
      is_public       : false,
      type            : scholarshipForm.type,
      detail          : scholarshipForm.detail,
      amount          : scholarshipForm.amount,
      min_student_year: scholarshipForm.min_student_year,
      max_student_year: scholarshipForm.max_student_year,
      on_year         : scholarshipForm.on_year,
      on_term         : scholarshipForm.on_term,
      open_date       : scholarshipForm.open_date,
      close_date      : scholarshipForm.close_date,
      required        : JSON.stringify(fileForm),
      rating          : JSON.stringify(scoringFormat)
    }).then((response) => {
      setContent('Scholarship');
      Swal.fire('บันทึกแล้ว!','','success')
    })
  }

  function onHandleSubmitBtn(e) {
    e.preventDefault();
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: 'ที่จะบันทึกประกาศนี้!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#03A96B',
      confirmButtonText: 'Save',
      cancelButtonColor: '#A62639',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {

        var donator_id;

        Axios.post("http://localhost:5000/getDonator").then(response => {
          var result = response.data
          result.forEach((res, index) => {  
            if (res.name === scholarshipForm.donator) {
              console.log('Exist Donator :', res.name, res.id)
              donator_id = res.id
              insertScholarshipToDB(res.id)
            }
          })
          if (donator_id !== undefined)
            return;

          // if Donator not exist add it
          Axios.post("http://localhost:5000/addDonator", {
            name : scholarshipForm.donator
          }).then(response => {
            console.log('not Exist Donator :', scholarshipForm.donator, response.data.insertId)
            insertScholarshipToDB(response.data.insertId);
          })

        })
      }
    })
  }
  
  return (
    <div className="frame">
      <div className="header">
        <div  className="left">
            <div className="icons">  
              <i className="bi bi-plus-lg"></i>
            </div>
            <div className="topic">
              <h4>สร้างทุน</h4>
            </div>
        </div>

        <div className="right">
        </div>
      </div>
      <div className = 'contents'> 
        <div className = 'content1'>  
          <form onSubmit={(e) => onHandleSubmitBtn(e)}>
            <div className="detailForm" >
              <DetailForm/>
            </div>
            <div className='fileForm'> 
              <CFileForm/> 
            </div>  
            <div className="rateForm">
              <RateForm/>
            </div> 

            {/* ----- FOOTER ------ */}
            <div className="footer2">
              <div className="confirm">
                <button className="button-confirm green1" type="submit">
                  ตกลง 
                </button>
                
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ScholarshipListCreate;

//