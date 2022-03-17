/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App';
import Axios from 'axios';
import ReportList from './ReportList';

function Report(props) {

  const [Scholar, setScholar] = useState([{
    id : '',
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
    check           :false
  }])

  const getScholar = () => {
    Axios.get("http://localhost:5000/getAllScholarship").then((response) => { 
            var result = response.data;
            if (result.length === 0) {
              result = [{ 
                id : '',
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
                check           :false,
              }]
            } else {
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
                  open_date         : res.open_date,
                  close_date        : res.close_date,
                  check             :false
                });
              });
            }
            setScholar(result);
          })
    }

    useEffect(() => {
      getScholar();
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
        <div className="contents">
          <form className="form4" >
            <div className="select1">
              <label>ทุนปีการศึกษา</label><br></br>
                <select  name="capital">
                  <option value="2564">2564</option>
                  <option value="2563">2563</option>
                  <option value="2562">2562</option>
                  <option value="2561">2561</option>
                </select>
            </div> 
            <div className="select1">
              <label>เทอม</label>
              <select  name="capital" >
                <option value="first">ต้น</option>
                <option value="final">ปลาย</option>
              </select>
            </div>
            <div className="select1">
              <label>ทุนประเภท</label>
              <select  name="capital" id="capital">
                <option value="study">ทุนเรียนดี</option>
                <option value="activity">ทุนกิจกรรมเด่น</option>
                <option value="property">ทุนขาดคุณทรัพย์</option>
                <option value="other">ทุนอื่นๆ</option>
              </select>
            </div>
            <div className="select1">
              <label>โดย</label>
              <select  name="capital" id="capital">
                <option value="study">ผู้สนับสนุน</option>
              </select>  
            </div> 
            
          </form>
          <div className="line-gray"></div>
          <div className="content5">
            <ReportList/>
          </div>
        </div>
      </div>
  )
}
export default Report;
