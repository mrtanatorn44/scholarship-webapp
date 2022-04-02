/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App.js';
import Axios from 'axios';
import Swal from 'sweetalert2';

function ScholarshipListRegister(props) {
  const { User } = useContext(WebContext);
  const { Content } = useContext(WebContext);
  const [user, setUser] = User;
  const [content, setContent] = Content;

  const[showModal, setShowModal] = useState(false);
  const [profile, setProfile]=useState({
    name:"",
    yearofstudy:"",
    age:"",
    std_id:"",
    fieldStudy:"",
    branch:"",
    address:"",
    tel:"",
    name_father:"",
    age_father:"",
    career_father:"",
    income_father:"",
    address__father:"",
    status__father:"",
    place_of_work_father:"",
    tel_father:"",
    name_mother:"",
    age_mother:"",
    career_mother:"",
    income_mother:"",
    address__mother:"",
    status__mother:"",
    place_of_work_mother:"",
    tel_mother:"",
    status_marry:""
   })
   const getProfile = () =>{
    Axios.post("http://localhost:5000/getProfile",{
      id: user.id
    }).then((response) =>{
      console.log(response);
      setProfile(JSON.parse(response.data[0].profile_data))
    })
    console.log(profile);
  }
   const changeValue = (name,value) => {
    setProfile(profile=> ({
      ...profile,
      [name]:value
    }))
    console.log(profile);
  }; 
  //console.log(user);
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

        Axios.post("http://localhost:5000/editProfile",{
        id            : user.id,
        profile_data  : JSON.stringify(profile)
      })
      }
    })
  }

  
  
  useEffect(()=>{
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div className="frame">
        <div className="header">
          <div className="left">
            <div className="icons">
                <i className="bi bi-three-dots"></i>
            </div>
            <div className="topic">
              <h4>ลงทะเบียนทุน</h4>
            </div>
          </div>
          <div className="right"/>
        </div>
        <div className="contents"> 
          <div className="content3"> 
            <form className="form2" onSubmit={(e)=> {onHandleSubmitBtn(e);}}>
              <div className="name">
                <h5>ลงทะเบียนทุน</h5>
              </div>
              <div>
                <label>ชื่อ-นามสกุล (ภาษาไทย)</label><br></br>
                <input placeholder="ชื่อภาษาไทย" defaultValue={profile.name} onChange={(e)=>changeValue("name",e.target.value)} required></input>
              </div>
              
              <div>
                <label>นิสิตชั้นปีที่</label><br></br>
                <select  defaultValue = {profile.yearofstudy} onChange={(e)=>changeValue("yearofstudy",e.target.value)} required>
                  <option value="0">เลือก</option>
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                </select>
              </div>
              <div> 
                <label>อายุ</label><br></br>
                <input type="number" min="0" placeholder="อายุ" defaultValue = {profile.age} onChange={(e)=>changeValue("age",e.target.value)} required></input>
              </div>
              
              <div>
                <label>รหัสนิสิต</label><br></br>
                <input type="number" placeholder="รหัสนิสิต" defaultValue = {profile.std_id} onChange={(e)=>changeValue("std_id",e.target.value)} required></input>
              </div>
              
              <div>
                <label>ภาคการเรียนการสอน</label><br></br>
                <select defaultValue = {profile.fieldStudy} onChange={(e)=>changeValue("fieldStudy",e.target.value)} required>
                  <option value="0">เลือก</option>
                  <option value="ภาคปกติ">ภาคปกติ</option>
                  <option value="ภาคพิเศษ">ภาคพิเศษ</option>
                </select>
              </div>
              
              <div>
                <label>สาขา</label><br></br>
                <select defaultValue = {profile.branch} onChange={(e)=>changeValue("branch",e.target.value)} required>
                    <option value="0">เลือก</option>
                    <option value="5">คอมพิวเตอร์</option>
                    <option value="4">ไฟฟ้า</option>
                    <option value="4">เครื่องกล</option>
                    <option value="4">หุ่นยนต์</option>
                </select>
              </div>
              
              <div>
                <label>คะแนนเฉลี่ยนสะสม(GPA)</label><br></br>
                <input type="number" min="0" placeholder = "คะแนนเฉลี่ยสะสม(GPA)"  required></input>
              </div>
    
              <div>
                <label>ที่อยู่ปัจจุบัน(ที่ติดต่อได้สะดวก)</label><br></br>
                <input placeholder = "ที่อยู่ปัจจุบัน"  defaultValue = {profile.address} onChange={(e)=>changeValue("address",e.target.value)} required></input>
              </div>
              <div>
                <label>เบอร์โทรศัพท์</label><br></br>
                <input type="tel" placeholder = "เบอร์โทรศัพท์" defaultValue = {profile.tel} onChange={(e)=>changeValue("tel",e.target.value)} required></input>
              </div>
              <div className="topic-fam">
                <p>ประวัติครอบครัว</p>
              </div>

              <div>
                <label>ชื่อ-นามสกุล(บิดา)</label><br></br>
                <input placeholder = "ชื่อภาษาไทย" defaultValue = {profile.name_father} onChange={(e)=>changeValue("name_father",e.target.value)} required></input>
              </div> 
              <div className="profile-fam d-flex">
                <div className="fam-edit fam1">
                  <label>อายุ</label><br></br>
                  <input className = "halfbar" type="number" min="0" placeholder="อายุ" defaultValue = {profile.age_father} onChange={(e)=>changeValue("age_father",e.target.value)} required></input>
                </div>

                <div className="fam-edit fam2">
                  <label>สถานะภาพ</label><br></br>
                  <select value = {profile.status__father} onChange={(e)=>changeValue("status__father",e.target.value)} required>
                    <option value="0">เลือก</option>
                    <option value="ยังมีชีวิตอยู่">ยังมีชีวิตอยู่</option>
                    <option value="ถึงแก่กรรม">ถึงแก่กรรม</option>
                  </select>
                </div>
              </div>

              <div className="profile-fam d-flex">
                <div className="fam-edit fam1">
                  <label>อาชีพ</label><br></br>
                  <input className = "halfbar" placeholder="ระบุอาชีพ" defaultValue = {profile.career_father} onChange={(e)=>changeValue("career_father",e.target.value)} required></input>
                </div>
                <div className="fam-edit fam2">
                  <label>เบอร์โทรศัพท์</label><br></br>
                  <input className = "halfbar" type="tel" placeholder="ระบุเบอร์โทรศัพท์" defaultValue = {profile.tel_father} required></input>
                </div>
              </div>

              <div className="profile-fam d-flex">
                <div className="fam-edit fam1">
                  <label>รายได้ต่อเดือน</label><br></br>
                  <input className = "halfbar" type="number" min="0" placeholder="ระบุรายได้ต่อเดือน" defaultValue = {profile.income_father} required></input>
                </div>
                <div className="fam-edit fam2">
                  <label>สถานที่ประกอบอาชีพ</label><br></br>
                  <input className = "halfbar" placeholder="สถานที่ประกอบอาชีพ" defaultValue = {profile.place_of_work_father} required></input>
                </div>
              </div>
          
              <div>
                <label>ที่อยู่ของบิดา</label><br></br>
                <input placeholder="ที่อยู่ของบิดา" defaultValue = {profile.address_father} required></input>
              </div>
          
              <div>
                <label>ชื่อ-นามสกุล(มาราดา)</label><br></br>
                <input placeholder = "ชื่อภาษาไทย" defaultValue = {profile.name_mother} required></input>
              </div>
        
              <div className="profile-fam d-flex">
                <div className="fam-edit fam1">
                  <label>อายุ</label><br></br>
                  <input className = "halfbar" type="number" min="0" placeholder="อายุ" defaultValue = {profile.age_mother} required></input>
                </div>
                <div className="fam-edit fam2">
                  <label>สถานะภาพ</label><br></br>
                  <select defaultValue = {profile.status_mother} required>
                    <option value="0">เลือก</option>
                    <option value="ยังมีชีวิตอยู่">ยังมีชีวิตอยู่</option>
                    <option value="ถึงแก่กรรม">ถึงแก่กรรม</option>
                  </select>
                </div>
              </div>

              <div className="profile-fam d-flex">
                <div className="fam-edit fam1">
                  <label>อาชีพ</label><br></br>
                  <input className = "halfbar" placeholder="ระบุอาชีพ" defaultValue = {profile.career_mother} required></input>
                </div>
                <div className="fam-edit fam2">
                  <label>เบอร์โทรศัพท์</label><br></br>
                  <input className = "halfbar" type="tel" placeholder="ระบุเบอร์โทรศัพท์" defaultValue = {profile.tel_mother} required></input>
                </div>
              </div>

              <div className="profile-fam d-flex">
                <div className="fam-edit fam1">
                  <label>รายได้ต่อเดือน</label><br></br>
                  <input className = "halfbar"  type="number" min="0" placeholder="ระบุรายได้ต่อเดือน" defaultValue = {profile.income_mother} required></input>
                </div>
                <div className="fam-edit fam2">
                  <label>สถานที่ประกอบอาชีพ</label><br></br>
                  <input className = "halfbar" placeholder="สถานที่ประกอบอาชีพ" defaultValue = {profile.place_of_work_mother} required></input>
                </div>
              </div>
          
              <div>
                <label>ที่อยู่ของมารดา</label><br></br>
                <input placeholder="ที่อยู่ของมารดา" defaultValue = {profile.address_mother} required></input>
              </div>

              <div>
              <label>สถานะสมรสบิดา-มารดา</label><br></br>
                <select defaultValue = {profile.status_marry} required>
                    <option value="0">เลือก</option>
                    <option value="แยกกันอยู่">แยกกันอยู่</option>
                    <option value="หย่าร้าง">หย่าร้าง</option>
                    <option value="อยู่ด้วยกัน">อยู่ด้วยกัน</option>
                </select>
              </div>
              <div>
                <p>พี่น้องร่วมบิดา มารดาและระดับการศึกษาหรืออาชีพ เรียงตามลำดับดังนี้(รวมนิสิตผู้สมัครด้วย) </p>
              </div>
              <div>
                <label>ชื่อ-นามสกุล</label><br></br>
                <input placeholder="ชื่อ-นามสกุล" required></input>
              </div>
          
              <div>
                <label>ระดับการศึกษา</label><br></br>
                <input placeholder="ระดับการศึกษา" required></input>
              </div>
          
              <div>
                <label>อาชีพ</label><br></br>
                <input placeholder="อาชีพ" required></input>
              </div>
        
              <div>
                <label>สถานที่ประกอบอาชีพ/สถานศึกษา</label><br></br>
                <input placeholder="สถานที่ประกอบอาชีพ/สถานศึกษา" required></input>
              </div>
              <div className="topic-doc">
                <p>เอกสารที่นิสิตต้อง Upload</p>
              </div>

              <div>
                <label>สำเนาบัตรประชาชน</label><br></br>
                <input type="file" placeholder = "สำเนาบัตรประชาชน" required></input>
              </div>
      
              <div>
                <label>แบบจิตอาสา กยศ.</label><br></br>
                <input type="file" placeholder = "แบบจิตอาสา กยศ." required></input>
              </div>
    
              <div>
                <label>ใบแจ้งหนี้ค่าลงทะเบียน</label><br></br>
                <input type="file" placeholder = "ใบแจ้งหนี้ค่าลงทะเบียน" required></input>
              </div>
        
              <div>
                <label>ใบลงทะเบียน</label><br></br>
                <input type="file" placeholder = "ใบลงทะเบียน" required></input>
              </div>
        
              <div>
                <label>ใบเกรด(GPA)</label><br></br>
                <input type="file" placeholder = "ใบเกรด(GPA)" required></input>
              </div>
            </form>
          </div>
          <div className="footer1">
            <div className="confirm">
              <button className="button-confirm green1" type ='submit' >บันทึก</button>
            </div>
          </div>

      </div>
    </div> 
  )
}

export default ScholarshipListRegister;

//
