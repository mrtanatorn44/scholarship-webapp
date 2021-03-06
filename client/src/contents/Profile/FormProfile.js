/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App.js';
import Axios from 'axios';
import Swal from 'sweetalert2';

function FormProfile() {
  //usecontext
  const { User } = useContext(WebContext);
  const { Content, EditProfileID} = useContext(WebContext);
  const [user, setUser] = User;
  const [content, setContent] = Content;
  const [editProfile, setEditProfileID] = EditProfileID;
  const [form, setForm] = useState({
    image:""
  })
  
  const [showModal ,setShowModal] = useState(false);
  const [profile, setProfile]=useState({
    name:"",
    yearofstudy:"",
    birth_date:"",
    std_id:"",
    fieldStudy:"",
    branch:"",
    address:"",
    tel:"",
    name_father:"",
    age_father:"",
    career_father:"",
    income_father:"",
    address_father:"",
    status_father:"",
    place_of_work_father:"",
    tel_father:"",
    name_mother:"",
    age_mother:"",
    career_mother:"",
    income_mother:"",
    address_mother:"",
    status_mother:"",
    place_of_work_mother:"",
    tel_mother:"",
    status_marry:""
   })
  const getProfile = () =>{
    Axios.post("http://localhost:5000/getProfile",{
      id: editProfile
    }).then((response) => {
      if (response.data.errno) { // Check if Backend return error
        Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
        return;
      }
      //console.log(response)
      var binaryImage   = ''; // ArrayBuffer to Base64
      var bytes         = new Uint8Array( response.data[0].picture_data.data );
      var len           = bytes.byteLength;
      for (var i = 0; i < len; i++) binaryImage += String.fromCharCode( bytes[ i ] );
      // setProfile
      var res   = JSON.parse(response.data[0].profile_data);
      res.image = "data:image/png;base64," + binaryImage;
      setProfile(res)
      //console.log(response.data[0].picture_data.data)
    })
  }
  
   
  const changeValue = (name,value) => {
    setProfile(profile=> ({
      ...profile,
      [name]:value
    }))
    //console.log(profile);
  }; 
  
  //console.log("sdasdasdasd");
    
    const onFormSumbit = (event) => {
      event.preventDefault();
      setShowModal(true);
    }
  
  //type input
  const inputHandler = (e) => {
    const { value, maxLength } = e.target;
    if (String(value).length >= maxLength) {
      e.preventDefault();
      return;
    }
  };
  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (

    <div className="frame">
      <div className="header">
      <div className="left" >
        <div className="icons">
          <i className="bi bi-list-ul"/>
        </div>
        <div class="topic">
          <h4>ข้อมูลนิสิต</h4>
        </div> 
        </div>
        <div className="right">
          <button className='button-add d-flex' onClick={ () => {setContent('Member')}}>
            <i className='bi bi-arrow-left-circle sky'></i>
            <p>ย้อนกลับ</p>
          </button>
        </div>
      </div>
      <div className="contents">
        <div className="content1">
          <form className="form2" onSubmit={(e)=> onFormSumbit(e)}>  
            <div class="name">
              <h5>ดูข้อมูลนิสิต</h5>
            </div>
            <div>
            <label>ชื่อ-นามสกุล</label><br></br>
              <input  placeholder="ชื่อภาษาไทย" value = {profile.name} onChange={(e)=>changeValue("name",e.target.value)} required/>
            </div>
            {/* <div>
              <label>นิสิตชั้นปีที่</label><br></br>
              <select  value = {profile.yearofstudy} onChange={(e)=>changeValue("yearofstudy",e.target.value)} required>
                <option value="">เลือก</option>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>
            </div> */}
            <div>
              <label>วันเกิด</label><br></br>
              <input type="date"  placeholder="วันเกิด" value = {profile.birth_date} onChange={(e)=>changeValue("birth_date",e.target.value)}  required/>
            </div>
            
            <div>
              <label>รหัสนิสิต</label><br></br>
              <input type="number" min="0"  maxlength="10" placeholder="รหัสนิสิต" value = {profile.std_id} onChange={(e)=>changeValue("std_id",e.target.value)} required/>
            </div>
            <div>
              <label>ภาคการเรียนการสอน</label><br></br>
              <select  value = {profile.fieldStudy} onChange={(e)=>changeValue("fieldStudy",e.target.value)} required>
                <option value="">เลือก</option>
                <option value="ภาคปกติ">   ภาคปกติ    </option>
                <option value="ภาคพิเศษ">  ภาคพิเศษ   </option>
              </select>
            </div>
            
            <div>
              <label>สาขา</label><br></br>
              <select value = {profile.branch} onChange={(e)=>changeValue("branch",e.target.value)} required>
              <option value="">เลือก</option>
                  <option value="วิศวกรรมโยธา (T05)">วิศวกรรมโยธา (T05)</option>
                  <option value="วิศวกรรมอุตสาหการ (T07)">วิศวกรรมอุตสาหการ (T07)</option>
                  <option value="วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์ (T12)">วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์ (T12)</option>
                  <option value="วิศวกรรมเครื่องกลและการออกแบบ (T13)">วิศวกรรมเครื่องกลและการออกแบบ (T13)</option>
                  <option value="วิศวกรรมไฟฟ้าและอิเล็กทรอนิกส์ (T14)">วิศวกรรมไฟฟ้าและอิเล็กทรอนิกส์ (T14)</option>
                  <option value="วิศวกรรมอุตสาหการและระบบ (T17)">วิศวกรรมอุตสาหการและระบบ (T17)</option>
                  <option value="วิศวกรรมเครื่องกลและระบบการผลิต (T18)">วิศวกรรมเครื่องกลและระบบการผลิต (T18)</option>
                  <option value="วิศวกรรมหุ่นยนต์และระบบอัตโนมัติ (T19)">วิศวกรรมหุ่นยนต์และระบบอัตโนมัติ (T19)</option>
                  <option value="วิศวกรรมระบบการผลิตดิจิทัล (T20)">วิศวกรรมระบบการผลิตดิจิทัล (T20)</option>
              </select>
            </div>
            
            <div>
              <label>ที่อยู่ปัจจุบัน (ที่ติดต่อได้สะดวก)</label><br></br>
              <input placeholder="ที่อยู่ปัจจุบัน" value = {profile.address} onChange={(e)=>changeValue("address",e.target.value)} required/>
            </div>
            <div>
              <label>เบอร์โทรศัพท์</label><br></br>
              <input type="tel"  placeholder="เบอร์โทรศัพท์" value = {profile.tel} onChange={(e)=>changeValue("tel",e.target.value)} required/>
            </div>
            {/*
            <div>
              <h5>ประวัติครอบครัว</h5>
            </div>
            <div>
              <label>ชื่อ-นามสกุล(บิดา)</label><br></br>
              <input placeholder="ชื่อภาษาไทย" value = {profile.name_father} onChange={(e)=>changeValue("name_father",e.target.value)} required/>
            </div>
            <div class="profile-fam d-flex">
              <div class="fam1-edit">
                <label>อายุ</label><br></br>
                <input className = "halfbar" type="number" min="0" placeholder="อายุ" value = {profile.age_father} onChange={(e)=>changeValue("age_father",e.target.value)} required/>
              </div>
              <div class="fam2-edit">
                <label>สถานะภาพ</label>
                <select className="form-select form-select-lg mb-3" value = {profile.status_father} onChange={(e)=>changeValue("status_father",e.target.value)} required>
                  <option value="">เลือก</option>
                  <option value="ยังมีชีวิตอยู่">ยังมีชีวิตอยู่</option>
                  <option value="ถึงแก่กรรม">ถึงแก่กรรม</option>
                </select>
              </div>
            </div>
            
            <div class="profile-fam d-flex">
              <div class="fam1-edit">
                <label>อาชีพ</label><br></br>
                <input className = "halfbar" placeholder="ระบุอาชีพ" value = {profile.career_father} onChange={(e)=>changeValue("career_father",e.target.value)} required/>
              </div>
              <div class="fam2-edit">
                <label>เบอร์โทรศัพท์</label><br></br>
                <input className = "halfbar" type="tel"  placeholder="ระบุเบอร์โทรศัพท์" value = {profile.tel_father} onChange={(e)=>changeValue("tel_father",e.target.value)} required/>
              </div>
            </div>
        
            <div class="profile-fam d-flex">
              <div class="fam1-edit">
                <label>รายได้ต่อเดือน</label><br></br>
                <input className = "halfbar" type="number" min="0" placeholder="ระบุรายได้ต่อเดือน" value = {profile.income_father} onChange={(e)=>changeValue("income_father",e.target.value)} required/>
              </div>
              <div class="fam2-edit">
                <label>สถานที่ประกอบอาชีพ</label><br></br>
                <input className = "halfbar" placeholder="สถานที่ประกอบอาชีพ" value = {profile.place_of_work_father} onChange={(e)=>changeValue("place_of_work_father",e.target.value)} required/>
              </div>
            </div>
          
            <div>
              <label>ที่อยู่ของบิดา</label><br></br>
              <input className = "halfbar" placeholder="ที่อยู่ของบิดา" value = {profile.address_father} onChange={(e)=>changeValue("address_father",e.target.value)} required/>
            </div>

            <div>
              <label>ชื่อ-นามสกุล(มารดา)</label><br></br>
              <input className = "halfbar" placeholder="ชื่อ-สกุล(มารดา)" value = {profile.name_mother} onChange={(e)=>changeValue("name_mother",e.target.value)} required/>
            </div>
            <div class="profile-fam d-flex">
              <div class="fam1-edit">
                <label>อายุ</label><br></br>
                <input className="halfbar" type="number" min="0" placeholder="อายุ" value = {profile.age_mother} onChange={(e)=>changeValue("age_mother",e.target.value)}  required/>
              </div>
              <div class="fam2-edit">
                <label>สถานะภาพ</label>
                <select className="form-select form-select-lg mb-3" value = {profile.status_mother} onChange={(e)=>changeValue("status_mother",e.target.value)}  required>
                  <option value="">เลือก</option>
                  <option value="ยังมีชีวิตอยู่">ยังมีชีวิตอยู่</option>
                  <option value="ถึงแก่กรรม">ถึงแก่กรรม</option>
                </select>
              </div>
            </div>

            <div class="profile-fam d-flex">
              <div class="fam1-edit">
                <label>อาชีพ</label><br></br>
                <input className = "halfbar" placeholder="ระบุอาชีพ" value = {profile.career_mother} onChange={(e)=>changeValue("career_mother",e.target.value)} required/>
              </div>
              <div class="fam2-edit">
                <label>เบอร์โทรศัพท์</label><br></br>
                <input className = "halfbar" type="tel"  placeholder="ระบุเบอร์โทรศัพท์" value = {profile.tel_mother} onChange={(e)=>changeValue("tel_mother",e.target.value)} required/>
              </div>
            </div>

            <div class="profile-fam d-flex">
              <div class="fam1-edit">
                <label>รายได้ต่อเดือน</label><br></br>
                <input className = "halfbar" type="number" min="0" placeholder="ระบุรายได้ต่อเดือน" value = {profile.income_mother} onChange={(e)=>changeValue("income_mother",e.target.value)} required/>
              </div>
              <div class="fam2-edit">
                <label>สถานที่ประกอบอาชีพ</label>
                <input className = "halfbar" placeholder="สถานที่ประกอบอาชีพ" value = {profile.place_of_work_mother} onChange={(e)=>changeValue("place_of_work_mother",e.target.value)} required/>
              </div>
            </div>
            <div>
              <label>ที่อยู่ของมารดา</label><br></br>
              <input className = "halfbar" placeholder="ที่อยู่มารดา" value = {profile.address_mother} onChange={(e)=>changeValue("address_mother",e.target.value)} required/>
            </div>
            <div>
              <label>สถานะสมรสของบิดา-มารดา</label><br></br>
              <input className = "halfbar" placeholder="สถานะสมรสของบิดา-มารดา" value = {profile.status_marry} onChange={(e)=>changeValue("status_marry",e.target.value)} required/>
            </div>*/}
          
          </form>
    
        </div>
      </div>
    </div>
  ) 
}

export default FormProfile;
