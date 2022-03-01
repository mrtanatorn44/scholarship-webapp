import React, { useContext, useState, useEffect } from 'react';

import { WebContext } from '../App.js';
import ConfirmModal from '../modals/ConfirmModal.js';
import Axios from 'axios';

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
      user_id:user.id
    })
    .then((response) =>{
        console.log(response.data[0].file_path);
        setProfile(JSON.parse(response.data[0].file_path))
    })
  }
   const changeValue = (name,value) => {
    setProfile(profile=> ({
      ...profile,
      [name]:value
    }))
    console.log(profile);
  }; 
  console.log(user);
  
  useEffect(()=>{
    getProfile();
  },[]);

  return (
    <div className="frame-content">
        <div className="head-content d-flex">
            <div className="icons">
                <i className="bi bi-three-dots"></i>
            </div>
            <div class="topic">
              <h4>กรอกประวัติแรกเข้า</h4>
            </div>
        </div>
        <div className="frame-subcontent3"> 
        <div class="name">
          <h5>กรอกประวัติแรกเข้า</h5>
        </div>
        <form className="scholarReg-form">
          <div>
            <label>ชื่อ-นามสกุล(ภาษาไทย)</label><br></br>
            <input placeholder="ชื่อภาษาไทย" value = {profile.name} onChange={(e)=>changeValue("name",e.target.value)} required></input>
          </div>
          <br></br>
          <div>
            <label>นิสิตชั้นปีที่</label><br></br>
            <select className="form-select form-select-lg mb-3" value = {profile.yearofstudy} onChange={(e)=>changeValue("yearofstudy",e.target.value)} required>
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
            <input type="number" min="0" placeholder="อายุ" value = {profile.age} onChange={(e)=>changeValue("age",e.target.value)} required></input>
          </div>
          <br></br>
          <div>
            <label>รหัสนิสิต</label><br></br>
            <input type="number" placeholder="รหัสนิสิต" value = {profile.std_id} onChange={(e)=>changeValue("std_id",e.target.value)} required></input>
          </div>
          <br></br>
          <div>
            <label>ภาคการเรียนการสอน</label><br></br>
            <select className="form-select form-select-lg mb-3" value = {profile.fieldStudy} onChange={(e)=>changeValue("fieldStudy",e.target.value)} required>
              <option value="0">เลือก</option>
              <option value="ภาคปกติ">ภาคปกติ</option>
              <option value="ภาคพิเศษ">ภาคพิเศษ</option>
            </select>
          </div>
          
          <div>
            <label>สาขา</label><br></br>
            <select className="form-select form-select-lg mb-3" value = {profile.branch} onChange={(e)=>changeValue("branch",e.target.value)} required>
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
          <br></br>
          <div>
            <label>ที่อยู่ปัจจุบัน(ที่ติดต่อได้สะดวก)</label><br></br>
            <input placeholder = "ที่อยู่ปัจจุบัน"  value = {profile.address} onChange={(e)=>changeValue("address",e.target.value)} required></input>
          </div>
          <br></br>
          <div>
            <label>เบอร์โทรศัพท์</label><br></br>
            <input type="tel" placeholder = "เบอร์โทรศัพท์" value = {profile.tel} onChange={(e)=>changeValue("tel",e.target.value)} required></input>
          </div>
          <br></br>

          <div class="topic-fam">
            <h5>ประวัติครอบครัว</h5>
          </div>

          <div>
            <label>ชื่อ-นามสกุล(บิดา)</label><br></br>
            <input placeholder = "ชื่อภาษาไทย" value = {profile.name_father} onChange={(e)=>changeValue("name_father",e.target.value)} required></input>
          </div> 
          <br></br>
          <div class="profile-fam d-flex">
            <div class="fam1-edit">
              <label>อายุ</label><br></br>
              <input className = "halfbar" type="number" min="0" placeholder="อายุ" value = {profile.age_father} onChange={(e)=>changeValue("age_father",e.target.value)} required></input>
            </div>
            <div class="fam2-edit">
              <label>สถานะภาพ</label><br></br>
              <select className="form-select form-select-lg mb-3" value = {profile.status__father} onChange={(e)=>changeValue("status__father",e.target.value)} required>
                <option value="0">เลือก</option>
                <option value="ยังมีชีวิตอยู่">ยังมีชีวิตอยู่</option>
                <option value="ถึงแก่กรรม">ถึงแก่กรรม</option>
              </select>
            </div>
          </div>

          <div class="profile-fam d-flex">
            <div class="fam1-edit">
              <label>อาชีพ</label><br></br>
              <input className = "halfbar" placeholder="ระบุอาชีพ" value = {profile.career_father} onChange={(e)=>changeValue("career_father",e.target.value)} required></input>
            </div>
            <div class="fam2-edit">
              <label>เบอร์โทรศัพท์</label><br></br>
              <input className = "halfbar" type="tel" placeholder="ระบุเบอร์โทรศัพท์" value = {profile.tel_father} required></input>
            </div>
          </div>

          <div class="profile-fam d-flex">
            <div class="fam1-edit">
              <label>รายได้ต่อเดือน</label><br></br>
              <input className = "halfbar" type="number" min="0" placeholder="ระบุรายได้ต่อเดือน" value = {profile.income_father} required></input>
            </div>
            <div class="fam2-edit">
              <label>สถานที่ประกอบอาชีพ</label><br></br>
              <input className = "halfbar" placeholder="สถานที่ประกอบอาชีพ" value = {profile.place_of_work_father} required></input>
            </div>
          </div>
          <br></br>
          <div>
            <label>ที่อยู่ของบิดา</label><br></br>
            <input placeholder="ที่อยู่ของบิดา" value = {profile.address_father} required></input>
          </div>
          <br></br>
          <div>
            <label>ชื่อ-นามสกุล(มาราดา)</label><br></br>
            <input placeholder = "ชื่อภาษาไทย" value = {profile.name_mother} required></input>
          </div>
          <br></br>
          <div class="profile-fam d-flex">
            <div class="fam1-edit">
              <label>อายุ</label><br></br>
              <input className = "halfbar" type="number" min="0" placeholder="อายุ" value = {profile.age_mother} required></input>
            </div>
            <div class="fam2-edit">
              <label>สถานะภาพ</label><br></br>
              <select className="form-select form-select-lg mb-3" value = {profile.status_mother} required>
                <option value="0">เลือก</option>
                <option value="ยังมีชีวิตอยู่">ยังมีชีวิตอยู่</option>
                <option value="ถึงแก่กรรม">ถึงแก่กรรม</option>
              </select>
            </div>
          </div>

          <div class="profile-fam d-flex">
            <div class="fam1-edit">
              <label>อาชีพ</label><br></br>
              <input className = "halfbar" placeholder="ระบุอาชีพ" value = {profile.career_mother} required></input>
            </div>
            <div class="fam2-edit">
              <label>เบอร์โทรศัพท์</label><br></br>
              <input className = "halfbar" type="tel" placeholder="ระบุเบอร์โทรศัพท์" value = {profile.tel_mother} required></input>
            </div>
          </div>

          <div class="profile-fam d-flex">
            <div class="fam1-edit">
              <label>รายได้ต่อเดือน</label><br></br>
              <input className = "halfbar"  type="number" min="0" placeholder="ระบุรายได้ต่อเดือน" value = {profile.income_mother} required></input>
            </div>
            <div class="fam2-edit">
              <label>สถานที่ประกอบอาชีพ</label><br></br>
              <input className = "halfbar" placeholder="สถานที่ประกอบอาชีพ" value = {profile.place_of_work_mother} required></input>
            </div>
          </div>
          <br></br>
          <div>
            <label>ที่อยู่ของมารดา</label><br></br>
            <input placeholder="ที่อยู่ของมารดา" value = {profile.address_mother} required></input>
          </div>
          <br></br>
          <div>
          <label>สถานะสมรสบิดา-มารดา</label><br></br>
            <select className="form-select form-select-lg mb-3" value = {profile.status_marry} required>
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
          <br></br>
          <div>
            <label>ระดับการศึกษา</label><br></br>
            <input placeholder="ระดับการศึกษา" required></input>
          </div>
          <br></br>
          <div>
            <label>อาชีพ</label><br></br>
            <input placeholder="อาชีพ" required></input>
          </div>
          <br></br>
          <div>
            <label>สถานที่ประกอบอาชีพ/สถานศึกษา</label><br></br>
            <input placeholder="สถานที่ประกอบอาชีพ/สถานศึกษา" required></input>
          </div>
          <div class="topic-doc">
            <h5>เอกสารที่นิสิตต้อง Upload</h5>
          </div>
          <div>
            <label>สำเนาบัตรประชาชน</label><br></br>
            <input type="file" placeholder = "สำเนาบัตรประชาชน" required></input>
          </div>
          <br></br>
          <div>
            <label>แบบจิตอาสา กยศ.</label><br></br>
            <input type="file" placeholder = "แบบจิตอาสา กยศ." required></input>
          </div>
          <br></br>
          <div>
            <label>ใบแจ้งหนี้ค่าลงทะเบียน</label><br></br>
            <input type="file" placeholder = "ใบแจ้งหนี้ค่าลงทะเบียน" required></input>
          </div>
          <br></br>
          <div>
            <label>ใบลงทะเบียน</label><br></br>
            <input type="file" placeholder = "ใบลงทะเบียน" required></input>
          </div>
          <br></br>
          <div>
            <label>ใบเกรด(GPA)</label><br></br>
            <input type="file" placeholder = "ใบเกรด(GPA)" required></input>
          </div>
        </form>
      </div>
      <div className="register-footer">
        <div className="btn-confirm-scholarLisRig d-flex">
          <button className="btn-confirm" >บันทึก</button>
          
        </div>
      </div>
    </div> 
  );
}

export default ScholarshipListRegister;
