/*eslint no-unused-vars:*/

import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { WebContext } from '../../App';

import FileForm from './CreateFileform.js';
import EditRateForm from './EditRateform.js';
import EditDetailForm from './EditDetail.js'; 

// Alert & Image Modal
import Swal from 'sweetalert2'

function ScholarshipEdit() {
   
  const { Content, ScholarshipForm } = useContext(WebContext)
  const [ content , setContent] = Content;
  const [scholarshipForm, setScholarshipForm] = ScholarshipForm;

  function onFormSubmit(e,id) {
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
        Axios.post("http://localhost:5000/editScholar",{
          id              : scholarshipForm.id,
          is_public       : scholarshipForm.false,
          type            : scholarshipForm.type,
          detail          : scholarshipForm.detail,
          amount          : scholarshipForm.amount,
          min_student_year: scholarshipForm.min_student_year,
          max_student_year: scholarshipForm.max_student_year,
          on_year         : scholarshipForm.on_year,
          on_term         : scholarshipForm.on_term,
          open_date       : scholarshipForm.open_date,
          close_date      : scholarshipForm.close_date,
          sponsor         : scholarshipForm.sponsor,
        }).then((resoense) => {
          setContent('Scholarship');
          Swal.fire('บันทึกแล้ว!','','success')
        })
      }
    })
  }
  
  return (
    <div className="frame">
      <div className="header">

        <div className="left">
          <div className="icons">  
            <i className="bi bi-plus-lg"></i>
          </div>
          <div className="topic">
            <h4>แก้ไขทุน</h4>
          </div>
        </div>

        <div className="right">
        </div>

      </div>

      <div className = 'contents'> 

        <div className = 'content1'>  
          <form onSubmit={(e) => onFormSubmit(e, scholarshipForm.id)}>

            <div className="editDetailForm" >
              <EditDetailForm/>
            </div> 

            <div className="footer2">
              <div className="confirm ">
                <button className="button-confirm green1" type="submit"> ตกลง </button>
              </div>
            </div>

          </form>
        </div>

      </div>
    </div>
  )
}

export default ScholarshipEdit;

//