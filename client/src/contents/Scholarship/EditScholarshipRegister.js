/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App.js';
import Axios from 'axios';
import Swal from 'sweetalert2';

function EditScholarshipRegister() {
  const { FileForm , User,Content } = useContext(WebContext)
  const [user, setUser] = User;
  const [content, setContent] = Content;
  const [ fileForm , setFileForm]= FileForm;
  const [ form , setForm]= useState({
    formData:'',
    formName:''
  })
  const [scholar, setScholar] = useState({
    type:'',
    on_year:'',
    on_term:''
  });
  const [ appcant , setAppcant] = useState({
    id:'',
    user_id:'',
    scholarship_id:''
  })
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
   const [pdfFile, setPdfFile] = useState(null);

   const dataToBase64 =(index, e)=>{
    var file = e.target.files[0];
    if (file.size <= 1048576) { 
      let document = "";
      let reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = function () {
        document = reader.result;
        let datatest = fileForm
        datatest[index].url=document
        setFileForm(datatest)
        //changeData(name,document);
        console.log(document);
        console.log(fileForm)
        console.log(datatest);
      };
      reader.onerror = function(error){
        console.log('Error: ',error);
        //changeData(name,"#")
      };
    }else{
      e.target.value = ''
      Swal.fire('Limit file Size!', 'ไฟล์ต้องมีขนาดไม่เกิน 1Mb', 'warning')
    }   
  }

  const changeValue = (name,value) => {
    setProfile(profile=> ({
      ...profile,
      [name]:value
    }))
  }; 

  function onHandleSubmitBtn(e) {
    console.log(user.id);
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
        Axios.post("http://localhost:5000/editForm", {
          id         : localStorage.getItem('EditFormID_target'),
          profile_detail  : JSON.stringify(profile),
          status : 1,
          file            : JSON.stringify(fileForm),      
        }).then((response) => {
          if (response.data.errno) { // Check if Backend return error
            Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
            return;
          }
          setContent('Scholarship');
          Swal.fire('บันทึกแล้ว!','','success')
          console.log(response);
        });
      }
    })
  }

  // function getScholarshipForm() {
  //   Axios.post("http://localhost:5000/getScholarship", {
  //     id : localStorage.getItem('scholarshipRegisterID_target')
      
  //   }).then((response)=> {       
  //     var result =  response.data[0];
  //     console.log('get scholar', result)
  //     setFileForm(JSON.parse(result.file_requirement))
  //     setScholar({
  //       type:result.type,
  //       on_year:result.on_year,
  //       on_term:result.on_term
  //     })
  //   });
  // }
  function getScholarshipForm() {
    Axios.post("http://localhost:5000/getForm", {
      id : localStorage.getItem('EditFormID_target')
    }).then((response)=> {      
      if (response.data.errno) { // Check if Backend return error
        Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
        return;
      }
      var result =  response.data[0];
      console.log(result); 
      result.profile_detail = JSON.parse(result.profile_detail);
      setProfile(result.profile_detail); 
      result.file = JSON.parse(result.file);
      setFileForm(result.file);
      setAppcant({
        id: result.id,
        user_id : result.user_id,
        notation : result.notation
      });
    });
  }
  
  
  
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
              <h4>แก้ไขลงทะเบียนทุน</h4>
            </div>
          </div>
          <div className="right">
            <button className='button-add d-flex' onClick={ () => {setContent('Status')}}>
              <i className='bi bi-arrow-left sky'></i>
              <p>ย้อนกลับ</p>
            </button>
        </div>
        </div>
        <div className="contents"> 
          <div className="content3"> 
            <form className="form2" onSubmit={(e)=> {onHandleSubmitBtn(e);}}>
              <div className="name">
              <h5>แก้ไขลงทะเบียนทุน</h5>
              <h5>ประเภททุน : {scholar.type} ปีการศึกษา {scholar.on_year}</h5>
              <h5>**หมายเหตุ:{appcant.notation}**</h5>
              </div>
              <div>
                <label>ชื่อ-นามสกุล (ภาษาไทย)</label><br></br>
                <input placeholder="ชื่อภาษาไทย" value={profile.name} onChange={(e)=>changeValue("name",e.target.value)} required></input>
              </div>
              
              <div>
                <label>นิสิตชั้นปีที่</label><br></br>
                  <input 
                      value={parseInt(String(new Date().getFullYear() + 543).substring(2, 4)) - String(profile.std_id).substring(0,2)}
                      readOnly="readOnly"
                  />
              </div>
              <div> 
                <label>อายุ</label><br></br>
                <input 
                type="number" 
                min="0" 
                placeholder="อายุ" 
                value={Math.floor((new Date() - new Date(profile.birth_date).getTime()) / 3.15576e+10)}
                onChange={(e)=>changeValue("age",e.target.value)} required></input>
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
                <select value = {profile.fieldStudy} onChange={(e)=>changeValue("fieldStudy",e.target.value)} required>
                  <option value="0">เลือก</option>
                  <option value="ภาคปกติ">ภาคปกติ</option>
                  <option value="ภาคพิเศษ">ภาคพิเศษ</option>
                </select>
              </div>
              
              <div>
                <label>สาขา</label><br></br>
                <select  value = {profile.branch} onChange={(e)=>changeValue("branch",e.target.value)} required>
                  <option value="0">  เลือก       </option>
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
                <input   value = {profile.gpa} type="number" min="0" max = "4.00"  step="0.01" placeholder = "คะแนนเฉลี่ยสะสม(GPA)" onChange={(e)=>changeValue("gpa",e.target.value)} required></input>
              </div>
    
              <div>
                <label>ที่อยู่ปัจจุบัน(ที่ติดต่อได้สะดวก)</label><br></br>
                <input placeholder = "ที่อยู่ปัจจุบัน"  value = {profile.address} onChange={(e)=>changeValue("address",e.target.value)} required></input>
              </div>
              <div>
                <label>เบอร์โทรศัพท์</label><br></br>
                <input type="tel" placeholder = "เบอร์โทรศัพท์" value = {profile.tel} onChange={(e)=>changeValue("tel",e.target.value)} required></input>
              </div>
              
              <h5>ข้อมูลบิดา</h5>
              <div>
                <label>ชื่อ-นามสกุล(บิดา)</label><br></br>
                <input placeholder = "ชื่อภาษาไทย" value = {profile.name_father} onChange={(e)=>changeValue("name_father",e.target.value)} required></input>
              </div> 
              <div className="profile-fam d-flex">
                <div className="fam-edit fam1">
                  <label>อายุ</label><br></br>
                  <input className = "halfbar" type="number" min="0" placeholder="อายุ" value = {profile.age_father} onChange={(e)=>changeValue("age_father",e.target.value)} required></input>
                </div>

                <div className="fam-edit fam2">
                  <label>สถานะภาพ</label><br></br>
                  <select value = {profile.status_father} onChange={(e)=>changeValue("status_father",e.target.value)} required>
                    <option value="0">เลือก</option>
                    <option value="ยังมีชีวิตอยู่">ยังมีชีวิตอยู่</option>
                    <option value="ถึงแก่กรรม">ถึงแก่กรรม</option>
                  </select>
                </div>
              </div>

              <div className="profile-fam d-flex">
                <div className="fam-edit fam1">
                  <label>อาชีพ</label><br></br>
                  <input className = "halfbar" value = {profile.career_father} placeholder="ระบุอาชีพ"  onChange={(e)=>changeValue("career_father",e.target.value)} required></input>
                </div>
                <div className="fam-edit fam2">
                  <label>เบอร์โทรศัพท์</label><br></br>
                  <input className = "halfbar" type="tel" placeholder="ระบุเบอร์โทรศัพท์" value = {profile.tel_father} onChange={(e)=>changeValue("tel_father",e.target.value)} required></input>
                </div>
              </div>

              <div className="profile-fam d-flex">
                <div className="fam-edit fam1">
                  <label>รายได้ต่อเดือน</label><br></br>
                  <input className = "halfbar" type="number" min="0" placeholder="ระบุรายได้ต่อเดือน" value = {profile.income_father} onChange={(e)=>changeValue("income_father",e.target.value)} required></input>
                </div>
                <div className="fam-edit fam2">
                  <label>สถานที่ประกอบอาชีพ</label><br></br>
                  <input className = "halfbar" placeholder="สถานที่ประกอบอาชีพ" value = {profile.place_of_work_father} onChange={(e)=>changeValue("place_of_work_father",e.target.value)} required></input>
                </div>
              </div>
          
              <div>
                <label>ที่อยู่ของบิดา</label><br></br>
                <input placeholder="ที่อยู่ของบิดา" value = {profile.address_father} onChange={(e)=>changeValue("address_father",e.target.value)} required></input>
              </div>
          
              <h5>ข้อมูลมารดา</h5>
              <div>
                <label>ชื่อ-นามสกุล(มาราดา)</label><br></br>
                <input placeholder = "ชื่อภาษาไทย" value = {profile.name_mother} onChange={(e)=>changeValue("name_mother",e.target.value)} required></input>
              </div>
        
              <div className="profile-fam d-flex">
                <div className="fam-edit fam1">
                  <label>อายุ</label><br></br>
                  <input className = "halfbar" type="number" min="0" placeholder="อายุ" value = {profile.age_mother} onChange={(e)=>changeValue("age_mother",e.target.value)} required></input>
                </div>
                <div className="fam-edit fam2">
                  <label>สถานะภาพ</label><br></br>
                  <select value = {profile.status_mother} onChange={(e)=>changeValue("status_mother",e.target.value)} required>
                    <option value="0">เลือก</option>
                    <option value="ยังมีชีวิตอยู่">ยังมีชีวิตอยู่</option>
                    <option value="ถึงแก่กรรม">ถึงแก่กรรม</option>
                  </select>
                </div>
              </div>

              <div className="profile-fam d-flex">
                <div className="fam-edit fam1">
                  <label>อาชีพ</label><br></br>
                  <input className = "halfbar" placeholder="ระบุอาชีพ" value = {profile.career_mother} onChange={(e)=>changeValue("career_mother",e.target.value)} required></input>
                </div>
                <div className="fam-edit fam2">
                  <label>เบอร์โทรศัพท์</label><br></br>
                  <input className = "halfbar" type="tel" placeholder="ระบุเบอร์โทรศัพท์" value = {profile.tel_mother} onChange={(e)=>changeValue("tel_mother",e.target.value)} required></input>
                </div>
              </div>

              <div className="profile-fam d-flex">
                <div className="fam-edit fam1">
                  <label>รายได้ต่อเดือน</label><br></br>
                  <input className = "halfbar"  type="number" min="0" placeholder="ระบุรายได้ต่อเดือน" value = {profile.income_mother} onChange={(e)=>changeValue("income_mother",e.target.value)} required></input>
                </div>
                <div className="fam-edit fam2">
                  <label>สถานที่ประกอบอาชีพ</label><br></br>
                  <input className = "halfbar" placeholder="สถานที่ประกอบอาชีพ" value = {profile.place_of_work_mother} onChange={(e)=>changeValue("place_of_work_mother",e.target.value)} required></input>
                </div>
              </div>
          
              <div>
                <label>ที่อยู่ของมารดา</label><br></br>
                <input placeholder="ที่อยู่ของมารดา" value = {profile.address_mother} onChange={(e)=>changeValue("address_mother",e.target.value)} required></input>
              </div>

              <div>
              <label>สถานะสมรสบิดา-มารดา</label><br></br>
              <select value = {profile.status_marry} onChange={(e)=>changeValue("status_marry",e.target.value)}required>
                    <option value="0">เลือก</option>
                    <option value="แยกกันอยู่">แยกกันอยู่</option>
                    <option value="หย่าร้าง">หย่าร้าง</option>
                    <option value="อยู่ด้วยกัน">อยู่ด้วยกัน</option>
                </select>
              </div>
              
              <div className="topic-doc">
                <p>เอกสารที่นิสิตต้อง Upload</p>
              </div>
              {
              fileForm.map(
                (form, fidx) => (
                  <div>
                    <label>{form.title}.{form.format}</label><br></br>
                    <input 
                      key={fidx} 
                      type="file" 
                      onChange={(e)=>dataToBase64(fidx,e)} 
                    //  onChange={(file) => 
                    //   onHandleUpload(file)
                    // } 
                      accept={(form.format === 'PDF')?".pdf":(form.format === 'DOCX, DOC')?'.doc,.docx,application/msword':(form.format === "JPG, PNG")? '.image/jpeg,image/png,.image/jpg':""}
                      required
                    />
                  </div>
                ))
              }
              <div className="footer1">
                <div div className="confirm">
                  <button className="button-confirm green1" type ='submit' >บันทึก</button>
                </div>
              </div>
            </form>
          </div>

      </div>
    </div> 
  )
}

export default EditScholarshipRegister;

//
