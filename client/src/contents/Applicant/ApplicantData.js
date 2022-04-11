import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App';
import Axios from 'axios';
import Swal from 'sweetalert2';
function ApplicantData(props){

  const { User,Query,TypeQuery } = useContext(WebContext);
  const [typeQuery, setTypeQuery] = TypeQuery;

  const { Content } = useContext(WebContext)
  const [content, setContent] = Content;
  const [user,setUser] = User;
  const [scholarShip_id,setScholarShip_id] = useState([])
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

  const getScholarship_Id = () =>{
    Axios.get("http://localhost:5000/getScholarship_Id").then(response => {
      if (response.data.errno) { // Check if Backend return error
        Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
        return;
      }
      var result = response.data;
      result.forEach((res,idx) => {
        scholarShip_id.push(res.scholarship_id)
      });
    })
  }

  const getScholar = () => {
    Axios.get("http://localhost:5000/getAllScholarship").then((response) => {
      if (response.data.errno) { // Check if Backend return error
        Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
        return;
      } 
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
          donator_id        : '',
          donator           : '',
          toggleContent            :false,
        }]
      } else {
        result.forEach((res, index) => {
          Axios.post("http://localhost:5000/getDonator",{ 
            id: res.donator_id 
          }).then(async (donator)=> {
            // console.log(donator.data[0]);
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
              attr_requirement  : JSON.parse(res.attribute_requirement),
              file_requirement  : JSON.parse(res.file_requirement),
              interview_requirement   : JSON.parse(res.interview_requirement),
              appointment       : JSON.parse(res.appointment),
              donator_id        : res.donator_id,
              donator           : donator.data[0].name,
              toggleContent     : false,
              
            });
           
          })
        });
      }
      setScholar(result);
    })
  }
  
  function getDateFormat(date) {
		// [yyyy,mm,dd]
		var month_th      = ["", "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
		return (parseInt(date[2])) + " " + month_th[parseInt(date[1], 10)] + " " + (parseInt(date[0]) + 543);
  } 

  useEffect(() => {
    getScholar();
    getScholarship_Id();
    //getDonator();
  }, [])

  return (
    Scholar.filter(item =>{
      if (typeQuery==="ทุนทั้งหมด"){
        return item
      }else if (item.type.includes(typeQuery)){
        return item
      }
    })
    .filter(item => {
      if (scholarShip_id.includes(item.id)){
        return item;
      }
    })
    
    .map((scholarship, index) => (   
        <div key={index}>
          <div className="list3"> 
            <div className="list3-left">
              {/* HEADER */}
              <div className='w30 text1'>
                <h4>{scholarship.type}</h4>
              </div>
              {/* DETAIL */}
              <div className='box40 text1'>
                <h6>ทุนประจำปีการศึกษา {scholarship.on_year } {scholarship.on_term}</h6>
                <p>{getDateFormat(scholarship.open_date.split('-'))} - {getDateFormat(scholarship.close_date.split('-'))}</p>
              </div>
            
              {/* PANEL */}
              <div className='panel2 w30'>
                <div className='admin-panel2'>
                  {/* FOR SPACING */}
                </div>
                <div className='user-panel2 '>
                  <p 
                    className='text2'
                    onClick={ 
                      () => { 
                        scholarship.toggleContent = !scholarship.toggleContent; 
                        setScholar([...Scholar]); 
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

            <div className="list3-right">
            <button 
             className={"button-big peach" }
             type="button"
            
            onClick={() => {localStorage.setItem('ScholarshipID_target', scholarship.id);setContent('ApplicantList')}}>
              
              <p>ตรวจสอบ</p>
              <p>รายชื่อผู้ขอทุน</p>
            </button>               
          </div>

          </div>
          { 
            scholarship.toggleContent &&
            <div className="detail2">
              <div className="left">
                <span>
                  <b>รายละเอียด</b>
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
                  <b>คุณสมบัติ</b>
                  <br></br>
                  <a>1. เกรดเฉลี่ยสะสม {scholarship.attr_requirement.min_gpa}</a>
                  <br></br>
                  <a>2. สำหรับนิสิตตั้งแต่รหัส {scholarship.attr_requirement.min_nisit_id} ขึ้นไป</a>
                  <br></br>
                  <a>3. รหัสนิสิตไม่เกิน {scholarship.attr_requirement.max_nisit_id}</a><br></br>
                  <a>4. มีความวิริยะอุตสาหะและมีความตั้งใจในการศึกษาเล่าเรียน</a><br></br>
                  <a>5. มีความประพฤติเรียบร้อย ไม่เคยถูกลงโทษทางวินัย</a><br></br><br></br>
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
    ))
  )
}

export default ApplicantData;