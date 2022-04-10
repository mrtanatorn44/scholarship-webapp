/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App';
import Axios from 'axios';
import Swal from 'sweetalert2';

function Profile() {

  const { User, Content } = useContext(WebContext)
  const [content, setContent] = Content;
  const [user, setUser] = User;
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
    if (user.id === undefined) {
      console.log(user.id)
      return;
    }
    Axios.post("http://localhost:5000/getProfile",{
      id: user.id
    }).then((response) => {
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
			user_id:user.id
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
        <div className="profile">
          <div className="top">
            <form className="form">
              <div className="img-circle">
                { profile.image !== '' && <img src={profile.image} alt='profile'/>}
              </div>
              <div className="data">
                <div className="left "> 
                  <div className="name">
                    <label>ชื่อ-นามสกุล</label><br></br>
                    <input placeholder="ชื่อ-นามสกุล" defaultValue = {profile.name} readOnly="readOnly" ></input>
                  </div>
                  <div className="sector">
                    <label >ภาคการเรียนการสอน</label><br></br>
                    <input placeholder="ภาคปกติ" defaultValue = {profile.fieldStudy} readOnly="readOnly" ></input>
                  </div>
                </div>
                <div className="center">
                  <div className="code">
                    <label >รหัสนิสิต</label><br></br>
                    <input className="d-flex" type="number" placeholder="62XXXXX"  defaultValue = {profile.std_id} readOnly="readOnly" ></input>
                  </div>
                  <div className="branch">
                    <label >สาขา</label><br></br>
                    <input placeholder="" defaultValue = {profile.branch} readOnly="readOnly"></input>
                  </div>
                </div>
                <div className="right">
                  <div className="grade">
                    <label >นิสิตชั้นปีที่</label><br></br>
                    <input 
                      value={parseInt(String(new Date().getFullYear() + 543).substring(2, 4)) - String(profile.std_id).substring(0,2)}
                      readOnly="readOnly"
                    />
                  </div>

                </div>
              </div>
            </form>
            <div>
              { profile.name === ''? 
              <div className=" button-profile">
                <button className="button-3 green1" onClick = {() => setContent('ProfileCreate')}>
                  <p>สร้างโปรไฟล์</p>
                </button>
              </div> :
                <div className="button-profile">
                  <button className="button-3 peach" onClick = {() => setContent('ProfileEdit')}>
                    <p>แก้ไขข้อมูล</p>
                  </button>
                </div>
              }
            </div>
          </div>
        </div>  
      <div className="content6">
        { 
          form.filter((item)=>{return item.status===4})
          .map((item, scholarship_index) => (    
                <div key={scholarship_index}>
                  <div className="list3"> 
                      <div className="list3-left">
                        {/* HEADER */}
                        <div className='box30 text1'>
                          <h4>{item.type}</h4>
                        </div>
                        {/* DETAIL */}
                        <div className='box40 text1'>
                        <h6>ทุนประจำปีการศึกษา {item.on_year } {item.on_term}</h6>
                          {/* <p>{item.open_date.split("T")[0].split('-').reverse().join('/')} - {item.close_date.split("T")[0].split('-').reverse().join('/')}</p> */}
                        </div>
                              
                        {/* PANEL */}
                        <div className='panel2 box30'>
                          <div className='admin-panel2'>
                            {/* FOR SPACING */}
                          </div>
                          <div className='user-panel2'>
                            <p>ได้รับทุนเรียบร้อย</p>              
                          </div>
                        </div>       
                      </div>      
                  </div>
                </div>   
                      
           ))
          } 
      </div>
    </div>
  )
}

export default Profile;
