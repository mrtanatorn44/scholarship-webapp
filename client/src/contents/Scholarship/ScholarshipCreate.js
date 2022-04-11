/*eslint no-unused-vars:*/

import React, { useState, useContext } from 'react';
import { WebContext } from '../../App';

import CreateDetailForm from './CreateDetail.js'; 
import CreateAttrForm from './CreateAttrform.js';
import CreateFileForm from './CreateFileform.js';
import CreateRateform from './CreateRateform.js';


// Alert & Image Modal
import Swal from 'sweetalert2'

import Axios from 'axios';
function ScholarshipCreate() {
   
  const { Content, ScholarshipForm, FileForm, RateForm,AttrForm } = useContext(WebContext)
  const [ content , setContent]               = Content;
  const [scholarshipForm, setScholarshipForm] = ScholarshipForm;
  const [ fileForm , setFileForm]             = FileForm;
  const [ rateForm , setRateForm] = RateForm;
  const [attrForm, setAttrForm] = AttrForm;

  function insertScholarshipToDB(donator_id) {
    Axios.post("http://localhost:5000/addScholarship",{
      donator_id      : donator_id,
      status          : 0,
      type            : scholarshipForm.type,
      detail          : scholarshipForm.detail,
      amount          : scholarshipForm.amount,
      on_year         : scholarshipForm.on_year,
      on_term         : scholarshipForm.on_term,
      open_date       : scholarshipForm.open_date,
      close_date      : scholarshipForm.close_date,
      attribute_requirement   : JSON.stringify(attrForm),
      file_requirement        : JSON.stringify(fileForm),
      interview_requirement   : JSON.stringify(rateForm),
    }).then((response) => {
      if (response.data.errno) { // Check if Backend return error
        console.log(response.data)
        Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
        return;
      }
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
          if (response.data.errno) { // Check if Backend return error
            console.log(response.data)
            Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
            return;
          }
          var result = response.data

          result.forEach((res, index) => {  
            if (res.name === scholarshipForm.donator) {
              //console.log('Exist Donator :', res.name, res.id)
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
            if (response.data.errno) { // Check if Backend return error
              Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
              return;
            }
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
        <button className='button-add d-flex' onClick={ () => {setContent('Scholarship')}}>
          <i className='bi bi-arrow-left sky'></i>
            <p>ย้อนกลับ</p>
            </button>
        </div>
      </div>
      <div className = 'contents'> 
        <div className = 'content1'>  
          <form onSubmit={(e) => onHandleSubmitBtn(e)}>
            <div className="detailForm" >
              <CreateDetailForm/>
            </div>
            <div className='attrForm'> 
              <CreateAttrForm/> 
            </div>
            <div className='fileForm'> 
              <CreateFileForm/> 
            </div>  
            <div className="rateForm">
              <CreateRateform/>
            </div> 

            {/* ----- FOOTER ------ */}
            <div className="footer2">
              <div className="confirm">
                <button className="button-confirm green1" type="submit">
                  บันทึก 
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ScholarshipCreate;

//