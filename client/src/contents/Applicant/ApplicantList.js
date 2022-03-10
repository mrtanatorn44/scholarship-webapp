import React, { useContext, useState, useEffect } from 'react';
import Applicants from '../../data/datanews.js';
//import AlertModal from '../../modals/AlertModal.js';
import { WebContext } from '../../App';



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
    Applicants.map((applicants, index) => (
      <div className="container1" key={index}>
        <div className='title'>
          <h2>{applicants.title}</h2>
        </div>
        <div className='information'>
          <div className='left'>
            <h3>{applicants.title}</h3>
          </div>
          <div className="right" >
            <button className="button-2 d-flex" type="button" onClick={ () => setContent('ScholarshipCheckForm') }>
              <i className="bi bi-hourglass"></i>
              <p>ตรวจสอบเอกสาร</p>
            </button>
            <button className="button-2 d-flex"  type="button" onClick={ () => setContent('ProfileCheck') }>
              <i className="bi bi-search"></i>
              <p>ตรวจสอบประวัติ</p>
            </button>  
            

            {/*showModal && <AlertModal sendConfirm={getConfirm}/>*/}  
          </div>
        </div>
      </div>
    ))
  )
}

export default ApplicantList;
