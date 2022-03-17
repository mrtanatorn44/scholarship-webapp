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
   
  const { Content} = useContext(WebContext)
  const [ content , setContent] = Content;
  
  const { ScholarshipForm } = useContext(WebContext)
  const [scholarshipForm, setScholarshipForm] = ScholarshipForm;

  const { FileForm } = useContext(WebContext)
  const [ fileForm , setFileForm] = FileForm;


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
        
        setContent('Scholarship');
        Swal.fire('บันทึกแล้ว!','','success')
        const {type,detail, amount , min_student_year,max_student_year,on_year,on_term,open_date, close_date, sponsor}=scholarshipForm;

        Axios.post("http://localhost:5000/addScholar",{
        is_public       : false,
        type            : type,
        detail          : detail,
        amount          : amount,
        min_student_year: min_student_year,
        max_student_year: max_student_year,
        on_year         : on_year,
        on_term         : on_term,
        open_date       : open_date,
        close_date      : close_date,
        sponsor         : sponsor
      })
      }
    })
  }
  //console.log(fileForm);
  
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