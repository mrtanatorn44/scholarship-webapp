/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App';
import Axios from 'axios';

function ApplicantList(props){

  const { User,Query } = useContext(WebContext);
  const [query, setQuery] = Query;

  const { Content } = useContext(WebContext)
  const [content, setContent] = Content;
  const [user,setUser] = User;
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
    sponsor         : '',
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
          sponsor         : '',
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
            sponsor           : res.sponsor,
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
    Scholar.filter( scholar=> {
      return scholar.type.toLowerCase().includes(query.toLowerCase())
    }).map((scholar, index) => (
      <div className="container1 list1" key={index}>
        <div className='title'>
          <h2>{scholar.type}</h2>
        </div>
        <div className='information'>
          <div className='left'>
          
          </div>
          <div className="right" >
            <button className="button-2 d-flex" type="button" onClick={ () => setContent('ScholarshipCheckForm') }>
              <i className="bi bi-hourglass green1"/>
              <p>ตรวจสอบเอกสาร</p>
            </button>
            <button className="button-2 d-flex"  type="button" onClick={ () => setContent('ProfileCheck') }>
              <i className="bi bi-search sky"></i>
              <p>ตรวจสอบประวัติ</p>
            </button>  
          </div>
        </div>
      </div>
    ))
  )
}

export default ApplicantList;