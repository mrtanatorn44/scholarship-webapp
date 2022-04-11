/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App';
import Axios from 'axios';
import Swal from 'sweetalert2';

function Profile() {

  const { User, Content } = useContext(WebContext)
  const [content, setContent] = Content;
  const [scholarship, setScholarship] = useState([]);
  const [form, setForm] = useState([]);
  const [profile, setProfile] = useState({
    name:"",
    birth_date:"",
    std_id:"",
    address:"",
    branch:"",
    yearofstudy:"",
    fieldStudy:"",
    image:""
  })
 
  const getProfile = () =>{
    Axios.post("http://localhost:5000/getProfile",{
      id: localStorage.getItem('ProfileCheckID_target')
    }).then((response) => {
      if (response.data.errno) { // Check if Backend return error
        Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
        return;
      }
      var data = response.data[0];
      //console.log('res', data)
      //console.log(data)
      if (data === undefined) {
        return;
      }
      var binaryImage   = ''; // ArrayBuffer to Base64
      var bytes         = new Uint8Array( data.picture_data.data );
      var len           = bytes.byteLength;
      for (var i = 0; i < len; i++) binaryImage += String.fromCharCode( bytes[ i ] );
      // setProfile
      var res   = JSON.parse(data.profile_data);
      res.image = "data:image/png;base64," + binaryImage;
      //console.log(res)
      setProfile(res)
    })
  }
  /* const data = [{profile_data}];
  document.getElementById("json").inner */
  

  const getUserForm = () => {
		Axios.post("http://localhost:5000/getFormByUserID",{
			user_id:localStorage.getItem('ProfileCheckID_target')
		}).then((response) => {
      if (response.data.errno) { // Check if Backend return error
        console.log(response.data)
        Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
        return;
      }
		  var result = response.data;
      if (result.length !== 0) {
		  result.forEach((res, index) => {
			  Axios.post("http://localhost:5000/getScholarship",{
				  id : res.scholarship_id
        }).then((scholar) => {
          if (scholar.data.errno) { // Check if Backend return error
            console.log(scholar.data)
            Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + scholar.data.errno, 'warning');
            return;
          }
          var sch=scholar.data[0]
          Axios.post("http://localhost:5000/getDonator", { 
            id: sch.donator_id 
          }).then((donator) => {
            if (donator.data.errno) { // Check if Backend return error
              console.log(donator.data)
              Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + donator.data.errno, 'warning');
              return;
            }
            Object.assign(res, {
              sch_id            : sch.id,
              sch_status        : sch.status,
              type              : sch.type,
              detail            : sch.detail,
              amount            : sch.amount,
              on_year           : sch.on_year,
              on_term           : sch.on_term,
              open_date         : sch.open_date.split("T")[0],
              close_date        : sch.close_date.split("T")[0],
              donator_id        : sch.donator_id,
              donator           : donator.data[0].name,
              attr_requirement  : JSON.parse(sch.attribute_requirement),
              file_requirement  : JSON.parse(sch.file_requirement),
              interview_requirement   : JSON.parse(sch.interview_requirement),
              appointment : JSON.parse(sch.appointment),
              toggleContent     : false
            });
            setForm((form)=>[...form,res])
          })
        })
      })
      }        
    })
  }
 


  function getDateFormat(date) { // [yyyy,mm,dd]
    var month_th = ["", "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    return "วันที่ " + (parseInt(date[2])) + " " + month_th[parseInt(date[1], 10)] + " พ.ศ. " + (parseInt(date[0]) + 543);
  } 

  useEffect(() => {
    getProfile();
    getUserForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return(
    <div className="frame">   
      <div className="content" >
        <div className="profile">
            <div className="profile-image w20 ">
              { profile.image !== '' && <img src={profile.image} alt='profile'/>}
            </div>
            <div className="w20 h90 select1"> 
              <div className="h50">
                <label>ชื่อ-นามสกุล</label><br></br>
                <input className="w90" placeholder="ชื่อ-นามสกุล" defaultValue = {profile.name} readOnly="readOnly" ></input>
              </div>
              <div className="h40">
                <label>ภาคการศึกษา</label><br></br>
                <input className="w90" placeholder="ภาคปกติ" defaultValue = {profile.fieldStudy} readOnly="readOnly" ></input>
              </div>
            </div>
            <div className="w40 h90 select1">
              <div className="h50">
                <label >รหัสนิสิต</label><br></br>
                <input className="w90" type="number" placeholder="62XXXXX"  defaultValue = {profile.std_id} readOnly="readOnly" ></input>
              </div>
              <div className="h40">
                <label >สาขา</label><br></br>
                <input className="w90" placeholder="" defaultValue = {profile.branch} readOnly="readOnly"></input>
              </div>
            </div>
            <div className="w20 h90 select1">
              <div className="h50">
                <label >นิสิตชั้นปีที่</label><br></br>
                <input
                  className='w100'
                  value={parseInt(String(new Date().getFullYear() + 543).substring(2, 4)) - String(profile.std_id).substring(0,2)}
                  readOnly="readOnly"
                />
              </div>
              <div className="h40">
                <label></label><br></br>
                <button className='w100 h60 button-add d-flex' onClick={ () => {setContent('ApplicantList')}}>
                  <i className='bi bi-arrow-left sky'></i>
                  <p>ย้อนกลับ</p>
                </button>
              </div>

            </div>
        </div> 
      
        <div className="content6">
        { 
          form.filter((item)=>{return item.status===4})
          .map((item, scholarship_index) => (    
              <div className="list6" key={scholarship_index}> 
                  <div className="list6-left w100">
                    <div className='text1'>
                      <h5>{item.type}<br/>
                        ทุนประจำปีการศึกษา {item.on_year } {item.on_term}
                      </h5>
                      <h5 className="status-box green1">
                        ได้รับทุนเรียบร้อย
                      </h5> 
                    </div>
                  </div>      
              </div>         
            ))
          } 
        </div>
      </div>
    </div>
  )
}

export default Profile;
