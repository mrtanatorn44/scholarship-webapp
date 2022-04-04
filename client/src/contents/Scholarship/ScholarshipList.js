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

  
  function getDateFormat(date) {
    // [yyyy,mm,dd]
    var month_th      = ["", "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    return "วันที่ " + (parseInt(date[2])) + " " + month_th[parseInt(date[1], 10)] + " พ.ศ. " + (parseInt(date[0]) + 543);
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

  const ChangeIs_public = (scholar,is_public) => {
    console.log(scholar);
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
        Axios.post("http://localhost:5000/editScholar", { 
          id                : scholar.id, 
          donator_id        : scholar.donator_id,
          is_public         : is_public,
          type              : scholar.type,
          detail            : scholar.detail,
          amount            : scholar.amount,
          min_student_year  : scholar.min_student_year,
          max_student_year  : scholar.max_student_year,
          on_year           : scholar.on_year,
          on_term           : scholar.on_term,
          open_date         : scholar.open_date,
          close_date        : scholar.close_date,
          required          :  JSON.stringify(scholar.required),
          rating            : scholar.rating
        }).then((response) => { 
          getScholarshipList();
          Swal.fire(scholar.is_public? "ปิดประกาศแล้ว":"เปิดประกาศแล้ว",'','success')
        })
      }
    })
    
  }

  useEffect(() => {
    getScholarshipList();
  }, [])
  
  return (
    ScholarshipList.map((item, index) => (
    <>
    {
      (user.role === 'student' || user.role === 'interviewer') && item.is_public === 1 && 
      <div className="d-flex" key={index}> 
        <div className="list3">

          <div className = 'title'>
            <h2>{item.type}</h2>
            <h3>ทุนประจำปีการศึกษา {item.on_year } {item.on_term}</h3>
          </div>

          { item.toggleContent ?
          <div className="detail2">
            <div className="left" style={{float:'left'}}>
              <span>
                <b>ตั้งแต่นิสิตชั้นปีที่</b>
                <p>{item.min_student_year} ถึง {item.max_student_year}</p>
              </span>
              <span>
                <b>ประจำปีการศึกษา</b>
                <p>{item.on_year}</p>
              </span>
              <span>
                <b>ภาคเรียนที่</b>
                <p>{item.on_term}</p>
              </span>
              <span>
                <b>ผู้สนับสนุน</b>
                <p>{item.donator}</p>
              </span>
            </div>

            <div className="right" style={{float:'right'}}>
              <span>
                <b>เปิดรับสมัครตั้งแต่วันที่</b>
                <p>{getDateFormat(item.open_date.split("-"))} <br/>
                ถึง {getDateFormat(item.close_date.split("-"))}</p>
              </span>

              <span>
              <b>เอกสารที่ต้องการ</b>
              { 
                item.required.map(( {label, format}, index ) => {
                  return <p key={index}>{index+1} {label} - {format}</p>
                }) 
              }
              </span>

            </div> 
          </div>
          :
          <div className="detail2">
            <span>{item.detail}</span>
          </div> }
    
          <div className='bottom1'>

            
            <div className='admin-panel'>
            { 
              user.role === 'admin' &&
              <>
                <button className="button-admin orange1" onClick={ () => { onDeleteScholarship(item.id); }}> ลบ </button>
                <button className="button-admin red1" onClick={ () => { localStorage.setItem('scholarshipEditID_target', item.id); setContent('ScholarshipEdit') }}> แก้ไข </button>
              </>
            }
            </div>  

            <div className='user-panel'>
              <h3 onClick={ () => { item.toggleContent = !item.toggleContent; setScholarshipList([...ScholarshipList]); }}>
                { !item.toggleContent ? "รายละเอียดเพิ่มเติม (แสดง)" : "รายละเอียดเพิ่มเติม (ซ่อน)" }
              </h3>  
            </div>

          </div> 
        </div>

        <div className="list3-panel">
        { 
          user.role === 'student' &&
          <button 
            className='button-big bg-ku-green'
            type="button"
            onClick={() => { 
              setContent('ScholarshipListRegister'); 
            }}
          >
            <p>ลงทะเบียน</p>
          </button>
        }
        { 
          user.role !== 'student' && user.role !== 'admin' &&
          <button 
            className="button-big gray1"
            type="button" 
          >
            <p> ไม่สามารถใช้ได้ </p>
          </button>
        }
    
        </div> 
       </div>
    }
    {
      user.role === 'admin' && 
      <div className="d-flex" key={index}> 
        <div className="list3">

          <div className = 'title'>
            <h2>{item.type}</h2>
            <h3>ทุนประจำปีการศึกษา {item.on_year } {item.on_term}</h3>
          </div>

          { item.toggleContent ?
          <div className="detail2">
            <div className="left" style={{float:'left'}}>
              <span>
                <b>ตั้งแต่นิสิตชั้นปีที่</b>
                <p>{item.min_student_year} ถึง {item.max_student_year}</p>
              </span>
              <span>
                <b>ประจำปีการศึกษา</b>
                <p>{item.on_year}</p>
              </span>
              <span>
                <b>ภาคเรียนที่</b>
                <p>{item.on_term}</p>
              </span>
              <span>
                <b>ผู้สนับสนุน</b>
                <p>{item.donator}</p>
              </span>
            </div>

            <div className="right" style={{float:'right'}}>
              <span>
                <b>เปิดรับสมัครตั้งแต่วันที่</b>
                <p>{getDateFormat(item.open_date.split("-"))} <br/>
                ถึง {getDateFormat(item.close_date.split("-"))}</p>
              </span>

              <span>
              <b>เอกสารที่ต้องการ</b>
              { 
                item.required.map(( {label, format}, index ) => {
                  return <p key={index}>{index+1} {label} - {format}</p>
                }) 
              }
              </span>

            </div> 
          </div>
          :
          <div className="detail2">
            <span>{item.detail}</span>
          </div> }
    
          <div className='bottom1'>

            
            <div className='admin-panel'>
            { 
              user.role === 'admin' &&
              <>
                <button className="button-admin orange1" onClick={ () => { onDeleteScholarship(item.id); }}> ลบ </button>
                <button className="button-admin red1" onClick={ () => { localStorage.setItem('scholarshipEditID_target', item.id); setContent('ScholarshipEdit') }}> แก้ไข </button>
              </>
            }
            </div> 

            <div className='user-panel'>
              <h3 onClick={ () => { item.toggleContent = !item.toggleContent; setScholarshipList([...ScholarshipList]); }}>
                { !item.toggleContent ? "รายละเอียดเพิ่มเติม (แสดง)" : "รายละเอียดเพิ่มเติม (ซ่อน)" }
              </h3>  
            </div> 

          </div> 
        </div>

        <div className="list3-panel">
        { 
          user.role === 'admin' &&
          <button 
            className={ item.is_public? "button-big red1" : "button-big green1" }
            type="button" 
            onClick={() => { 
              {
                console.log(item.is_public)
                if (item.is_public === 0){
                  ChangeIs_public(item,1)
                  console.log("ประกาศ")
                }
                else{
                  ChangeIs_public(item,0)
                }
              }
              //ChangeIs_public(item, item.is_public? false:true )
              
            }}
          >
            <p> {item.is_public? "ยกเลิกการประกาศ":"ประกาศ"} </p>
          </button>
        }
        { 
          user.role !== 'student' && user.role !== 'admin' &&
          <button 
            className="button-big bg-gray"
            type="button" 
          >
            <p> ไม่สามารถใช้ได้ </p>
          </button>
        }
    
        </div> 
       </div>
    }
    
     </> 
     
    ))
    
     
  )
}   

export default ScholarshipList;