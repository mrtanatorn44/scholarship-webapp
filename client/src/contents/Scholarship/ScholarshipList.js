import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App';
import Axios from 'axios';


/* eslint-disable */

//import ImageModal from "../../modals/ImageModal.js";
//import AlertModal from '../../modals/AlertModal.js';
//import ConfirmDeleteModal from '../../modals/ConfirmModal.js';
import Swal from 'sweetalert2';
import Lightbox from 'react-image-lightbox';
function ScholarshipList(props) {

  const { User, Content ,EditScholarshipID } = useContext(WebContext)

  const [user,setUser] = User;
  const [content, setContent] = Content;

  const [editScholarshipID,setEditScholarshipID]= EditScholarshipID;
  const [Check, setCheck] = useState(false)
  

  const [Scholar, setScholar] = useState([{
    id : '',
    is_public       : false,
    type            : '',
    detail          : '',
    amount          : '',
    min_student_year: '',
    max_student_year: '',
    on_year         : '',
    on_term         : '',
    open_date       : '',
    close_date      : '',
    check           :false
  }])

  const getScholar = () => {
    Axios.get("http://localhost:5000/getAllScholarship").then((response) => { 
            var result = response.data;
            if (result.length === 0) {
              result = [{ 
                id : '',
                is_public       : false,
                type            : '',
                detail          : '',
                amount          : '',
                min_student_year: '',
                max_student_year: '',
                on_year         : '',
                on_term         : '',
                open_date       : '',
                close_date      : '',
                check           :false,
              }]
            } else {
              result.forEach((res, index) => {
                Object.assign(res, {
                  id                : res.id,
                  is_public         : res.is_public,
                  type              : res.type,
                  detail            : res.detail,
                  amount            : res.amount,
                  min_student_year  : res.min_student_year,
                  max_student_year  : res.max_student_year,
                  on_year           : res.on_year,
                  on_term           : res.on_term,
                  open_date         : res.open_date,
                  close_date        : res.close_date,
                  check             :false
                });
              });
            }
            setScholar(result);
          })
    }
    //console.log(Scholarna);
    
  
  const onHandleDeleteScholarBtn = (scholarID) => {
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "ที่จะลบประกาศนี้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#03A96B',
      confirmButtonText: 'Delete',
      cancelButtonColor: '#A62639',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        if (user.role === 'admin') {
          Axios.post("http://localhost:5000/deleteScholarship", { id : scholarID }).then((response) => { 
            setScholar([]);
            Swal.fire('ลบประกาศเรียบร้อย!','','success')
          })
        }
      }
    })
  }

  
  
  
 
  
  


  const checkState = (index) => {
    let a=[...Scholar];
    a[index].check=!a[index].check;
    setScholar(a); 
  }

  //get user
  const getUser = () =>{
    Axios.get("http://localhost:5000/getUser").then(response => {
      //setUser(response.data)
      
    })
  }

  useEffect(() => {
    getUser();
    getScholar();
  }, [])
  
  
  return (
    Scholar.map((scholar, index) => (
      <div className="d-flex" key={index}>
        <div className="scholar-list">
          <div className = 'title'>
            <h2>{scholar.type}</h2>
            <h3>ทุนประจำปีการศึกษา {scholar.on_year } {scholar.on_term}</h3>
          </div>
          <div className="test">

            <p>{scholar.open_date} - {scholar.close_date}</p>
            <p>สำหรับนิสิตปี{scholar.min_student_year}-{scholar.max_student_year}</p>
          </div>
          <div className='bottom1'>
            <div className='admin-panel'>
              {
                user.role === 'admin' &&
                <>
              
                  <button className="button-admin red2" onClick={() => { onHandleDeleteScholarBtn(scholar.id); }} > ลบ </button>
                  <button className="button-admin red1" onClick={ () =>{ setEditScholarshipID(scholar.id);setContent('ScholarshipEdit') }} > แก้ไข </button>
                  
                </>
              }
              
            </div> 
            <div className='user-panel'>
              <h3 onClick={() => checkState(index)}>
                {!scholar.check ? "รายละเอียดเพิ่มเติม (แสดง)" : "รายละเอียดเพิ่มเติม (ซ่อน)"}
              </h3>  
            </div>
          </div> 
            {scholar.check  && <h4>{scholar.detail}</h4>} 
        </div>
        <button className = "button-big" item="button" onClick={ () => {setContent('ScholarshipListRegister')}}>
          ลงทะเบียน
        </button>
      </div>
    ))
  )
}   

export default ScholarshipList;

//