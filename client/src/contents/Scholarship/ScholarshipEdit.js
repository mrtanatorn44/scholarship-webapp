import React, { useState, useContext } from 'react';
import { WebContext } from '../../App';
import ConfirmModal from '../../modals/ConfirmModal.js';

import FileForm from './CreateFileform.js';
import RateForm from './CreateRateform.js';
import EditDetailForm from './EditDetail.js'; 

// Alert & Image Modal
import Swal from 'sweetalert2'
import Lightbox from 'react-image-lightbox';

import Axios from 'axios';
function ScholarshipListCreate() {
   
  const {EditScholarshipID, Content } = useContext(WebContext)
  const [ content , setContent] = Content;
  const [showModal, setShowModal] = useState(false);
  
  const { ScholarshipForm } = useContext(WebContext)
  const [scholarshipForm, setScholarshipForm] = ScholarshipForm;
  const [editScholarshipID, setEditScholarshipID]= EditScholarshipID;
  const onHandleSubmitBtn = () => {
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
      }
    })
  }
  /*
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
      if (result.isConfirmed && user.role === 'admin') {
        Axios.post("http://localhost:5000/addAnnounce", {
          title       : form.title,
          detail      : form.detail,
          imageData   : form.image,
          imageName   : form.imageName
        }).then((response) => {
          setAnnounce([]);
          setContent('Announcement');
          Swal.fire('Success!', 'บันทึกประกาศเรียบร้อย', 'success')
        });
      }
    })
  }
  
  */
  

  function getConfirm(data) {
    console.log(scholarshipForm);
    if (data) {
      console.log();
      const {type,detail, amount , min_student_year,max_student_year,on_year,on_term,open_date, close_date, sponsor}=scholarshipForm;

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
        sponsor         : sponsor
      })
      
 
      setContent("Scholarship")
      
    } else {
      //alert('FALSE !') 
    }
    setShowModal(false);
  }
 
  const onFormSumbit = (e) => {
    e.preventDefault();
    setShowModal(true);
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

        <div className="right"/>
      
      </div>
      
        <div className = 'content1'>

          <div className="scholarListCrea-announceForm"> <EditDetailForm/> </div>
          
          <div className='scholarListCrea-fileForm'> <FileForm/> </div>  
        
          <div className="scholarListCrea-rateForm"> <RateForm/> </div> 
            
          <form onSubmit={(e)=> onFormSumbit(e)}> 
          <div className="scholarListCrea-footer">
            <div className="btn-confirm-scholarCre ">
              <button className="btn-confirm" type="submit" onClick={() => onHandleSubmitBtn()}>
                คกลง 
              </button>
              
              <button className="btn-confirm">
                ตกลง 
              </button> 
              
            </div>
          </div>
          </form>
        </div>
      
      { showModal && <ConfirmModal sendConfirm={getConfirm}/>}
    </div>
  )
}

export default ScholarshipListCreate;
