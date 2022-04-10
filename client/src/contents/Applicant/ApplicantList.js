/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { WebContext } from '../../App.js';
import Swal from 'sweetalert2';

function ApplicantList(props){

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
        return 'อยู่ระหว่างการสัมภาษณ์';
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
  console.log(NameForm);

 
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
        <div className="right"></div>
      </div>
      <div className="contents">
          
        <div className='filter-bar'>
          <div className="input-holder-left" >    
            {
              user.role === 'admin' &&
              <><br></br>
                <select onChange={event => setTypeQuery(event.target.value)}>
                  {
                    typeList.map((item,index)=>(
                    <option key={index} value = {item.value}>{item.label}</option>
                    ))
                  }
                </select>
              </>
            } 

          </div>
          <div className="input-holder-right" >
            <div className="search-box search1">
              <input type="text" placeholder="Search" aria-describedby="button-addon2" onChange={event => setQuery(event.target.value)}/>
              <button className="btn" type="button" >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div> 
        </div>
      
        <div className="content5">
            { 
              NameForm
              .filter(
                (item) => {  
                    if(typeQuery===""){
                        return item;
                    }else if(item.status==typeQuery){
                        return item;
                    }
                 }
              )
              .filter((item) => {
                if(query===""){
                  return item
                }
                else if(item.profile_detail.name.includes(query)){
                  return item
                }
              })
              .map((item, index) => (
                
                <>
                
                    {
                      user.role === 'admin' &&
                      <div className="container1 list5 d-flex" key={index} >
                          <div className="left">
                            <p className="name">{item.profile_detail.name} </p>
                            <p>{item.profile_detail.branch} </p>
                            <p className="status-box peach">{statusForm(item.status)} </p>
                          </div>
                          <div className='right'>
                            <button 
                              className="button-2 d-flex"  
                              type="button" 
                              onClick={ 
                                () => {
                                  setContent('ApplicantProfile');
                                  localStorage.setItem('ProfileCheckID_target',item.user_id )
                                }
                              }
                            >
                              <i className="bi bi-search sky"></i>
                              <p>ตรวจสอบประวัติ</p>
                            </button>
                            <button 
                              className="button-2 d-flex" 
                              type="button" 
                              onClick={
                                () => {
                                  setContent('ApplicantCheck');
                                  localStorage.setItem('ApplicantID_target', item.id )
                                }
                              }
                            >
                              <i className="bi bi-search sky"></i>
                              <p>ตรวจเอกสารการยื่นทุน</p>
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

export default ApplicantList;