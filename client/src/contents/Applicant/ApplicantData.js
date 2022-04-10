import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App';
import Axios from 'axios';

function ApplicantData(props){

  const { User,Query,TypeQuery } = useContext(WebContext);
  const [typeQuery, setTypeQuery] = TypeQuery;

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
    attribute_requirement : '',
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
          on_year         : '',
          on_term         : '',
          open_date       : '',
          close_date      : '',
          attribute_requirement : '',
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
            on_year           : res.on_year,
            on_term           : res.on_term,
            open_date         : res.open_date,
            close_date        : res.close_date,
            attribute_requirement  : JSON.parse(res.attribute_requirement),
            sponsor           : res.sponsor,
            check             :false
          });
        });
      }
      setScholar(result);
    })
  }
  console.log(typeQuery);
  

  

  useEffect(() => {
    getScholar();
  }, [])

  return (
    Scholar.filter(item =>{
      if (typeQuery==="ทุนทั้งหมด"){
        return item
      }else if (item.type.includes(typeQuery)){
        return item
      }
    }).map((item, index) => (
      <>
        <div className="list3" key={index}>
         <div className="list3-left">
            <div className='box40 text1'>
              <h4>{item.type}</h4>
            </div>
            <div className='box60 text1'>
              <div>
                <p>{item.open_date.split("T")[0]} - {item.close_date.split("T")[0]}</p>
                <p>สำหรับนิสิตตั้งแต่รหัส {item.attribute_requirement.min_nisit_id}ขึ้นไป</p>
                <p>รหัสนิสิตไม่เกิน{item.attribute_requirement.max_nisit_id}</p>
              </div>
            
            </div>
          </div>
          <div className="list3-right">
            <button 
             className={"button-big peach" }
             type="button"
            
            onClick={() => {localStorage.setItem('ScholarshipID_target', item.id);setContent('ApplicantList')}}>
              
              <p>ตรวจสอบ</p>
              <p>รายชื่อผู้ขอทุน</p>
            </button>
              {/*
                <button className="button-2 d-flex"  type="button" onClick={ () => setContent('ProfileCheck') }>
                  <i className="bi bi-search sky"></i>
                  <p>ตรวจสอบประวัติ</p>
                </button> 
                */}
          </div>

      </div>
      
      
    </>
    ))
  )
}

export default ApplicantData;