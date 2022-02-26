import React, { useContext, useState, useEffect } from 'react';
import Aplicants from '../data/datanews.js';
import AlertModal from '../modals/AlertModal.js';
import { WebContext } from '../App';



function IntervieweeList(props){
  const { Content } = useContext(WebContext)
  const [content, setContent] = Content;

  const [showModal, setShowModal] = useState(false);

    function getConfirm(data) {
        if (data) {
        //alert('TRUE !')
        // PUSH DATA TO DATABASE
        // CLOSE OR SAVE
        props.sendContent(['admin','ScholarshipStatus']);
        } else {
        //alert('FALSE !')
        }
        setShowModal(false);
    }



  return (
    Aplicants.map((aplicant,index) => (
      <div className="intervieweeList" key={index} >
        <div className='title'>
          <h2>{aplicant.title}</h2>
        </div>
        <div className="intervieweeList-right" >  
          <button className="button-search d-flex" type="button" onClick={ () => setContent('ScholarshipCheckForm') }>
            <i className="bi bi-search"></i>
            <p>ตรวจสอบเอกสาร</p>
          </button>

          <button className="button-search d-flex"  type="button" onClick={ () => setContent('ProfileCheck') }>
            <i className="bi bi-search"></i>
            <p>ตรวจสอบประวัติ</p>
          </button>  

          <button className="button-search d-flex" type="button" onClick={() => setContent('InterviewRate') }>
          <i className="bi bi-search"/>
            <p>การประเมิน</p>
          </button>
          <button className="button-clock d-flex"  type="button"onClick={() => setShowModal(true)}>
            <i className="bi bi-clock"/>
            <p>เวลาสัมภาษณ์</p>
          </button>
          {showModal && <AlertModal sendConfirm={getConfirm}/>}  
        </div>
        <div className='intervieweeList-bottom'>
          <h3>{aplicant.date}</h3>
        </div>
      </div>
    ))
  )
}

export default IntervieweeList;
