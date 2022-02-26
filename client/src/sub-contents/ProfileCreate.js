
import React, { useContext, useState, useEffect } from 'react';
import ConfirmModal from '../modals/ConfirmModal.js';
import { WebContext } from '../App.js';
import Axios from 'axios';

function ProfileCreate() {
  //usecontext
  const { User } = useContext(WebContext);
  const [user, setUser] = User;
  //
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
   })
  const [profileFamily, setProfileFamily]=useState({
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
  const changeValue = (name,value) => {
    setProfile(profile=> ({
      ...profile,
      [name]:value
    }))
    console.log(profile);
  }; 
  console.log(user);
  function getConfirm(data){
    if(data){

    }else{
      
    }
    //console.log("sdasdasdasd");
    Axios.post("http://localhost:5000/addProfile",{
      user_id:user.id,
      file_path:JSON.stringify(profile),
      file_path_family:JSON.stringify(profileFamily)
    }).then(
      (response) => {
        setShowModal(false);
      },(err)=>{
        alert("kkkkkk")
      }
    );
  }

  
  return (

    <div className="frame-content">
      <div className="head-content d-flex" >
        <div className="icons">
          <i className="bi bi-list-ul"/>
        </div>
        <div class="topic">
          <h4>{user.id}</h4>
        </div>
      </div>
      <div className="frame-subcontent3">
        <div class="name">
          <h5>กรอกประวัติแรกเข้า</h5>
        </div>
        <form className="profileEdit-form">  
          <div>
            <input placeholder="ชื่อภาษาไทย" value = {profile.name} onChange={(e)=>changeValue("name",e.target.value)} required/>
          </div>
          <div>
            <label>นิสิตชั้นปีที่</label>
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
            <input placeholder="อายุ" value = {profile.age} onChange={(e)=>changeValue("age",e.target.value)}  required/>
          </div>
          <div>
            <label>รหัสนิสิต</label><br></br>
            <input placeholder="รหัสนิสิต" value = {profile.std_id} onChange={(e)=>changeValue("std_id",e.target.value)} required/>
          </div>
          <div>
            <label>ภาคการเรียนการสอน</label>
            <select className="form-select form-select-lg mb-3" value = {profile.fieldStudy} onChange={(e)=>changeValue("fieldStudy",e.target.value)} required>
              <option value="0">        เลือก       </option>
              <option value="ภาคปกติ">   ภาคปกติ    </option>
              <option value="ภาคพิเศษ">  ภาคพิเศษ   </option>
            </select>
          </div>
          
          <div>
            <label>สาขา</label>
            <select className="form-select form-select-lg mb-3" value = {profile.branch} onChange={(e)=>changeValue("branch",e.target.value)} required>
                <option value="0">  เลือก       </option>
                <option value="5">  คอมพิวเตอร์  </option>
                <option value="4">  ไฟฟ้า      </option>
                <option value="4">  เครื่องกล    </option>
                <option value="4">  หุ่นยนต์     </option>
            </select>
          </div>
          
          <div>
            <label>ที่อยู่ปัจจุบัน (ที่ติดต่อได้สะดวก)</label><br></br>
            <input placeholder="ที่อยู่ปัจจุบัน" value = {profile.address} onChange={(e)=>changeValue("address",e.target.value)} required/>
          </div>
          <div>
            <label>เบอร์โทรศัพท์</label><br></br>
            <input placeholder="เบอร์โทรศัพท์" value = {profile.tel} onChange={(e)=>changeValue("tel",e.target.value)} required/>
          </div>
          <div>
            <label>อัพโหลดรูปโปรไฟล์</label><br></br>
            <input type="file" name="myfile"  required/>
          </div>
          <div>
            <h5>ประวัติครอบครัว</h5>
          </div>
          <div>
            <label>ชื่อ-นามสกุล(บิดา)</label><br></br>
            <input placeholder="ชื่อภาษาไทย" value = {profileFamily.name_father} onChange={(e)=>changeValue("name_father",e.target.value)} required/>
          </div>
          <div class="profile-fam d-flex">
            <div class="fam1-edit">
              <label>อายุ</label><br></br>
              <input className = "halfbar" placeholder="อายุ" required/>
            </div>
            <div class="fam2-edit">
              <label>สถานะภาพ</label>
              <select className="form-select form-select-lg mb-3" required>
                <option value="0">เลือก</option>
                <option value="ยังมีชีวิตอยู่">ยังมีชีวิตอยู่</option>
                <option value="ถึงแก่กรรม">ถึงแก่กรรม</option>
              </select>
            </div>
          </div>
          
          <div class="profile-fam d-flex">
            <div class="fam1-edit">
              <label>อาชีพ</label><br></br>
              <input className = "halfbar" placeholder="ระบุอาชีพ" required/>
            </div>
            <div class="fam2-edit">
              <label>เบอร์โทรศัพท์</label><br></br>
              <input className = "halfbar" placeholder="ระบุเบอร์โทรศัพท์" required/>
            </div>
          </div>
       
          <div class="profile-fam d-flex">
            <div class="fam1-edit">
              <label>รายได้ต่อเดือน</label><br></br>
              <input className = "halfbar" placeholder="ระบุรายได้ต่อเดือน" required/>
            </div>
            <div class="fam2-edit">
              <label>สถานที่ประกอบอาชีพ</label><br></br>
              <input className = "halfbar" placeholder="สถานที่ประกอบอาชีพ" required/>
            </div>
          </div>
        
          <div>
            <label>ที่อยู่ของบิดา</label><br></br>
            <input className = "halfbar" placeholder="ที่อยู่ของบิดา" required/>
          </div>

          <div>
            <label>ชื่อ-นามสกุล(มารดา)</label><br></br>
            <input className = "halfbar" placeholder="ชื่อ-สกุล(มารดา)" required/>
          </div>
          <div class="profile-fam d-flex">
            <div class="fam1-edit">
              <label>อายุ</label><br></br>
              <input className="halfbar" placeholder="อายุ" required/>
            </div>
            <div class="fam2-edit">
              <label>สถานะภาพ</label>
              <select className="form-select form-select-lg mb-3" required>
                <option value="0">เลือก</option>
                <option value="ยังมีชีวิตอยู่">ยังมีชีวิตอยู่</option>
                <option value="ถึงแก่กรรม">ถึงแก่กรรม</option>
              </select>
            </div>
          </div>

          <div class="profile-fam d-flex">
            <div class="fam1-edit">
              <label>อาชีพ</label><br></br>
              <input className = "halfbar" placeholder="ระบุอาชีพ" required/>
            </div>
            <div class="fam2-edit">
              <label>เบอร์โทรศัพท์</label><br></br>
              <input className = "halfbar" placeholder="ระบุเบอร์โทรศัพท์" required/>
            </div>
          </div>

          <div class="profile-fam d-flex">
            <div class="fam1-edit">
              <label>รายได้ต่อเดือน</label><br></br>
              <input className = "halfbar" placeholder="ระบุรายได้ต่อเดือน" required/>
            </div>
            <div class="fam2-edit">
              <label>สถานที่ประกอบอาชีพ</label>
              <input className = "halfbar" placeholder="สถานที่ประกอบอาชีพ" required/>
            </div>
          </div>
          <div>
            <label>ที่อยู่ของมารดา</label><br></br>
            <input className = "halfbar" placeholder="สถานที่ประกอบอาชีพ" required/>
          </div>
          <div>
            <label>สถานะสมรสของบิดา-มารดา</label><br></br>
            <input className = "halfbar" placeholder="สถานะสมรสของบิดา-มารดา" required/>
          </div>

        </form>
      </div>
      <div className="profileCre-footer">
        <div className="btn-confirm-profile d-flex">
          <button className="btn-confirm" onClick={()=> (setShowModal(true))}>บันทึก</button>
          {showModal && <ConfirmModal sendConfirm={getConfirm}/>}
        </div>
      </div>
    </div>
  ) 
}

export default ProfileCreate;
