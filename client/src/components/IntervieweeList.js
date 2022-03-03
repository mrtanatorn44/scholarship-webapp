import React, { useContext, useState, useEffect } from 'react';
import Aplicants from '../data/datanews.js';
import AlertModal from '../modals/AlertModal.js';
import { WebContext } from '../App';
import Axios from 'axios';


function IntervieweeList(props){
  const { Query } = useContext(WebContext);
  const [query, setQuery] = Query;
  const { User, Content } = useContext(WebContext)
  const [user,setUser] = User;
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

 //get user
 const getUser = () =>{
  Axios.get("http://localhost:5000/getUser").then(response => {
    //setUser(response.data)
    
  })
}
useEffect(() => {
  getUser();
}, [])

  return (
    Aplicants.filter((aplicants)=>{
      if(query == ""){
        return aplicants;
      }else if(aplicants.title.toLowerCase().includes(query.toLowerCase())){
        return aplicants;
      }
    }).map((aplicants,index) => (
      <div className="intervieweeList" key={index} >
        <div className='title'>
          <h2>{aplicants.title}</h2>
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

          <button className="button-clock d-flex"  type="button"onClick={() => setContent('InterviewSchedule') }>
            <i className="bi bi-clock"/>
            <p>เวลาสัมภาษณ์</p>
          </button> 
  

          

        </div>
      </div>
    ))
  )
}

export default IntervieweeList;
