import React, { useContext, useState, useEffect } from 'react';
import ConfirmModal from '../modals/ConfirmModal.js';
import { WebContext } from '../App.js';
import Axios from 'axios';

function ScholarshipCheckForm(props) {

  const { User } = useContext(WebContext);
  const { Content } = useContext(WebContext)
  const [ content, setContent] = Content;
  const [user, setUser] = User;

  const [check,setCheck]=useState();
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
      user_id:user.id
    })
    .then((response) =>{
        console.log(response.data[0].file_path);
        setProfile(JSON.parse(response.data[0].file_path))
    })
  }
  
  useEffect(()=>{
    getProfile();
  },[]);

  return (
    <div className="frame">
      {/* ----- Header ----- */}
      <div className="header">
        <div className="left">
          <div className="icons">
            <i className="bi bi-three-dots"/>
          </div>
          <div className="topic">
            <h4>ตรวจสอบข้อมูล</h4>
          </div>
        </div>
        <div className="right"/>
      </div>

      {/* ----- Content ----- */}
      <div className="content3">
        <div className="name">
          <h5>ตรวจสอบข้อมูล</h5>
        </div>
        <form className="scholarChek-form">
          <div>
            <label>ชื่อ - นามสกุล (ภาษาไทย)</label><br/>
            <input placeholder="ชื่อภาษาไทย" value = {profile.name} required/>
          </div>
          
          <div>
            <label>นิสิตชั้นปีที่</label>
            <select className="form-select form-select-lg mb-3" value = {profile.yearofstudy} required>
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
            <input type="number" min="0" placeholder="อายุ" value = {profile.age} required></input>
          </div>
          
          <div>
            <label>รหัสนิสิต</label><br></br>
            <input type="number" placeholder="รหัสนิสิต" value = {profile.std_id} required></input>
          </div>
          
          <div>
            <label>ภาคการเรียนการสอน</label>
            <select className="form-select form-select-lg mb-3" value = {profile.fieldStudy} required>
              <option value="0">เลือก</option>
              <option value="ภาคปกติ">ภาคปกติ</option>
              <option value="ภาคพิเศษ">ภาคพิเศษ</option>
            </select>
          </div>
          
          <div>
            <label>สาขา</label>
            <select className="form-select form-select-lg mb-3" value = {profile.branch} required>
                <option value="0">เลือก</option>
                <option value="คอมพิวเตอร์">คอมพิวเตอร์</option>
                <option value="ไฟฟ้า">ไฟฟ้า</option>
                <option value="เครื่องกล">เครื่องกล</option>
                <option value="หุ่นยนต์">หุ่นยนต์</option>
            </select>
          </div>
          <div>
            <label>คะแนนเฉลี่ยนสะสม(GPA)</label><br></br>
            <input type="number" min="0" placeholder = "คะแนนเฉลี่ยสะสม(GPA)" required></input>
          </div>
          
          <div>
            <label>ที่อยู่ปัจจุบัน(ที่ติดต่อได้สะดวก)</label><br></br>
            <input placeholder = "ที่อยู่ปัจจุบัน" required></input>
          </div>
          
          <div>
            <label>เบอร์โทรศัพท์</label><br></br>
            <input type="tel" placeholder = "เบอร์โทรศัพท์" required></input>
          </div>
         
            <h5>ประวัติครอบครัว</h5>
           
          <div>
            <label>ชื่อ-นามสกุล(บิดา)</label><br></br>
            <input placeholder = "ชื่อ-นามสกุล(บิดา)" required></input>
          </div>
          

          <div class="profile-fam d-flex">
            <div class="fam1-edit">
              <label>อายุ</label><br></br>
              <input className = "halfbar" type="number" min="0"  placeholder="อายุ" required></input>
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
              <input placeholder = "อาชีพ" required></input>
            </div>
            <div class="fam2-edit">
              <label>เบอร์โทรศัพท์</label><br></br>
              <input type="tel" placeholder = "เบอร์โทรศัพท์" required></input>
            </div>
          </div>

          <div class="profile-fam  d-flex">
            <div class="fam1-edit">
              <label>รายได้ต่อเดือน</label><br></br>
              <input className = "halfbar" type="number" min="0" placeholder="ระบุรายได้ต่อเดือน" required></input>
            </div>
            <div class="fam2-edit">
              <label>สถานที่ประกอบอาชีพ</label><br></br>
              <input className = "halfbar" placeholder="สถานที่ประกอบอาชีพ" required></input>
            </div>
          </div>
          
          <div>
            <label>ที่อยู่ของบิดา</label><br></br>
            <input placeholder = "ที่อยู่ของบิดา" required></input>
          </div>
          <br></br>
          <div>
            <label>ชื่อ-นามสกุล(มารดา)</label><br></br>
            <input placeholder = "ชื่อ-นามสกุล(มารดา)" required></input>
          </div>
          
          <div class="profile-fam  d-flex">
            <div class="fam1-edit">
              <label>อายุ</label><br></br>
              <input className = "halfbar" type="number" min="0" placeholder="อายุ" required></input>
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
              <input placeholder = "อาชีพ" required></input>
            </div>
            <div class="fam2-edit">
              <label>เบอร์โทรศัพท์</label><br></br>
              <input type="tel" placeholder = "เบอร์โทรศัพท์" required></input>
            </div>
          </div>

          <div class="profile-fam d-flex">
            <div class="fam1-edit">
              <label>รายได้ต่อเดือน</label><br></br>
              <input className = "halfbar" type="number" min="0" placeholder="ระบุรายได้ต่อเดือน" required></input>
            </div>
            <div class="fam2-edit">
              <label>สถานที่ประกอบอาชีพ</label><br></br>
              <input className = "halfbar" placeholder="สถานที่ประกอบอาชีพ" required></input>
            </div>
          </div>

          
          <div>
            <label>ที่อยู่ของมารดา</label><br></br>
            <input placeholder = "ที่อยู่ของมารดา" required></input>
          </div>
          
          <div>
            <label>สถานะสมรสบิดา-มารดา</label>
            <select className="form-select form-select-lg mb-3" required>
                <option value="0">เลือก</option>
                <option value="อยู่ด้วยกัน">อยู่ด้วยกัน</option>
                <option value="แยกกันอยู่">แยกกันอยู่</option>
                <option value="หย่าร้าง">หย่าร้าง</option>   
            </select>
          </div>
          <div>
            <p>พี่น้องร่วมบิดา มารดาและระดับการศึกษาหรืออาชีพ เรียงตามลำดับดังนี้(รวมนิสิตผู้สมัครด้วย) </p>
          </div>
          <div>
            <label>ชื่อ-นามสกุล</label><br></br>
            <input placeholder = "ชื่อ-นามสกุล" required></input>
          </div>
          
          <div>
            <label>ระดับการศึกษา</label><br></br>
            <input placeholder = "ระดับการศึกษา" required></input>
          </div>
          
          <div>
            <label>อาชีพ</label><br></br>
            <input placeholder = "อาชีพ" required></input>
          </div>
          
          <div>
            <label>สถานที่ประกอบอาชีพ/สถานศึกษา</label><br></br>
            <input placeholder = "สถานที่ประกอบอาชีพ/สถานศึกษา" required></input>
          </div>
          <div class="topic-doc">
            <h5>เอกสารที่นิสิตต้อง Upload</h5>
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

        <form>
          
            <div className="form-checks d-flex">
              <div className="form-check-true">
                <input type="radio" name="check" value="Pass" onChange={e=>setCheck(e.targer.value)}></input>
                <label for="check1">สมบูรณ์</label>
              </div>
              
              <div className="form-check-false">
                <input type="radio" name="check" value="Notpass" onChange={e=>setCheck(e.targer.value)}></input>
                <label for="check2">ไม่สมบูรณ์</label>
              </div> 
            </div>
         

          <div className="form-note">
            <div className="note">
              <label>หมายเหตุ</label><br></br>
              <input placeholder = "มันไม่ถูกต้อง!!!"></input>
            </div>
          </div>
        </form>
      </div>
      <div className="checkForm-footer">
        <div className="btn-confirm-scholarCheck d-flex">
          <button className="btn-confirm">
            บันทึก
            </button>
        </div>
      </div>
  
    </div>
    
  );
}

export default ScholarshipCheckForm;
