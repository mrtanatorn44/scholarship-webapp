import React, { useState, useContext } from 'react';
import { WebContext } from '../../App';
//import ConfirmModal from '../../modals/ConfirmModal.js';

import FileForm from './CreateFileform.js';
import RateForm from './CreateRateform.js';
import EditDetailForm from './EditDetail.js'; 

// Alert & Image Modal
import Swal from 'sweetalert2'
import Lightbox from 'react-image-lightbox';

import Axios from 'axios';
function ScholarshipEdit() {
   
  const { Content } = useContext(WebContext)
  const [ content , setContent] = Content;
  const [showModal, setShowModal] = useState(false);
  
  const { ScholarshipForm } = useContext(WebContext)
  const [scholarshipForm, setScholarshipForm] = ScholarshipForm;
  const {type,detail, amount , min_student_year,max_student_year,on_year,on_term,open_date, close_date, sponsor}=scholarshipForm;
  
  function onHandleSubmitBtn(e,id) {
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
        Axios.post("http://localhost:5000/editScholar",{
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
        sponsor         : sponsor,
        id : id
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
              <h4>แก้ไขทุน</h4>
            </div>
        </div>

        <div className="right">
        </div>
      </div>
      <div className = 'contents'> 
        <div className = 'content1'>  
          <form onSubmit={(e) => onHandleSubmitBtn(e,scholarshipForm.id)}>
            <div className="scholarListCrea-announceForm" >
              <EditDetailForm/>
            </div> 

            {/* ----- FOOTER ------ */}
            <div className="footer1">
              <div className="btn-confirm-scholarCre ">
                <button className="btn-confirm green1" type="submit">
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

export default ScholarshipEdit;

//