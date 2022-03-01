import React, { useContext, useState, useEffect } from 'react';
import Aplicants from '../data/datanews.js';
import AlertModal from '../modals/AlertModal.js';
import { WebContext } from '../App';
import Axios from 'axios';


function IntervieweeList(props){
  const { Query } = useContext(WebContext);
  const [query, setQuery] = Query;
  const { Content } = useContext(WebContext)
  const [content, setContent] = Content;
  const [User,setUser] = useState([]);
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

    const getUser = () =>{
      Axios.get("http://localhost:5000/getUser").then(response => {
        setUser(response.data)
        
      })
    }
    useEffect(() => {
      getUser();
    }, [])


  return (
    User.filter((user)=>{
      if(query == ""){
        return user;
      }else if(user.email.toLowerCase().includes(query.toLowerCase())){
        return user;
      }
    }).map((user,index) => (
      <div className="intervieweeList" key={index} >
        <div className='title'>
          <h2>{user.fname}</h2>
        </div>
        <div className="Test">
          <h2>ทุนเรียนดี</h2>
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
          {showModal && <AlertModal sendConfirm={getConfirm}/>}  
        </div>
      </div>
    ))
  )
}

export default IntervieweeList;
