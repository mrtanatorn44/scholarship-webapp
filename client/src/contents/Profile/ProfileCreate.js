/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App.js';
import Axios from 'axios';

import Swal from 'sweetalert2'

function ProfileCreate() {
  //usecontext
  const { User } = useContext(WebContext);
  const { Content } = useContext(WebContext);
  const [user, setUser] = User;
  const [content, setContent] = Content;
  const [form, setForm] = useState({
    imageData:"",
    imageName :""
  })
  //
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
    status_marry:"",
    gpa:""
   })

  function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  function onHandleUpload(e) {
    var file = e.target.files[0];
    if (file.size <= 1048576) {
      var arrayBuffer;
      var reader = new FileReader();
      reader.onload = async function() {
        arrayBuffer = reader.result;
        setForm({
          ...form,
          imageData : _arrayBufferToBase64(arrayBuffer),
          imageName : file.name,
        })
      }
      reader.readAsArrayBuffer(file); 
    } else {
      Swal.fire('Limit Image Size!', 'รูปต้องมีขนาดไม่เกิน 1Mb', 'warning')
    }
  } 

  const changeValue = (name,value) => {
    setProfile(profile=> ({
      ...profile,
      [name]:value
    }))
  }; 
  
  function onHandleSubmitBtn(e) {
    e.preventDefault();

    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: 'ที่จะบันทึกประกาศนี้!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#03A96B',
      confirmButtonText: 'Save',
      cancelButtonColor: '#A62639',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        
        setContent('Profile');
        Swal.fire('บันทึกแล้ว!','','success')

        Axios.post("http://localhost:5000/addProfile",{
        id            : user.id,
        profile_data  : JSON.stringify(profile),
        picture_data  : form.imageData,
        picture_name  : form.imageName
      })
      }
    })
  }
  
  return (

    <div className="frame">
      <div className="header">
      <div className="left" >
        <div className="icons">
          <i className="bi bi-list-ul"/>
        </div>
        <div className="topic">
          <h4>สร้างโปรไฟล์</h4>
        </div> 
        </div>
        <div className="right"></div>
      </div>
      <div className="contents" >
        <div className="content3">
          <form className="form2" onSubmit={(e) => onHandleSubmitBtn(e)}>  
            <div className="name">
              <h5>กรอกประวัติแรกเข้า</h5>
            </div>
            <div>
            <label>ชื่อ-นามสกุล (ภาษาไทย)</label><br></br>
              <input   placeholder="ชื่อภาษาไทย" value = {profile.name} onChange={(e)=>changeValue("name",e.target.value)} required/>
            </div>
            <div>
              <label>วันเกิด</label><br></br>
              <input type="date"  placeholder="วันเกิด" value = {profile.birth_date} onChange={(e)=>changeValue("birth_date",e.target.value)}  required/>
            </div>
            

            
            <div>
              <label>รหัสนิสิต</label><br></br>
              <input 
                type="number"
                min={String(new Date().getFullYear() + 543 - 8).substring(2, 4) + "00000000"}
                max={String(new Date().getFullYear() + 543 - 0).substring(2, 4) + "00000000"} 
                placeholder="รหัสนิสิต"
                value={profile.std_id}
                onChange={
                  (e)=> {
                    changeValue("std_id",e.target.value)
                  }
                }
                required
              />
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
              <select  value = {profile.branch} onChange={(e)=>changeValue("branch",e.target.value)} required>
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
                <label>คะแนนเฉลี่ยนสะสม(GPA)</label><br></br>
                <input value = {profile.gpa} type="number" min="0" max="4" step="0.01"  placeholder = "คะแนนเฉลี่ยสะสม(GPA)" onChange={(e)=>changeValue("gpa",e.target.value)} required></input>
            </div>
            <div>
              <label>ที่อยู่ปัจจุบัน (ที่ติดต่อได้สะดวก)</label><br></br>
              <input placeholder="ที่อยู่ปัจจุบัน" value = {profile.address} onChange={(e)=>changeValue("address",e.target.value)} required/>
            </div>
            <div>
              <label>เบอร์โทรศัพท์</label><br></br>
              <input type="tel"  placeholder="เบอร์โทรศัพท์" value = {profile.tel} onChange={(e)=>changeValue("tel",e.target.value)} required/>
            </div>
            <div>
              <label>อัพโหลดรูปโปรไฟล์</label><br></br>
              <input
                type="file"
                accept="image/jpeg,image/png"
                name="file"
                id="file"
                onChange={
                  (file) => onHandleUpload(file)
                } 
                required
              />
            </div>

            {/* MOTHER */}
            <h5>ข้อมูลบิดา</h5>
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

            {/* MOTHER */}
            <h5>ข้อมูลมารดา</h5>
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
            <label>สถานะสมรสบิดา-มารดา</label><br></br>
                <select Value = {profile.status_marry} required>
                    <option value="">เลือก</option>
                    <option value="แยกกันอยู่">แยกกันอยู่</option>
                    <option value="หย่าร้าง">หย่าร้าง</option>
                    <option value="อยู่ด้วยกัน">อยู่ด้วยกัน</option>
                </select>
            </div>
            <div className="footer1">
              <div className="confirm">
                <button className="button-confirm green1" type='submit'>
                  ตกลง 
                </button>  
              </div>     
             </div>
              </form>
            </div>    
            
      </div>
    </div>
  ) 
}

export default ProfileCreate;
