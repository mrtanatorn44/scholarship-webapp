/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { WebContext } from '../../App.js';
import Swal from 'sweetalert2';

function IntervieweeList(props){

  const { Query,Content,User} = useContext(WebContext);
  const [content, setContent] = Content;
  const [typeQuery, setTypeQuery] = useState('');
  const [query, setQuery] = Query;
  const [user,setUser] = User;
  const [NameForm,setNameForm] = useState([{id:'',user_id:'',scholarship_id:'',profile_detail:'',file:'',rate:'',status:''}]);
  const[test,setTest]= useState('')
  const [typeList,setTypeList] = useState([
    {label: 'สถานะทั้งหมด',      value: ''},
    {label: 'รอการตรวจสอบ',      value: '1'},
    {label: 'เอกสารไม่ถูกต้อง', value: '9'},
    {label: 'ไม่ผ่านการคัดเลือก', value: '0'}
  ])


  
  function getForm () {
    Axios.post("http://localhost:5000/getFormByScholarshipID",{
      scholarship_id : localStorage.getItem('ScholarshipID_target')
    }).then((response) => {
      if (response.data.errno) { // Check if Backend return error
        Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
        return;
      } 
      var result = response.data;

    //  console.log('res', result)
    // result = res1,res2,res3
      result.forEach((res, index) => {
        res.profile_detail = JSON.parse(res.profile_detail);
      })
      setNameForm(result);
    })
  } 

  const statusForm = (status_number) => {
    switch(status_number) {
      case 1:
        return 'รอการตรวจสอบ';
        break;
      case 2:
        return 'รอการสัมภาษณ์';
        break;
      case 3:
        return 'รออนุมัติ';
        break;
      case 4:
        return 'ได้รับทุนเรียบร้อย';
        break;
      case 8:
        return 'หมดเขตการสมัคร';
        break;
      case 9:
        return 'เอกสารไม่สมบูรณ์';
        break;
      case 0:
        return 'ไม่ผ่าน';
        break;
      default:
        // code block
    }
  }
 
  useEffect(() => {
    getForm();
  }, [])
  
  return(
    <div className="frame">
      <div className="header">
        <div className="left">
          <div className="icons">
            <i className="bi bi-three-dots"></i>
          </div>
          <div className="topic">
          <h4>รายชื่อผู้ขอทุน</h4>
          </div>
        </div>
        <div className="right">
          <button className='button-add d-flex ' onClick={ () => {setContent('Interview')}}>
            <i className='bi bi-arrow-left-circle sky'></i>
            <p>ย้อนกลับ</p>
            </button>
        </div>
      </div>
      <div className="contents">

        <div className='filter-bar'>
        <div className="input-holder25-left" >    
          </div>
          <div className="input-holder25-right" > 
              <input type="text" placeholder="Search" aria-describedby="button-addon2" onChange={event => setQuery(event.target.value)}/>  
          </div> 
        </div>
      
        <div className="content5">
          { 
            NameForm
            .filter((item) => {
              return query==="" || item.profile_detail.name.includes(query)
            })
            .map((item, index) => (
              <>
                { 
                  user.role === 'interviewer' && item.status == 2 &&
                  <div className="list5" key={index} >
                    <div className="list5-left">
                    <p className='text1'>{item.profile_detail.name}<br/>
                      {item.profile_detail.branch}<br/>
                      <p className="status-box peach">{statusForm(item.status)} </p>
                      </p> 
                    </div>

                    <div className="list5-right">
                      <button className="button-test sky"  type="button" onClick={ () => {setContent('InterviewProfile');localStorage.setItem('ProfileCheckID_target', item.user_id )}}>
                        <i className="bi bi-search sky"></i>
                        <p>ตรวจสอบประวัติ</p>
                      </button>
                      <button className="button-test green1"  type="button" onClick={ () => {setContent('InterviewRate');localStorage.setItem('ApplicantID_target', item.id )}}>
                        <i className="bi bi-check2-square"></i>
                        <p>ให้คะแนน</p>
                      </button> 
                    </div>
                  </div>
                }
                { 
                  user.role === 'admin' && item.status === 3 &&
                  <div className="list5" key={index} >
                    <div className="list5-left">
                      <p className='text1'>{item.profile_detail.name}<br/>
                      {item.profile_detail.branch}<br/>
                      <p className="status-box peach">{statusForm(item.status)} </p>
                      </p> 
                    </div>

                    <div className="list5-right">
                      <button className="button-test sky"  type="button" onClick={ () => {setContent('InterviewProfile');localStorage.setItem('ProfileCheckID_target', item.user_id )}}>
                        <i className="bi bi-search sky"></i>
                        <p>ตรวจสอบประวัติ</p>
                      </button>
                      <button className="button-test green1"  type="button" onClick={ () => {setContent('InterviewApprovement');localStorage.setItem('ApplicantID_target', item.id )}}>
                        <i className="bi bi-check2-square"></i>
                        <p>อนุมัติทุน</p>
                      </button> 
                    </div>
                  </div>
                }
              </>
            ))
          }
        </div>
        
      </div>
    </div>
  )
}

export default IntervieweeList;