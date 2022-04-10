/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App';
import Axios from 'axios';

function ReportList(props) {

  const { Content, StatusQuery, TypeQuery , YearQuery , TermQuery  , DonatorQuery } = useContext(WebContext);
  const [ content, setContent ] = Content;
  const [ statusQuery, setStatusQuery ] = StatusQuery;
  const [ typeQuery , setTypeQuery ] = TypeQuery;
  const [ yearQuery , setYearQuery ] = YearQuery;
  const [ termQuery , setTermQuery ] = TermQuery;
  const [ donatorQuery , setDonatorQuery ] = DonatorQuery;
  const [ ScholarshipList, setScholarshipList ] = useState([])

  // console.log("ประเภททุน:",typeQuery,"ปีการศึกษา:",yearQuery);
  // console.log("เทอม:",termQuery,"donator:",donatorQuery);

  function getScholarshipList () {
    Axios.get("http://localhost:5000/getAllScholarship").then((response) => { 
      var result = response.data;
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
              appointment       : JSON.parse(res.appointment),
              toggleContent     : false
            });
            console.log(res.type, res.status)
          })
        });
      }
      setScholarshipList(result);
    })
  }

  useEffect(() => {
    getScholarshipList();
  }, [])

  return(
    ScholarshipList
      .filter(scholarship => {
        return statusQuery === "" || String(scholarship.status) === statusQuery
      })
      .filter(scholarship => {
        return typeQuery === "ทุนทั้งหมด" || scholarship.type.includes(typeQuery)
      })
      .filter(scholarship => {
        if (donatorQuery === "") return scholarship
        if(parseInt(donatorQuery) === scholarship.donator_id) return scholarship
      })
      .filter(scholarship =>{
        if (termQuery === "") return scholarship
        if(termQuery === scholarship.on_term) return scholarship
      })
      .filter(scholarship =>{
        if (yearQuery === "") return scholarship
        if(parseInt(yearQuery) === scholarship.on_year) return scholarship
      })
      .map((scholarship, index) => (
      <div key={index}>
        <div className="list4" key={index}>
          <div className="list4-left">
            {/* HEADER */}
            <div className='box30 text1'>
              <h5>{scholarship.type}</h5>
            </div>
            {/* DETAIL */}
            <div className='box60 text1'>
              <h6>ทุนประจำปีการศึกษา {scholarship.on_year } {scholarship.on_term}</h6>
              <p>{scholarship.open_date.split("T")[0].split('-').reverse().join('/')} - {scholarship.close_date.split("T")[0].split('-').reverse().join('/')}</p>
            </div>
          
            {/* PANEL */}
            <div className='panel2 box10'>
              <div className='admin-panel2'>
                {/* FOR SPACING */}
              </div>
              <div className='user-panel2'>
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
              </div>  
            </div> 
          </div>

          <div className="list4-right">
            <button 
              className={"button-half green1" }
              type="button" 
            >
               ดาวน์โหลดรายงาน
            </button>
            <button 
              className={"button-half sky" }
              type="button" 
              onClick={() => {
                localStorage.setItem('ScholarshipID_target', scholarship.id);
                setContent('ReportInspect')}}>
              ดูรายงาน
            </button>
          </div>
        </div>

        <div>
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
      </div>
    ))
  )
}
export default ReportList;