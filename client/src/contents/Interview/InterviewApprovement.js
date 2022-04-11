/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App.js';
import Axios from 'axios';
import Swal from 'sweetalert2';

function InterviewApprovement(props) {
  const { User,Content } = useContext(WebContext)
  const [user, setUser] = User;
  const [content, setContent] = Content;
  const [textalert,setTextalert]=useState('')
  const [scholarshipID, setScholarshipID] = useState('');
  const [rateForm, setRateForm] = useState([]);
  const [ approvement,setApprovement] = useState();
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
  const [adminCheck,setAdminCheck] =useState([{
    label: "",
    rate            : "" ,
  }])
  const[rate, setRate] = useState([{}]);
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
      if (response.data.errno) { // Check if Backend return error
        Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
        return;
      }    
      var result =  response.data[0];
      //console.log(result); 
      result.profile_detail = JSON.parse(result.profile_detail);
      setProfile(result.profile_detail); 
      result.file = JSON.parse(result.file);
      setFileForm(result.file);
      setRate(JSON.parse(result.rate))
      setIDAppcant({
        id: result.id,
        user_id : result.user_id
      });
      Axios.post("http://localhost:5000/getScholarship", {
      id : result.scholarship_id
    }).then((response)=> {
      if (response.data.errno) { // Check if Backend return error
        Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
        return;
      }       
      var result =  response.data[0];
      //console.log(result);
      setRateForm(JSON.parse(result.interview_requirement)); 
    });
    });
  }
  //console.log(rate);
  

  function onHandleSubmitBtn(e,textalert) {
    e.preventDefault();
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: textalert,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#03A96B',
      confirmButtonText: 'Save',
      cancelButtonColor: '#A62639',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post("http://localhost:5000/editRateForm", {
          id : idAppcant.id,
          status  : approvement,
          rate : JSON.stringify(rateForm)
        }).then((response) => {
          if (response.data.errno) { // Check if Backend return error
            Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
            return;
          }
          setContent('IntervieweeList');
          Swal.fire('บันทึกแล้ว!','','success')
          //console.log(response);
        });
      }
    })
  }

  function setType(e){
    if(e === 'score100'){
      return '100';
    }else if(e === 'score10'){
      return "10";
    }else if(e === 'state'){
      return "ผ่าน-ไม่ผ่าน";
    }
  }

  
  useEffect(()=>{
    getScholarshipForm();

  },[]);

  return (
    <div className="frame">

      <div className="header">
        <div className="left">
          <div className="icons">
              <i className="bi bi-three-dots"></i>
          </div>
          <div className="topic">
            <h4>การอนุมัติผู้ลงทะเบียน</h4>
          </div>
        </div>
        <div className="right"/>
          <button className='button-add d-flex' onClick={ () => {setContent('IntervieweeList')}}>
              <i className='bi bi-arrow-left-circle'></i>
              <p>ย้อนกลับ</p>
          </button>
      </div>

      <div className="contents"> 

        <div className="content3"> 
          <form className="form2" onSubmit={(e) => onHandleSubmitBtn(e,textalert)}>
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
              <input value={parseInt(String(new Date().getFullYear() + 543).substring(2, 4)) - String(profile.std_id).substring(0,2)} readOnly="readOnly" />
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
              <input value={profile.fieldStudy} readOnly="readOnly"/>
            </div>
            
            <div>
              <label>สาขา</label><br></br>
              <input value={profile.branch} readOnly="readOnly" />
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
                <input value = {profile.status_father} readOnly="readOnly" />
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
                <input value = {profile.status_mother} readOnly="readOnly" />
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
            <input value = {profile.status_marry} readOnly="readOnly"/> 
     
            </div>

            <div class="topic-doc">
              <h5>เอกสารที่นิสิตUpload</h5>
            </div>
                {
                   fileForm.map((form,fidx)=>(
                    <div className='upload'>
                      <label>{form.title}.{form.format}</label><br></br>
                      {
                        form.format === "DOCX, DOC" &&
                        <center>
                          <a 
                            className='button-big green1 w100 mgb1'
                            download={profile.std_id + '_' + form.title}
                            href={form.url}                           
                          >
                            Download
                          </a>
                        </center>
        
                      }
                      {
                        form.format === 'PDF' &&
                        <iframe className='w100 mgl0' src={form.url}></iframe>
                      }
                      {
                        form.format === 'JPG, PNG' && 
                        <center>
                        <img src={form.url}></img></center>
                      }
                    </div>))
                }
                
              <br></br>
              <div class="topic-doc">
                <h5>คะแนน</h5>
              </div>
              {
                 rate.map((item,fidx1)=>(
                   
                  <div className="form3" key={fidx1}>
                        <div className="rate1">
                          <p>หัวข้อคะแนน : {item.title} น้ำหนักคะแนน : {item.weight} (คะแนนเต็ม : {setType(item.type)}) </p>
                          {
                            item.type==='score100' &&
                            <input 
                                required 
                                type="number"
                                min="0" 
                                max="100"   
                                readOnly="readOnly" 
                                value = {item.score}
                            />
                          }
                          
                          {
                            item.type==='score10' &&
                            <input 
                              required
                              type="number"
                              min="0"
                              max="10" 
                              readOnly="readOnly"
                              value = {item.score}
                            />
                          }
                          {
                          item.type==='state' &&
                          <>
                            {/* <div className="check">
                              <div className="true">
                                <label  value = {item.score}>ผ่าน</label>
                              </div>
                              <div className="false">
                                <label for="check1">ไม่ผ่าน</label>
                              </div>
                            </div> */}
                            <input value={item.score} />
                          </>
                          }
                        </div>
                  </div>
                 ))
              }
              <div className="footer1">
                <div className="confirm">
                    <button className="button-confirm red1" type ='submit' onClick={()=>{setApprovement(0);setTextalert("ที่จะไม่อนุมัติ");}}>ไม่อนุมัติทุน</button>
                </div>
                <div className="confirm">
                  <button className="button-confirm green1" type ='submit' onClick={()=>{setApprovement(4);setTextalert("ที่จะอนุมัติ");}}>อนุมัติทุน</button>
                </div>  
              </div>
          </form>       
        </div>        
      </div>
    </div> 
  )
}

export default InterviewApprovement;







