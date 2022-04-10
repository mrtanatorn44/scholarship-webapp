/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App';
import Axios from 'axios';
import ReportList from './ReportList';

function Report(props) {
  const { StatusQuery, TypeQuery , YearQuery , TermQuery  , DonatorQuery } = useContext(WebContext);
  const [ statusQuery, setStatusQuery ] = StatusQuery;
  const [ typeQuery , setTypeQuery ] = TypeQuery;
  const [ yearQuery , setYearQuery ] = YearQuery;
  const [ termQuery , setTermQuery ] = TermQuery;
  const [ donatorQuery , setDonatorQuery ] = DonatorQuery;

  const [scholarshipStatusList, setScholarshipStatusList] = useState([
    {label: 'สถานะทั้งหมด',   value: ''},
    {label: 'เปิดให้ลงทะเบียน',  value: '1'},
    {label: 'ไม่เปิดให้ลงทะเบียน',value: '0'},
    {label: 'อยู่ระหว่างการสัมภาษณ์' , value: '2'},
    {label: 'เสร็จสิ้นกระบวนการ', value: '9'},
  ])
  const [typeList,setTypeList] = useState([
    {label: 'ทุนทั้งหมด',      value: ''},
    {label: 'ทุนเรียนดี',      value: '1'},
    {label: 'ทุนกิจกรรมเด่น',  value: '2'},
    {label: 'ทุนขาดคุณทรัพย์', value: '3'}
  ])


  var dataTypeList = ['ทุนเรียนดี', 'ทุนกิจกรรมเด่น', 'ทุนขาดคุณทรัพย์']

  const [donatorList,setDonatorList] = useState([]);

  const [yearList,setYearList] = useState([]);

  const getTypeScholar = () =>{
    Axios.get("http://localhost:5000/getTypeScholar").then(response => {
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

  function getDonator() {
    Axios.get("http://localhost:5000/getallDonator").then(response => {
      var tempDonatorList = donatorList;
      var result = response.data
      if (result.length === 0)
        return
      result.forEach((res, index) => {  
        if (res.data !== '') {
          tempDonatorList.push({ label: res.name, value: res.id })
        }
      })
      setDonatorList([...donatorList])
    })
  }

  const getYearScholar = () =>{
    Axios.get("http://localhost:5000/getYearScholar").then(response => {
      var tempTypeList = yearList;
      var result = response.data;
      result.forEach((res, index) => {  
        var data = res.on_year;
        if (data !== '' && !dataTypeList.includes(data)) {
          tempTypeList.push({ label: data, value: data })
        }
      })
      setYearList([...yearList]);
      yearList.sort();
    })
  }

  useEffect(() => {
    getTypeScholar();
    getDonator();
    getYearScholar();
  }, [])

 
  return (

      <div className="frame" >
        <div className="header ">
          <div className="left">
            <div className="icons">
              <i className="bi bi-files"></i>
            </div>
            <div className="topic">
              <h4>รายงานทุน</h4>
            </div>
          </div>
          <div className="right"></div>
        </div>

        {/* CONTENT */}
        <div className="contents">
          {/* FILTER */}
          <div className='filter-bar'>

            <div className="select1">
              <label>สถานะทุน</label><br></br>
              <select name="capital" onChange={(e) => {console.log(e.target.value);setStatusQuery(e.target.value)}}>
                {
                  scholarshipStatusList.map(
                    (item, index) => (
                      <option key={index} value={item.value}>{item.label}</option>
                    )
                  )
                }
              </select>
            </div>
            <div className="select1">
              <label>ประเภททุน</label>
              <select  name="capital" id="capital" onChange={e => setTypeQuery(e.target.value)}>
                  {typeList.map(
                    (item,index) => (
                    <option key={index} value={item.label}>{item.label}</option>
                    )
                  )} 
              </select>
            </div>
            <div className="select1">
              <label>ปีการศึกษา</label><br></br>
                <select  name="capital" onChange={e => setYearQuery(e.target.value)}>
                  <option value="">ทั้งหมด</option>
                  {yearList.map(
                    (item,index) => (
                    <option key={index} value = {item.label}>{item.label}</option>
                    )
                  )}
                </select>
            </div> 
            <div className="select1">
              <label>ภาคเรียน</label>
              <select  name="capital" onChange={e => setTermQuery(e.target.value)}>
                <option value="">ทั้งหมด</option>
                <option value="ภาคต้น">ต้น</option>
                <option value="ภาคปลาย">ปลาย</option>
              </select>
            </div>
            <div className="select1">
              <label>ผู้สนับสนุน</label>
              <select  name="capital" id="capital" onChange={e => setDonatorQuery(e.target.value)}>
                  <option value = "">ทั้งหมด</option>
                  {donatorList.map(
                    (item,index) => (
                    <option key={index} value = {item.value}>{item.label}</option>
                    )
                  )} 
              </select>  
            </div> 
              
          </div>
          <div className="content5">
            <ReportList/>
          </div>
        </div>
      </div>
  )
}
export default Report;
