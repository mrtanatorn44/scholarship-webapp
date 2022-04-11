/*eslint no-unused-vars:*/
import Axios from 'axios';
import { WebContext } from '../../App.js';
import { useContext,React, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
function StatusList() {

	const {User,Content,TypeQuery} =useContext(WebContext)
  const [typeQuery, setTypeQuery] = TypeQuery;
  const [content, setContent] = Content;
	const [formList, setFormList] = useState([]);
	const [user,setUser] = User;

  function getUserForm() {
		Axios.post("http://localhost:5000/getFormByUserID",{
			user_id:user.id
		}).then((response) => {
      if (response.data.errno) { // Check if Backend return error
        Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
        return;
      }

		  var result = response.data;
      if (result.length === 0) return;

      result.forEach((res, index) => {
        getScholarship(res);
      })
      
    })
  }

  function getScholarship(res) {
    Axios.post("http://localhost:5000/getScholarship",{
      id : res.scholarship_id
    }).then((scholar) => {
      if (scholar.data.errno) { // Check if Backend return error
        Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + scholar.data.errno, 'warning');
        return;
      }
      
      if (scholar.data.length === 0) return;

      var sch = scholar.data[0]
      Object.assign(res, {
        sch_id            : sch.id,
        sch_status        : sch.status,
        sch_type          : sch.type,
        sch_detail        : sch.detail,
        sch_amount            : sch.amount,
        sch_on_year           : sch.on_year,
        sch_on_term           : sch.on_term,
        sch_open_date         : sch.open_date.split("T")[0],
        sch_close_date        : sch.close_date.split("T")[0],
        sch_donator_id        : sch.donator_id,
        sch_attr_requirement        : JSON.parse(sch.attribute_requirement),
        sch_file_requirement        : JSON.parse(sch.file_requirement),
        sch_interview_requirement   : JSON.parse(sch.interview_requirement),
        sch_appointment             : JSON.parse(sch.appointment),
        toggleContent     : false
      });
      getDonator(res, sch.donator_id)
    })
  }

  function getDonator(res, donatorID) {
    Axios.post("http://localhost:5000/getDonator", { 
      id: donatorID
    }).then((donator) => {
      if (donator.data.errno) { // Check if Backend return error
        Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + donator.data.errno, 'warning');
        return;
      }

      if (donator.data.length === 0) return;
      Object.assign(res, {
        donator : donator.data[0].name,
      });

      setFormList((formList)=>[...formList,res])
    })
  }

  const onHandleDeleteFormBtn = (formID) => {
    // console.log(formID);
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "ที่จะยกเลิกการสมัครทุนนี้!", 
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#03A96B',
      confirmButtonText: 'Delete',
      cancelButtonColor: '#A62639',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
          Axios.post("http://localhost:5000/deleteForm", { id : formID })
          .then((response) => { 
            if (response.data.errno) { // Check if Backend return error
              Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
              return;
            }
            setFormList([]);
            getUserForm();
            Swal.fire('ลบประกาศเรียบร้อย!','','success')
          })
      }
    })
  }
  
  function getDateFormat(date) {
		// [yyyy,mm,dd]
		var month_th      = ["", "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
		return (parseInt(date[2])) + " " + month_th[parseInt(date[1], 10)] + " " + (parseInt(date[0]) + 543);
  } 

	useEffect(() => {
    // getUserForm -> getScholarshopByForm -> getDonator
    // result = list of user form + scholarship + donator
		getUserForm(); 
  },[]);

	return(
    formList
    .filter(form => {
      return typeQuery === "" || form.status === parseInt(typeQuery)
    }).map((form, scholarship_index) => (
        <div key={scholarship_index}>
          <div className="list3"> 
            <div className="list3-left">
              {/* HEADER */}
              <div className='w30 text1'>
                <h4>{form.sch_type}</h4>
              </div>
              {/* sch_detail */}
              <div className='w40 text1'>
                <h6>ทุนประจำปีการศึกษา {form.sch_on_year } {form.sch_on_term}</h6>
                <p>{getDateFormat(form.sch_open_date.split('-'))} - {getDateFormat(form.sch_close_date.split('-'))}</p>
              </div>
          
              {/* PANEL */}
              <div className='panel2 w30'>
                <div className='admin-panel2'>
                  {/* FOR SPACING */}
                </div>
                <div className='user-panel2'>
                  <p 
                    className='text2'
                    onClick={ 
                      () => { 
                        form.toggleContent = !form.toggleContent; 
                        setFormList([...formList]); 
                      }
                    }
                  >
                    {
                      !form.toggleContent ?
                      <i className="big-icon bi bi-chevron-down"></i> :
                      <i className="big-icon bi bi-chevron-up"></i> 
                    }
                  </p>  
                  
                </div>

                <div className='admin-panel2'>
                  {
                    // รออนุมัติ หรือสำเร็จ จะยกเลิกไม่ได้
                    form.status !== 4  && form.status !== 3 && form.status !== 0 &&
                    <button 
                      className='button-admin3 orange1'
                      onClick={
                        () => {
                          onHandleDeleteFormBtn(form.id);
                        }
                      }
                    >
                      ยกเลิกการลงทะเบียน
                    </button>
                  }
                </div>  
              </div> 

            </div>

            <div className="list3-right">
              
              {/* <div className={ form.status? "button-half green1": "button-half orange1"} >
                <p> {form.status} </p>
              </div> */
              }
              {
                // รอตรวจสอบ
                form.status === 1 &&
                <button className={"button-big orange1"}>
                  รอการตรวจสอบ
                </button>
              }

              {
                // รอสัม
                form.status === 2 &&
                <button 
                  className={form.sch_appointment? "button-big sky": "button-big sky"}
                  type="button" 
                  onClick={async () => {
                      
                    // if sch_appointment not exist
                    if (!form.sch_appointment) {
                      return;
                    }

                    var month_th      = ["", "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
                    var dmy = form.sch_appointment.date.split('-').reverse();
                    var appointment_data =  `<b>วันที่ ${parseInt(dmy[0])} ${month_th[parseInt(dmy[1], 10)]} พ.ศ. ${(parseInt(dmy[2]) + 543)}</b> \n` +
                                            `<b>Meeting time :</b> ${form.sch_appointment.time}    \n` +
                                            `<b>Meeting code :</b> ${form.sch_appointment.meet_code}\n` +
                                            `<b>Meeting link :</b> <a href="${form.sch_appointment.meet_link}" target="_blank">link</a>     `

                    Swal.fire({
                      title: '<pre>' + appointment_data + '</pre>',
                      icon: 'info',
                      html: ''  ,
                      customClass: {
                        popup: 'format-pre'
                      }
                    })
                  }
                }
              >
                <p> {form.sch_appointment? 'ดูเวลาสัมภาษณ์': 'รอเวลานัดหมาย'} </p>
                </button>
              }
              {
                // รอการอนุมัติ
                form.status === 3 &&
                <button 
                className={"button-big red1"} 
                // onClick={
                //   () => {
                //     localStorage.setItem('EditFormID_target', form.id);
                //     setContent('EditScholarshipRegister')
                //   }
                // }
                >
                  <p>รอการอนุมัติ</p>
                </button>
              }
              {
                // เสร็จสิ้น
                form.status === 4 &&
                <button 
                className={"button-big green1"} 
                // onClick={
                //   () => {
                //     localStorage.setItem('EditFormID_target', form.id);
                //     setContent('EditScholarshipRegister')
                //   }
                // }
                >
                  <p>ได้รับทุนเรียบร้อย</p>
                </button>
              }
              {
                // แก้ไข
                form.status === 9 &&
                <button 
                className={"button-big yellow1"} 
                onClick={
                  () => {
                    localStorage.setItem('EditFormID_target', form.id);
                    setContent('EditScholarshipRegister')
                  }
                }
                >
                  <p>แก้ไข</p>
                </button>
              }

              {
                //  ไม่ผ่านการคัดเลือก
                form.status === 0 &&
                <button className={"button-big gray1"}>
                  <p>ไม่ผ่านการคัดเลือก</p>
                </button>
              }
            
            </div> 

          </div>
          { 
            form.toggleContent &&
            <div className="detail2">
              <div className="left">
                <span>
                  <b>รายละเอียด</b>
                  <p className='preline'>{form.sch_detail}</p>
                </span>
                <span>
                  <b>ตั้งแต่นิสิตชั้นปีที่</b>
                  <p>{form.sch_attr_requirement?form.sch_attr_requirement.min_nisit_id:""} ถึง {form.sch_attr_requirement.max_nisit_id}</p>
                </span>
                <span>
                  <b>ประจำปีการศึกษา</b>
                  <p>{form.sch_on_year}</p>
                </span>
                <span>
                  <b>ภาคเรียนที่</b>
                  <p>{form.sch_on_term}</p>
                </span>
                <span>
                  <b>ผู้สนับสนุน</b>
                  <p>{form.donator}</p>
                </span>
              </div>

              <div className="right">
                <span>
                
                </span>

                <span>
                    <b>คุณสมบัติ</b>
                    <br></br>
                    <a>1. เกรดเฉลี่ยสะสม {form.sch_attr_requirement.min_gpa}</a>
                    <br></br>
                    <a>2. สำหรับนิสิตตั้งแต่รหัส{form.sch_attr_requirement.min_nisit_id} ขึ้นไป</a>
                    <br></br>
                    <a>3. รหัสนิสิตไม่เกิน {form.sch_attr_requirement.max_nisit_id}</a><br></br>
                    <a>4. มีความวิริยะอุตสาหะและมีความตั้งใจในการศึกษาเล่าเรียน</a><br></br>
                    <a>5. มีความประพฤติเรียบร้อย ไม่เคยถูกลงโทษทางวินัย</a><br></br><br></br>
                  </span>
                <span>
                  <b>เอกสารที่ต้องการ</b>
                  { 
                    form.sch_file_requirement.map(
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

export default StatusList;