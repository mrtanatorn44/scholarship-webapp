import React, { useContext, useState, useEffect } from 'react';
import StatusList from './StatusList';
import { WebContext } from '../../App.js'; 
import Axios from 'axios';

function Status() {
  const { Query , TypeQuery} = useContext(WebContext);
  const [query, setQuery] = Query;
  const [typeQuery, setTypeQuery] = TypeQuery;
  const [formStatusList, setFormStatusList] = useState([
    {label: 'สถานะทั้งหมด',   value: ''},
    {label: 'รอการตรวจสอบ',  value: '1'},
    {label: 'รอการสัมภาษณ์' , value: '2'},
    {label: 'รอการอนุมัติ', value: '3'},
    {label: 'ได้รับทุนเรียบร้อย', value: '4'},
    {label: 'หมดเขตการสมัคร', value: '8'},
    {label: 'เอกสารไม่ถูกต้อง', value: '9'},
    {label: 'ไม่ผ่านการคัดเลือก',value: '0'}
  ])

  return (
    <div className="frame">
      <div className="header d-flex">
        <div className="left">
          <div className="icons">
            <i className="bi bi-grid-3x3"></i>
          </div>
          <div className="topic">
            <h4>สถานะการยื่นทุน</h4>
          </div>
        </div>
        <div className="right"></div>
      </div>
      <div className="contents">

      <div className='filter-bar'>

          <div className='input-holder25-left'>
            <label>สถานะของทุน</label><br></br>
            <select onChange={event => setTypeQuery(event.target.value)}>
              {
                formStatusList.map(
                  (item,index) => (
                    <option key={index} value = {item.value}>{item.label}</option>
                  )
                )
              }
            </select>
          </div>
          <div className='input-holder25-right'>
          </div>
        </div>

        <div className="content5">
          <StatusList/>
        </div>
      </div>
    </div>
  )
}

export default Status;
