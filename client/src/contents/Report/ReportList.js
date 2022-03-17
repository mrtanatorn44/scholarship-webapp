/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App';
import Axios from 'axios';

function ReportList(props) {

  const { Content } = useContext(WebContext)
  const [content, setContent] = Content;

  const checkState = (index) => {
    let a=[...Scholar];
    a[index].check=!a[index].check;
    setScholar(a); 
  }
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

  return(
    Scholar.map((scholar, index) => (  
      <div className="container1 list1" key={index}>
        <div className='title'>
          <h2>{scholar.type}</h2>
          <h3>ทุนประจำปีการศึกษา {scholar.on_year } {scholar.on_term}</h3>
        </div>
        <div className='information'>

          {   //detail before toggle
            !scholar.check  && 
            <>
              <div className='left'>
                <p>{scholar.open_date.split("T")[0]} - {scholar.close_date.split("T")[0]}</p>
                <p>สำหรับนิสิตปี{scholar.min_student_year}-{scholar.max_student_year}</p>
              </div>

            </>
          } 
          { //detail after toggle 
              scholar.check  && 
              <>
                <div className='detail' ><h4>{scholar.detail}</h4></div>
              </>
          }     
            <div className="right">
              <button className="button-2 d-flex" type="button" onClick={() => setContent('ReportInspect')}>
                <i className="bi bi-search"/>
                <p>ดูรายละเอียด</p>
              </button> 
            </div>
        </div> 
        <div className='bottom1'>
	        <div className='user-panel'>
            <h3 onClick={() => checkState(index)}>
              {!scholar.check ? "รายละเอียดเพิ่มเติม (แสดง)" : "รายละเอียดเพิ่มเติม (ซ่อน)"}
            </h3>  
	        </div> 
        </div>
      </div>
    ))
  )
}
export default ReportList;