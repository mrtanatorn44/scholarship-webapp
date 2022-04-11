import React, { useContext, useState, useEffect } from 'react';
import ApplicantData from './ApplicantData';
import { WebContext } from '../../App.js'; 
import Axios from 'axios';
import Swal from 'sweetalert2';
function Applicant() {

  const { Query , TypeQuery,Content} = useContext(WebContext);
  const [query, setQuery] = Query;
  const [typeQuery, setTypeQuery] = TypeQuery;
  const [content, setContent] = Content;
  const [typeList,setTypeList] = useState([
    {label: 'ทุนทั้งหมด',      value: '0'},
    {label: 'ทุนเรียนดี',      value: '1'},
    {label: 'ทุนกิจกรรมเด่น',  value: '2'},
    {label: 'ทุนขาดคุณทรัพย์', value: '3'}
  ])
  var dataTypeList = ['ทุนเรียนดี', 'ทุนกิจกรรมเด่น', 'ทุนขาดคุณทรัพย์']

  const getTypeScholar = () =>{
    Axios.get("http://localhost:5000/getTypeScholar").then(response => {
      if (response.data.errno) { // Check if Backend return error
        Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
        return;
      }
      var tempTypeList = typeList;
      var result = response.data;
      result.forEach((res, index) => {  
        var data = res.type;
        if (data !== '' && !dataTypeList.includes(data)) {
          tempTypeList.push({ label: data, value: data })
        }
      })
      setTypeList([...typeList]);
    })
  }

  // const getOnyearScholar = () =>{
  //   Axios.get("http://localhost:5000/getTypeScholar").then(response => {
  //     var tempTypeList = typeList;
  //     var result = response.data;
  //     result.forEach((res, index) => {  
  //       var data = res.type;
  //       if (data !== '' && !dataTypeList.includes(data)) {
  //         tempTypeList.push({ label: data, value: data })
  //       }
  //     })
  //     setTypeList([...typeList]);
  //   })
  // }

  // const getOntermScholar = () =>{
  //   Axios.get("http://localhost:5000/getTypeScholar").then(response => {
  //     var tempTypeList = typeList;
  //     var result = response.data;
  //     result.forEach((res, index) => {  
  //       var data = res.type;
  //       if (data !== '' && !dataTypeList.includes(data)) {
  //         tempTypeList.push({ label: data, value: data })
  //       }
  //     })
  //     setTypeList([...typeList]);
  //   })
  // }

  useEffect(() => {
    getTypeScholar();
    
  }, [])

  
  return (
    <div className="frame">

      <div className="header ">
        <div className="left">
          <div className="icons">
            <i className="bi bi-calendar-check"/>
          </div>
          <div className="topic">
            <h4>ตรวจสอบเอกสาร</h4>
          </div>
        </div>
        <div className="right">
        </div>
      </div> 

      <div className="contents">
        <div className='filter-bar'>
          <div className='input-holder25-left'>              
            <label>ประเภทของทุน</label><br></br>
            <select onChange={event => setTypeQuery(event.target.selectedOptions[0].text)}>
              {
                typeList.map(
                  (item,index) => (
                  <option key={index} value = {item.label}>{item.label}</option>
                  )
                )
                
              }
            </select>
          </div>
          <div className='input-holder25-left'> 
          </div>
        </div>
        <div className="content5">
          <ApplicantData/>
        </div>
      </div> 
    </div>
  )
}

export default Applicant;