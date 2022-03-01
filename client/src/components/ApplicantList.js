import React, { useContext, useState, useEffect } from 'react';
import Aplicants from '../data/datanews.js';
import AlertModal from '../modals/AlertModal.js';
import { WebContext } from '../App';



function ApplicantList(props){

  const { Query } = useContext(WebContext);
  const [query, setQuery] = Query;

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
    Aplicants.filter((aplicant)=>{
      if(query == ""){
        return aplicant;
      }else if(aplicant.title.toLowerCase().includes(query.toLowerCase())){
        return aplicant;
      }
    }).map((aplicant,index) => (
      <div className="applicantList" key={index} >
        <div className='title'>
          <h2>{aplicant.title}</h2>
        </div>
        <div className="applicantList-right" >
          <button className="button-search d-flex" type="button" onClick={ () => setContent('ScholarshipCheckForm') }>
            <i className="bi bi-search"></i>
            <p>ตรวจสอบเอกสาร</p>
          </button>

          <button className="button-search d-flex"  type="button" onClick={ () => setContent('ProfileCheck') }>
            <i className="bi bi-search"></i>
            <p>ตรวจสอบประวัติ</p>
          </button>  
          {showModal && <AlertModal sendConfirm={getConfirm}/>}  
        </div>
        <div className='applicantList-bottom'>
          <h3>{aplicant.date}</h3>
        </div>
      </div>
    ))
  )
}

export default ApplicantList;
