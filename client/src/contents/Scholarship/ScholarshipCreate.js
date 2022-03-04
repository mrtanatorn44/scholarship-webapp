import React, { useState, useContext } from 'react';
import { WebContext } from '../../App';
import ConfirmModal from '../../modals/ConfirmModal.js';

import FileForm from './CreateFileform.js';
import RateForm from './CreateRateform.js';
import DetailForm from './CreateDetail.js';

import Axios from 'axios';
function ScholarshipListCreate() {
   
  const { Content } = useContext(WebContext)
  const [content, setContent] = Content;
  const [showModal, setShowModal] = useState(false);
  
  const { Scholar } = useContext(WebContext)
  const [scholar, setScholar] = Scholar;


  

  function getConfirm(data) {
    console.log(scholar);
    if (data) {
      const {type,detail, amount , min_student_year,max_student_year,on_year,on_term,open_date, close_date}=scholar;
      Axios.post("http://localhost:5000/addScholar",{
        is_public       : false,
        type            : type,
        detail          : detail,
        amount          : amount,
        min_student_year: min_student_year,
        max_student_year: max_student_year,
        on_year         : on_year,
        on_term         : on_term,
        open_date:open_date,
        close_date:close_date
      })
      setContent("Scholarship")
    } else {
      //alert('FALSE !') 
    }
    setShowModal(false);
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
        <div className="right"/>
      </div>

      <div className = 'content1'>

        <div className="scholarListCrea-announceForm"> <DetailForm/> </div>
        
        <div className='scholarListCrea-fileForm'> <FileForm/> </div>  
       
        <div className="scholarListCrea-rateForm"> <RateForm/> </div> 
          

        <div className="scholarListCrea-footer">
          <div className="btn-confirm-scholarCre ">
            <button className="btn-confirm" type="submit" onClick={() => setShowModal(true)}>
              ตกลง
            </button>
            { showModal && <ConfirmModal sendConfirm={getConfirm}/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScholarshipListCreate;
