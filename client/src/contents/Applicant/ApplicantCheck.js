/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App.js';
import Axios from 'axios';
import Swal from 'sweetalert2';

function ApplicantCheck() {

  const { User,Content } = useContext(WebContext)
  const [user, setUser] = User;
  const [content, setContent] = Content;
  const [ fileForm , setFileForm]= useState([{
    lebel:'',format:'',url:'',
  }]);
  const [ idAppcant , setIDAppcant] = useState({
    id:'',
    user_id:'',
    scholarship_id:''
  })
  const [test,setTest] = useState([{
    toggleContent   : false
  }])
  const [adminCheck,setAdminCheck] =useState({
    status:"",
    rate            : "" ,
    notation        : ""  
  })
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
    status_marry:"",
    gpa:""
   });

  function getScholarshipForm() {
    Axios.post("http://localhost:5000/getForm", {
      id : localStorage.getItem('ApplicantID_target')
    }).then((response)=> {      
      var result =  response.data[0];
      console.log(result); 
      result.profile_detail = JSON.parse(result.profile_detail);
      setProfile(result.profile_detail); 
      result.file = JSON.parse(result.file);
      setFileForm(result.file);
      setAdminCheck({
        notation : result.notation,
        status : result.status
      })
      setIDAppcant({
        id: result.id,
        user_id : result.user_id
      });
    });
  }

  function onHandleSubmitBtn(e) {
    e.preventDefault();
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: 'ที่จะบันทึก!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#03A96B',
      confirmButtonText: 'Save',
      cancelButtonColor: '#A62639',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post("http://localhost:5000/editStatusForm", {
          id : idAppcant.id,
          status  : adminCheck.status,
          notation : adminCheck.notation      
        }).then((response) => {
          setContent('ApplicantList');
          Swal.fire('บันทึกแล้ว!','','success')
          console.log(response);
        });
      }
    })
  }
  console.log(adminCheck);
  console.log(idAppcant);

  
  
  useEffect(()=>{
    getScholarshipForm();
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
            <h4>ตรวจสอบเอกสารผู้ลงทะเบียน</h4>

          </div>
        </div>
        <div className="right"/>
          <button className='button-add d-flex' onClick={ () => {setContent('ApplicantList')}}>
            <i className='bi bi-arrow-left-circle'></i>
            <p>ย้อนกลับ</p>
            </button>
        </div>
      <div className="contents"> 

        <div className="content3"> 
          <form className="form2" onSubmit={(e) => onHandleSubmitBtn(e)}>
            <div className="name">
              <h5>ผู้ลงทะเบียน:{profile.name}</h5>
            </div> 
            <div>
              <label>ชื่อ-นามสกุล (ภาษาไทย)</label><br></br>
              <input 
                placeholder="ชื่อภาษาไทย"
                value={profile.name}
                readOnly="readOnly"
              />
            </div>
            <div>
              <label>นิสิตชั้นปีที่</label><br></br>
              <select value={parseInt(String(new Date().getFullYear() + 543).substring(2, 4)) - String(profile.std_id).substring(0,2)} readOnly="readOnly" >
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
              <input 
                value={Math.floor((new Date() - new Date(profile.birth_date).getTime()) / 3.15576e+10)}
                 required>
                </input>
            </div>
            
            <div>
              <label>รหัสนิสิต</label><br></br>
              <input value={profile.std_id} type="number" placeholder="รหัสนิสิต"  readOnly="readOnly"></input>
            </div>
            
            <div>
              <label>ภาคการเรียนการสอน</label><br></br>
              <select value={profile.fieldStudy} readOnly="readOnly">
                <option value="0">เลือก</option>
                <option value="ภาคปกติ">ภาคปกติ</option>
                <option value="ภาคพิเศษ">ภาคพิเศษ</option>
              </select>
            </div>
            
            <div>
              <label>สาขา</label><br></br>
              <select value={profile.branch} readOnly="readOnly" >
                <option value="0">เลือก</option>
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
              <input value={profile.gpa}  type="number" min="0"  step="0.01" placeholder = "คะแนนเฉลี่ยสะสม(GPA)" readOnly="readOnly"></input>
            </div>
  
            <div>
              <label>ที่อยู่ปัจจุบัน(ที่ติดต่อได้สะดวก)</label><br></br>
              <input value={profile.address}  placeholder = "ที่อยู่ปัจจุบัน" readOnly="readOnly" ></input>
            </div>
            <div>
              <label>เบอร์โทรศัพท์</label><br></br>
              <input value={profile.tel} type="tel" placeholder = "เบอร์โทรศัพท์" readOnly="readOnly"></input>
            </div>


            <h5>ข้อมูลบิดา</h5>
            <div>
              <label>ชื่อ-นามสกุล(บิดา)</label><br></br>
              <input placeholder = "ชื่อภาษาไทย" value = {profile.name_father} readOnly="readOnly" ></input>
            </div> 
            <div className="profile-fam d-flex">
              <div className="fam-edit fam1">
                <label>อายุ</label><br></br>
                <input className = "halfbar" type="number" min="0" placeholder="อายุ" value = {profile.age_father} readOnly="readOnly"  ></input>
              </div>

              <div className="fam-edit fam2">
                <label>สถานะภาพ</label><br></br>
                <select value = {profile.status_father} readOnly="readOnly" >
                  <option value="0">เลือก</option>
                  <option value="ยังมีชีวิตอยู่">ยังมีชีวิตอยู่</option>
                  <option value="ถึงแก่กรรม">ถึงแก่กรรม</option>
                </select>
              </div>
            </div>

            <div className="profile-fam d-flex">
              <div className="fam-edit fam1">
                <label>อาชีพ</label><br></br>
                <input className = "halfbar" value = {profile.career_father} placeholder="ระบุอาชีพ"  readOnly="readOnly" ></input>
              </div>
              <div className="fam-edit fam2">
                <label>เบอร์โทรศัพท์</label><br></br>
                <input className = "halfbar" type="tel" placeholder="ระบุเบอร์โทรศัพท์" value = {profile.tel_father}  readOnly="readOnly"></input>
              </div>
            </div>

            <div className="profile-fam d-flex">
              <div className="fam-edit fam1">
                <label>รายได้ต่อเดือน</label><br></br>
                <input className = "halfbar" type="number" min="0" placeholder="ระบุรายได้ต่อเดือน" value = {profile.income_father} readOnly="readOnly"  ></input>
              </div>
              <div className="fam-edit fam2">
                <label>สถานที่ประกอบอาชีพ</label><br></br>
                <input className = "halfbar" placeholder="สถานที่ประกอบอาชีพ" value = {profile.place_of_work_father}  readOnly="readOnly"></input>
              </div>
            </div>
        
            <div>
              <label>ที่อยู่ของบิดา</label><br></br>
              <input placeholder="ที่อยู่ของบิดา" value = {profile.address_father} readOnly="readOnly" ></input>
            </div>
        
            <h5>ข้อมูลมารดา</h5>
            <div>
              <label>ชื่อ-นามสกุล(มาราดา)</label><br></br>
              <input placeholder = "ชื่อภาษาไทย" value = {profile.name_mother} readOnly="readOnly" ></input>
            </div>
      
            <div className="profile-fam d-flex">
              <div className="fam-edit fam1">
                <label>อายุ</label><br></br>
                <input className = "halfbar" type="number" min="0" placeholder="อายุ" value = {profile.age_mother} readOnly="readOnly" ></input>
              </div>
              <div className="fam-edit fam2">
                <label>สถานะภาพ</label><br></br>
                <select value = {profile.status_mother} readOnly="readOnly" >
                  <option value="0">เลือก</option>
                  <option value="ยังมีชีวิตอยู่">ยังมีชีวิตอยู่</option>
                  <option value="ถึงแก่กรรม">ถึงแก่กรรม</option>
                </select>
              </div>
            </div>

            <div className="profile-fam d-flex">
              <div className="fam-edit fam1">
                <label>อาชีพ</label><br></br>
                <input className = "halfbar" placeholder="ระบุอาชีพ" value = {profile.career_mother} readOnly="readOnly" ></input>
              </div>
              <div className="fam-edit fam2">
                <label>เบอร์โทรศัพท์</label><br></br>
                <input className = "halfbar" type="tel" placeholder="ระบุเบอร์โทรศัพท์" value = {profile.tel_mother} readOnly="readOnly" ></input>
              </div>
            </div>

            <div className="profile-fam d-flex">
              <div className="fam-edit fam1">
                <label>รายได้ต่อเดือน</label><br></br>
                <input className = "halfbar"  type="number" min="0" placeholder="ระบุรายได้ต่อเดือน" value = {profile.income_mother} readOnly="readOnly" ></input>
              </div>
              <div className="fam-edit fam2">
                <label>สถานที่ประกอบอาชีพ</label><br></br>
                <input className = "halfbar" placeholder="สถานที่ประกอบอาชีพ" value = {profile.place_of_work_mother} readOnly="readOnly" ></input>
              </div>
            </div>
        
            <div>
              <label>ที่อยู่ของมารดา</label><br></br>
              <input placeholder="ที่อยู่ของมารดา" value = {profile.address_mother} readOnly="readOnly" ></input>
            </div>

            <div>
            <label>สถานะสมรสบิดา-มารดา</label><br></br>
            <select value = {profile.status_marry} readOnly="readOnly" >
                  <option value="0">เลือก</option>
                  <option value="แยกกันอยู่">แยกกันอยู่</option>
                  <option value="หย่าร้าง">หย่าร้าง</option>
                  <option value="อยู่ด้วยกัน">อยู่ด้วยกัน</option>
              </select>
            </div>

            <div class="topic-doc">
              <h5>เอกสารที่นิสิตUpload</h5>
            </div>
                {
                   fileForm.map((form,fidx)=>(
                    <div className='upload'>
                      <label>{form.title}.{form.format}</label><br></br>
                      <iframe src={form.url}></iframe>
                    </div>))
                }
  
              <div className="form3">
                <div className="check">
                  <div className="true">
                    <input type="radio" name="check" onChange={(e) => setAdminCheck({...adminCheck , status: 2 })}></input>
                    <label for="check1">สมบูรณ์</label>
                  </div>

                  <div className="false">
                    <input type="radio" name="check" onChange={(e) => setAdminCheck({...adminCheck , status: 9 })}></input>
                    <label for="check2">ไม่สมบูรณ์</label>
                  </div> 

                  <div className="false">
                    <input type="radio" name="check" onChange={(e) => setAdminCheck({...adminCheck , status: 0 })}></input>
                    <label for="check2">ไม่ผ่านเกณฑ์</label>
                  </div> 
                </div>

                <div className="form-note">
                  <div className="note">
                    <label>หมายเหตุ</label><br></br>
                    <textarea type="text" placeholder = "หมายเหตุ" value={adminCheck.notation} 
                    required={adminCheck.status===9 || adminCheck.status===0 ? true:false} 
                    onChange={(e) => setAdminCheck({...adminCheck , notation: e.target.value})}></textarea>
                  </div>
                </div>
              </div>
              <div className="footer1">
                <div className="confirm">
                  <button className="button-confirm green1" type ='submit' >บันทึก</button>
                  
                </div>
              </div>
            </form>       
        </div>        
      </div>
    </div> 
  )
}

export default ApplicantCheck;

//
