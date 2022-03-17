/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App';
import Axios from 'axios';
import Swal from 'sweetalert2';

function ScholarshipList() {

  const { User, Content } = useContext( WebContext )
  const [user,setUser] = User;
  const [content, setContent] = Content;

  const [ScholarshipList, setScholarshipList] = useState([{
    id              : '',
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
    sponsor         : '',
    toggleContent   : false
  }])

  function getScholarshipList () {
    Axios.get("http://localhost:5000/getAllScholarship").then((response) => { 
      var result = response.data;
      if (result.length !== 0) {
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
            open_date         : res.open_date.split("T")[0],
            close_date        : res.close_date.split("T")[0],
            sponsor           : res.sponsor,
            toggleContent     : false
          });
        });
      }
      setScholarshipList(result);
    })
  }
    
  const onDeleteScholarship = (scholarID) => {
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
        Axios.post("http://localhost:5000/deleteScholarship", 
          { id : scholarID }
        ).then((response) => { 
          getScholarshipList();
          Swal.fire('ลบประกาศเรียบร้อย!','','success')
        })
      }
    })
  }

  useEffect(() => {
    getScholarshipList();
  }, [])
  
  return (
    ScholarshipList.map((item, index) => (
      <div className="d-flex" key={index}>

        <div className="scholar-list">

          <div className = 'title'>
            <h2>{item.type}</h2>
            <h3>ทุนประจำปีการศึกษา {item.on_year } {item.on_term}</h3>
          </div>
   
          { item.toggleContent ?
          <div>
            <div style={{float:'left'}}>
              <b>คุณสมบัติ</b>
              <p>1</p>
              <p>2</p>
              <p>3</p>
            </div>
            <div style={{float:'right'}}>
              <b>วันเวลาในการรับสมัคร{item.open_date}</b>
              <p>เอกสารและหลักฐานที่ต้องการในการสมัครขอรับทุน</p>
              <p>1</p>
              <p>2</p>
            </div> 
          </div>
          :
          <div className="test">
            <p>{item.open_date} to {item.close_date}</p>
            <p>สำหรับนิสิตปี {item.min_student_year}-{item.max_student_year}</p>
          </div> }
    
          <div className='bottom1'>

            { user.role === 'admin' &&
            <div className='admin-panel'>
              <button className="button-admin red2" onClick={ () => { onDeleteScholarship(item.id); }}> ลบ </button>
              <button className="button-admin red1" onClick={ () => { localStorage.setItem('scholarshipEditID_target', item.id); setContent('ScholarshipEdit') }}> แก้ไข </button>
            </div> }

            <div className='user-panel'>
              <h3 onClick={ () => { item.toggleContent = !item.toggleContent; setScholarshipList([...ScholarshipList]); }}>
                { !item.toggleContent ? "รายละเอียดเพิ่มเติม (แสดง)" : "รายละเอียดเพิ่มเติม (ซ่อน)" }
              </h3>  
            </div>

          </div> 
        </div>

        <button className="button-big" type="button" onClick={ () => {setContent('ScholarshipListRegister')} }>
          ลงทะเบียน
        </button>

      </div>
    ))
  )
}   

export default ScholarshipList;