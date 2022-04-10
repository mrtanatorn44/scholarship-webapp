/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App';
import Axios from 'axios';
import Swal from 'sweetalert2';

function ScholarshipList() {

  const { User, Content } = useContext( WebContext )
  const [user,setUser] = User;
  const [content, setContent] = Content;
  const [sch,setSch] = useState([])
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
          }).then((donator) => {
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
              toggleContent     : false
            });
          })
        });
      }
      setScholarshipList(result);
    })
  }
  
  function getForm(){
    Axios.post("http://localhost:5000/getFormByUserID",{
			user_id : user.id
		}).then((response) => {
      var result = response.data;
      result.forEach(res => {
        setSch((sch)=>[...sch,res.scholarship_id])
      });
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

  const ChangeIs_public = (scholar, status) => {
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
        Axios.post("http://localhost:5000/editScholarshipStatus", { 
          id                : scholar.id, 
          status            : status
        }).then((response) => { 
          getScholarshipList();
          Swal.fire(scholar.status? "ปิดประกาศแล้ว":"เปิดประกาศแล้ว",'','success')
        })
      }
    })
  }

  useEffect(() => {
    getScholarshipList();
    getForm();
  }, [])
  
  return (
    <>
      {
        ScholarshipList.length === 0 &&
        <div className='w100 h100 text3'>
          <h3>ไม่มีทุนที่เปิดให้ลงทะเบียนในขณะนี้</h3>
        </div>
      }
      {
        ScholarshipList.map((scholarship, scholarship_index) => (
          <div key={scholarship_index}>
            <div className="list3"> 
              <div className="list3-left">
                {/* HEADER */}
                <div className='w30 text1'>
                  <h4>{scholarship.type}</h4>
                </div>
                {/* DETAIL */}
                <div className='box40 text1'>
                  <h6>ทุนประจำปีการศึกษา {scholarship.on_year } {scholarship.on_term}</h6>
                  <p>{scholarship.open_date.split("T")[0].split('-').reverse().join('/')} - {scholarship.close_date.split("T")[0].split('-').reverse().join('/')}</p>
                </div>
              
                {/* PANEL */}
                <div className='panel2 w30'>
                  <div className='admin-panel2'>
                    {/* FOR SPACING */}
                  </div>
                  <div className='user-panel2 '>
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
                    { 
                      user.role === 'admin' &&
                      <>
                        <button className="button-admin2 orange1" onClick={ () => { onDeleteScholarship(scholarship.id); }}> ลบ </button>
                        <button className="button-admin2 red1" onClick={ () => { localStorage.setItem('scholarshipEditID_target', scholarship.id); setContent('ScholarshipEdit') }}> แก้ไข </button>
                      </>
                    }
                  </div>  
                </div> 

              </div>

              <div className="list3-right">
                { 
                  user.role === 'student' &&
                  <button 
                    className={sch.includes(scholarship.id)?"button-big gray1":"button-big green1"}
                    onClick={() => {
                      if (sch.includes(scholarship.id)) {
                        return;
                      }

                      localStorage.setItem('scholarshipRegisterID_target', scholarship.id);
                      setContent('ScholarshipRegister')
                    }}
                  >
                    {sch.includes(scholarship.id)?"ลงทะเบียนแล้ว":"ลงทะเบียน"}
                  </button>
                }
                { 
                  user.role === 'interviewer' &&
                  <button 
                    className="button-big gray1"
                    type="button" 
                  >
                    <p> ไม่สามารถใช้ได้ </p>
                  </button>
                }
                { 
                  user.role === 'admin' &&
                  <button 
                    className={ scholarship.status? "button-big red1" : "button-big green1" }
                    type="button" 
                    onClick={() => { 
                      {
                        console.log(scholarship.status)
                        if (scholarship.status === 0){
                          ChangeIs_public(scholarship,1)
                          console.log("ประกาศ")
                        }
                        else{
                          ChangeIs_public(scholarship,0)
                        }
                      }
                      //ChangeIs_public(scholarship, scholarship.is_public? false:true )
                      
                    }}
                  >
                    <p> {scholarship.status? "ยกเลิกการประกาศ":"ประกาศ"} </p>
                  </button>
                }
              </div> 

            </div>
            { 
              scholarship.toggleContent &&
              <div className="detail2">
                <div className="left">
                  <span>
                    <b>ลายละเอียด</b>
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
        ))  
      }
    </>
  )
}   

export default ScholarshipList;