/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import Aplicants from '../../data/datanews.js';

import { WebContext } from '../../App';
import Axios from 'axios';
import Swal from 'sweetalert2';
import SweetAlert2 from 'react-sweetalert2';

function InterviewData(){
  const { User,Query,TypeQuery } = useContext(WebContext);
  const [typeQuery, setTypeQuery] = TypeQuery;

  const { Content } = useContext(WebContext)
  const [content, setContent] = Content;
  const [user,setUser] = User;
  const [ScholarshipList, setScholarshipList] = useState([])
  
  function getScholarshipList () {
    Axios.get("http://localhost:5000/getAllScholarship").then((response) => { 
      var result = response.data;

      // filter on scholarship that are open for register
      if (user.role === 'student' || user.role === 'interviewer') {
        result = result.filter((scholarship) => scholarship.status === 1)
      }

      if (result.length !== 0) {
        result.forEach((res, index) => {
          Axios.post("http://localhost:5000/getDonator",{ 
            id: res.donator_id 
          }).then(async(donator) => {
            Object.assign(res, {
              id                : res.id,
              status            : res.status,
              type              : res.type,
              detail            : res.detail,
              amount            : res.amount,
              on_year           : res.on_year,
              on_term           : res.on_term,
              open_date         : res.open_date.split("T")[0],
              close_date        : res.close_date.split("T")[0],
              donator_id        : res.donator_id,
              donator           : donator.data[0].name,
              attr_requirement  : JSON.parse(res.attribute_requirement),
              file_requirement  : JSON.parse(res.file_requirement),
              interview_requirement   : JSON.parse(res.interview_requirement),
              appointment       : JSON.parse(res.appointment),
              toggleContent     : false
            });
          })
        });
      }
      setScholarshipList(result);
    })
  }

  useEffect(() => {
    getScholarshipList();
  }, [])

  return (
    ScholarshipList.filter( scholarship => {
      if (typeQuery=="ทุนทั้งหมด"){
        return scholarship
      } else if (scholarship.type.includes(typeQuery)){
        return scholarship
      }
    }).map((scholarship, scholarship_index) => (
        <div key={scholarship_index}>
            
          <div className="list4"> 
            <div className="list4-left">
              {/* HEADER */}
              <div className='box30 text1'>
                <h5>{scholarship.type}</h5>
              </div>
              {/* DETAIL */}
              <div className='box60 text1'>
                <h6>ทุนประจำปีการศึกษา {scholarship.on_year } {scholarship.on_term}</h6>
                <p>{scholarship.open_date.split("T")[0].split('-').reverse().join('/')} - {scholarship.close_date.split("T")[0].split('-').reverse().join('/')}</p>
              </div>
            
              {/* PANEL */}
              <div className='panel2 box10'>
                <div className='admin-panel2'>
                  {/* FOR SPACING */}
                </div>
                <div className='user-panel2'>
                  <p 
                    className='text2'
                    onClick={ 
                      () => { 
                        scholarship.toggleContent = !scholarship.toggleContent; 
                        setScholarshipList([...ScholarshipList]); 
                      }
                    }
                  >
                    {
                      !scholarship.toggleContent ?
                      <i className="big-icon bi bi-chevron-down"></i> :
                      <i className="big-icon bi bi-chevron-up"></i> 
                    }
                  </p>  
                  
                </div>

                <div className='admin-panel2'>
                </div>  
              </div> 

            </div>

            <div className="list4-right">
              {
                user.role === 'interviewer' &&
                <button 
                className={"button-half green1" }
                type="button" 
                onClick={() => {localStorage.setItem('ScholarshipID_target', scholarship.id);setContent('IntervieweeList')}}
              >
                <p>ดูรายชื่อคนสัมภาษณ์ </p>
                </button>
              }

              { 
                user.role === 'admin' &&
                <button className={"button-half green1"}type="button" onClick={() => {localStorage.setItem('ScholarshipID_target', scholarship.id);setContent('IntervieweeList')}}>
                <p> รายชื่อผู้รอการอนุมัติ </p>
                </button>
              }
      
              {
                user.role === 'admin' &&
                <button 
                  className={scholarship.appointment? "button-half sky": "button-half orange1"}
                  type="button" 
                  onClick={async () => {
                    if (!scholarship.appointment) {
                      scholarship.appointment = {
                        date : '',
                        time : '',
                        meet_code : '',
                        meet_link : '',
                      }
                    }

                    Swal.fire({
                      title: 'สร้างนัดหมายการสัมภาษณ์',
                      html:
                        '<pre>' + 
                        `วันที่:<input value="${scholarship.appointment.date}" type="date" id="swal-input1" class="swal2-input">\n` +
                        `เวลา:<input value="${scholarship.appointment.time}" type="time" id="swal-input2" class="swal2-input">\n` +
                        `รหัส Meeting:<input value="${scholarship.appointment.meet_code}" id="swal-input3" class="swal2-input">\n` +
                        `ลิงค์ Meeting:<input value="${scholarship.appointment.meet_link}" id="swal-input4" class="swal2-input">\n` +
                        '<pre>',
                      showDenyButton: false,
                      showCancelButton: true,
                      confirmButtonText: 'Save',
                      denyButtonText: `Don't save`,
                      focusConfirm: false,
                      preConfirm: () => {
                        return [
                          document.getElementById('swal-input1').value,
                          document.getElementById('swal-input2').value,
                          document.getElementById('swal-input3').value,
                          document.getElementById('swal-input4').value
                        ]
                      }
                    }).then((result) => {
                      if (result.isConfirmed) {
                        if (result.value) {
                          // Swal.fire(JSON.stringify(formValues))
                          var appointment_data = {
                            date : result.value[0],
                            time : result.value[1],
                            meet_code : result.value[2],
                            meet_link : result.value[3],
                          }
                          Axios.post("http://localhost:5000/editAppointment", { 
                            id : scholarship.id,
                            appointment : JSON.stringify(appointment_data)
                          }).then((response) => {
                            if (response.data.errno) { // Check if Backend return error
                              console.log(response.data)
                              Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
                              return;
                            }
                            Swal.fire('Saved!', '', 'success')
                            scholarship.appointment = appointment_data;
                            setScholarshipList([...ScholarshipList])
                          })
                        }
                      }
                    })
                  }}
                >
                  <p> {scholarship.appointment? 'ดูเวลาสัมภาษณ์': 'สร้างเวลาสัมภาษณ์'} </p>
                </button>
              }
              { 
                user.role === 'admin' &&
                <button className={"button-half yellow1"}type="button" onClick={() => {localStorage.setItem('ScholarshipID_target', scholarship.id);setContent('InterviewerChoose')}}>
                <p> ตั้งคณะกรรมการ </p>
                </button>
              }
              {
                user.role === 'interviewer' &&
                <button 
                className={scholarship.appointment? "button-half sky": "button-half orange1"}
                type="button" 
                onClick={async () => {
                    
                  // if appointment not exist
                  if (!scholarship.appointment) {
                    return;
                  }

                  var month_th      = ["", "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
                  var dmy = scholarship.appointment.date.split('-').reverse();
                  var appointment_data =  `<b>วันที่ ${parseInt(dmy[0])} ${month_th[parseInt(dmy[1], 10)]} พ.ศ. ${(parseInt(dmy[2]) + 543)}</b> \n` +
                                          `<b>Meeting time :</b> ${scholarship.appointment.time}    \n` +
                                          `<b>Meeting code :</b> ${scholarship.appointment.meet_code}\n` +
                                          `<b>Meeting link :</b> <a href="${scholarship.appointment.meet_link}" target="_blank">link</a>     `

                  Swal.fire({
                    title: '<pre>' + appointment_data + '</pre>',
                    icon: 'info',
                    html: ''  ,
                    customClass: {
                      popup: 'format-pre'
                    }
                  })
                }
                
              }
              >
              <p> {scholarship.appointment? 'ดูเวลาสัมภาษณ์': 'รอเวลานัดหมาย'} </p>
                </button>
              }

            </div> 
          </div>

          <div>
            { 
              scholarship.toggleContent &&
              <div className="detail2">
                <div className="left">
                  <span>
                    <b>รายละเอียด</b>
                    <p className='preline'>{scholarship.detail}</p>
                  </span>
                  <span>
                    <b>ตั้งแต่นิสิตชั้นปีที่</b>
                    <p>{scholarship.attr_requirement?scholarship.attr_requirement.min_nisit_id:""} ถึง {scholarship.attr_requirement.max_nisit_id}</p>
                  </span>
                  <span>
                    <b>ประจำปีการศึกษา</b>
                    <p>{scholarship.on_year}</p>
                  </span>
                  <span>
                    <b>ภาคเรียนที่</b>
                    <p>{scholarship.on_term}</p>
                  </span>
                  <span>
                    <b>ผู้สนับสนุน</b>
                    <p>{scholarship.donator}</p>
                  </span>
                </div>

                <div className="right">
                  <span>
                  
                  </span>

                  <span>
                    <b>คุณสมบัติ</b>
                    <p>1. เกรดเฉลี่ยสะสม {scholarship.attr_requirement.min_gpa}</p>
                    <p>2. สำหรับนิสิตตั้งแต่รหัส {scholarship.attr_requirement.min_nisit_id} ขึ้นไป</p>
                    <p>3. รหัสนิสิตไม่เกิน {scholarship.attr_requirement.max_nisit_id}</p>
                    <p>4. มีความวิริยะอุตสาหะและมีความตั้งใจในการศึกษาเล่าเรียน</p>
                    <p>5. มีความประพฤติเรียบร้อย ไม่เคยถูกลงโทษทางวินัย</p>
                  </span>

                  <span>
                    <b>เอกสารที่ต้องการ</b>
                    { 
                      scholarship.file_requirement.map(
                        ( {title, format}, rqIdx ) => {
                          return <p key={rqIdx}>{rqIdx+1} {title} - {format}</p>
                        }
                      ) 
                    }
                  </span>
                </div> 
              </div>
            }
          </div>

        </div>   
    ))  
  )
}

export default InterviewData;
