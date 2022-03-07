import React, { useState, useContext } from 'react';
import { WebContext } from '../../App';
import ConfirmModal from '../../modals/ConfirmModal.js';

import FileForm from './CreateFileform.js';
import RateForm from './CreateRateform.js';
import DetailForm from './CreateDetail.js'; 

// Alert & Image Modal
import Swal from 'sweetalert2'

import Axios from 'axios';
function ScholarshipListCreate() {
   
  const { Content } = useContext(WebContext)
  const [ content , setContent] = Content;
  const [showModal, setShowModal] = useState(false);
  
  const { ScholarshipForm } = useContext(WebContext)
  const [scholarshipForm, setScholarshipForm] = ScholarshipForm;
  
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
      <div className = 'content1'>  
        <form onSubmit={(e) => onHandleSubmitBtn(e)}>
          <div className="scholarListCrea-announceForm" >
            <DetailForm/>
          </div>
          <div className='scholarListCrea-fileForm'> 
            <FileForm/> 
          </div>  
          <div className="scholarListCrea-rateForm">
            <RateForm/>
          </div> 

          {/* ----- FOOTER ------ */}
          <div className="scholarListCrea-footer">
            <div className="btn-confirm-scholarCre ">
              <button className="btn-confirm" type="submit">
                ตกลง 
              </button>
              <button className="btn-confirm">
                null 
              </button> 
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ScholarshipListCreate;
