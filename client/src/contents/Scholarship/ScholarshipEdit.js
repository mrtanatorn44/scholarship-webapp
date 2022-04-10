/*eslint no-unused-vars:*/

import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { WebContext } from '../../App';

import EditFileForm from './EditFileform.js';
import EditRateForm from './EditRateform.js';
import EditDetailForm from './EditDetail.js'; 
import EditAttrform from './EditAttrform.js';

// Alert & Image Modal
import Swal from 'sweetalert2'

function ScholarshipEdit() {
   
  const {Content, ScholarshipForm ,FileForm, RateForm,AttrForm} = useContext(WebContext)
  const [content , setContent] = Content;
  const [fileForm , setFileForm]             = FileForm;
  const [rateForm, setRateForm] = RateForm;
  const [scholarshipForm, setScholarshipForm] = ScholarshipForm;
  const [attrForm, setAttrForm] = AttrForm;

  function insertScholarshipToDB(donator_id) {
    Axios.post("http://localhost:5000/editScholarship",{
      donator_id      : donator_id,
      id              : scholarshipForm.id,
      status          : scholarshipForm.status,
      type            : scholarshipForm.type,
      detail          : scholarshipForm.detail,
      amount          : scholarshipForm.amount,
      min_student_year: scholarshipForm.min_student_year,
      max_student_year: scholarshipForm.max_student_year,
      on_year         : scholarshipForm.on_year,
      on_term         : scholarshipForm.on_term,
      open_date       : scholarshipForm.open_date,
      close_date      : scholarshipForm.close_date,
      attribute_requirement   : JSON.stringify(attrForm),
      file_requirement        : JSON.stringify(fileForm),
      interview_requirement   : JSON.stringify(rateForm)
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
        Axios.get("http://localhost:5000/getallDonator").then(response => {
          var result = response.data
          result.forEach((res, index) => {  
            console.log(res.name)
            if (res.name === scholarshipForm.donator) {
              console.log('Exist Donator :', res.name, res.id)
              donator_id = res.id
              insertScholarshipToDB(res.id)
            }
          })
          
          console.log('id :', donator_id)
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
          <form onSubmit={(e) => onHandleSubmitBtn(e)}>
            <div className="detailForm" >             
              <EditDetailForm/>
            </div>
            <div className="attrForm">
              <EditAttrform/>
            </div>
            <div className='fileForm'> 
              <EditFileForm/>
            </div> 
            <div className="rateForm">
              <EditRateForm/>
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

export default ScholarshipEdit;