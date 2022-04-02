/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App';
import Axios from 'axios';
import Swal from 'sweetalert2';

function ScholarshipList() {

  const { User, Content } = useContext( WebContext )
  const [user,setUser] = User;
  const [content, setContent] = Content;
  const [Donator,setDonator]=useState("");
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
    donator         : '',
    required        : '',
    toggleContent   : false
  }])


  function getScholarshipList () {
    Axios.get("http://localhost:5000/getAllScholarship").then((response) => { 
      var result = response.data;
      if (result.length !== 0) {
        result.forEach((res, index) => {

          Axios.post("http://localhost:5000/getDonator",{ 
            id: res.donator_id 
          }).then((donator) => {
            console.log(donator.data[0].name)
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
              donator_id        : res.donator_id,
              donator           : donator.data[0].name,
              required          : JSON.parse(res.required),
              toggleContent     : false
            });
          })
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

  const ChangeIs_public = (scholar,e) => {
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "ที่จะประกาศ!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#03A96B',
      confirmButtonText: 'ประกาศ',
      cancelButtonColor: '#A62639',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post("http://localhost:5000/editScholar", 
          { id : scholar.id, 
            donator_id:scholar.donator_id,
            is_public:e ,
            type: scholar.type,
            detail:scholar.detail,
            amount:scholar.amount,
            min_student_year:scholar.min_student_year,
            max_student_year:scholar.max_student_year,
            on_year:scholar.on_year,
            on_term:scholar.on_term,
            open_date:scholar.open_date,
            close_date:scholar.close_date,
            required:scholar.required,
            rating:scholar.rating
          }
        ).then((response) => { 
          getScholarshipList();
          Swal.fire('!!!','','success')
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

        <div className="list3">

          <div className = 'title'>
            <h2>{item.type}</h2>
            <h3>ทุนประจำปีการศึกษา {item.on_year } {item.on_term}</h3>
          </div>

          { item.toggleContent ?
          <div>
            <div style={{float:'left'}}>
              <b>ตั้งแต่นิสิตชั้นปีที่</b>
              <p>{item.min_student_year} ถึง {item.max_student_year}</p>
              <b>ประจำปีการศึกษา</b>
              <p>{item.on_year}</p>
              <b>ภาคเรียนที่</b>
              <p>{item.on_term}</p>
              <b>ผู้สนับสนุน</b>
              <p>{item.donator}</p>
            </div>

            <div style={{float:'right'}}>
              <b>เปิดรับสมัครตั้งแต่วันที่</b>
              <p>{item.open_date.split("T")[0]} ถึง {item.close_date.split("T")[0]}</p>
              <p></p>

              <b>เอกสารที่ต้องการ</b>
              { item.required.map(( {label, format}, index ) => {
                return <p key={index}>{index+1} {label} - {format}</p>
              }) }

            </div> 
          </div>
          :
          <div className="test">
            <p>{item.detail}</p>
          </div> }
    
          <div className='bottom1'>

            { user.role === 'admin' &&
            <div className='admin-panel'>
              <button className="button-admin orange1" onClick={ () => { onDeleteScholarship(item.id); }}> ลบ </button>
              <button className="button-admin red1" onClick={ () => { localStorage.setItem('scholarshipEditID_target', item.id); setContent('ScholarshipEdit') }}> แก้ไข </button>
            </div> }

            <div className='user-panel'>
              <h3 onClick={ () => { item.toggleContent = !item.toggleContent; setScholarshipList([...ScholarshipList]); }}>
                { !item.toggleContent ? "รายละเอียดเพิ่มเติม (แสดง)" : "รายละเอียดเพิ่มเติม (ซ่อน)" }
              </h3>  
            </div>

          </div> 
        </div>

        {/*<button className="button-big" type="button" onClick={ () => {setContent('ScholarshipListRegister')} }>
          ลงทะเบียน
            </button>*/}

        {user.role === 'student' &&
        <div className='student-panel'>
          <button className="button-big" type="button" onClick={ () => { setContent('ScholarshipListRegister'); }}>
            <p>ลงทะเบียน</p>
          </button>
        </div> }
        {user.role === 'admin' &&
        <div className='admin-panel'>
        {
          item.is_public === 0 &&  
            <button className="button-big" type="button" onClick = {() => {ChangeIs_public(item,true)}}>
                <p>ประกาศ</p>
             </button>
        
           
        }

        { item.is_public === 1 &&
             <button className="button-big" type="button" onClick = {() => {ChangeIs_public(item,false)}}>
               <p>ยกเลิกการประกาศ</p>
             </button>
         }
        </div>}
      </div>
    ))
  )
}   

export default ScholarshipList;