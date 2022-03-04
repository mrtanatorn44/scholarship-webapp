import React, { useContext, useState, useEffect } from 'react';
import ConfirmModal from '../../modals/ConfirmModal.js';
import { WebContext } from '../../App.js';
import Axios from 'axios';
/* eslint-disable */

function ProfileEdit() {
  const { User } = useContext(WebContext);
  const { Content } = useContext(WebContext);
  const [user, setUser] = User;
  const [content, setContent] = Content;
  const [form, setForm] = useState({ oldImage: '', newImage: '', imageName: '' })

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
    status_marry:"",
    image:""
   })
  const getProfile = () => {

    Axios.post("http://localhost:5000/getProfile",{
      id:user.id
    })
    .then((response) =>{
      console.log(response.data[0])
      var binaryImage   = ''; // ArrayBuffer to Base64
      var bytes         = new Uint8Array( response.data[0].picture_data.data );
      var len           = bytes.byteLength;
      for (var i = 0; i < len; i++) binaryImage += String.fromCharCode( bytes[ i ] );
      var res = JSON.parse(response.data[0].profile_data);
      setForm({...form, oldImage: binaryImage, imageSrc: "data:image/png;base64," + binaryImage});
      setProfile(res)
    })
  }
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
    console.log('file: ', file.name)

    var arrayBuffer;
    var reader = new FileReader();
    reader.onload = async function() {
      arrayBuffer = await new Uint8Array(reader.result);
      var res = reader.result;
      var binImage = _arrayBufferToBase64(arrayBuffer);
      console.log('binImage: ', binImage)

      setForm({...form,
        newImage  :  binImage,
        imageName : file.name
      })
    }
    reader.readAsArrayBuffer(file); 
  }
  
  const changeValue = (name, value) => {
    setProfile({
      ...profile,
      [name]:value
    })
    console.log(profile)
  }; 

  function getConfirm(data) {
    //console.log('form', form.newImage)
    if (data) {
      Axios.post("http://localhost:5000/editProfile",{
        id            : user.id,
        profile_data  : JSON.stringify(profile),
        picture_data  : form.newImage===''? form.oldImage:form.newImage,
        picture_name  : form.imageName 
      }).then((response) => {
        console.log('after axios edit profile', response)
        setContent('Profile')
      });
    } else {
      setShowModal(false)
    }
    //console.log("sdasdasdasd");
    
  }
  
  useEffect(()=>{
    getProfile();
  },[]);

  const onFormSumbit = (event) => {
    event.preventDefault();
    setShowModal(true);
  }

  return (
    <div className="frame">
      <div className="header" >
      <div className="left ">
        <div className="icons">
          <i className="bi bi-list-ul"/>
        </div>
        <div className="topic">
          <h4>แก้ไขโปรไฟล์</h4>
        </div>
        </div>
        <div className="right">
      </div>
      </div>
      <div className="content3">
        
        <form className="profileEdit-form" onSubmit={(e)=> {onFormSumbit(e);}}>  
          <div className="name">
            <h5>แก้ไขข้อมูลส่วนตัว</h5>
          </div>


          <div>
          <label>ชื่อ-นามสกุล</label><br></br>
            <input placeholder="ชื่อภาษาไทย" value = {profile.name} onChange={(e)=>changeValue("name",e.target.value)} required />
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
            <input type="number" min="0" placeholder="อายุ" value = {profile.age} onChange={(e)=>changeValue("age",e.target.value)}  required/>
          </div>
          
          <div>
            <label>รหัสนิสิต</label><br></br>
            <input type="number" min="0" placeholder="รหัสนิสิต" value = {profile.std_id} onChange={(e)=>changeValue("std_id",e.target.value)} required/>
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
                <option value="คอมพิวเตอร์">  คอมพิวเตอร์  </option>
                <option value="ไฟฟ้า">  ไฟฟ้า      </option>
                <option value="เครื่องกล">  เครื่องกล    </option>
                <option value="หุ่นยนต์">  หุ่นยนต์     </option>
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
          <div>
            <label>อัพโหลดรูปโปรไฟล์</label><br></br>
            <input type="file" name="myfile" onChange={(file) => onHandleUpload(file)}/>
          </div>
          {/*<div>
            <h5>ประวัติครอบครัว</h5>
          </div>
          <div>
            <label>ชื่อ-นามสกุล(บิดา)</label><br></br>
            <input placeholder="ชื่อภาษาไทย" value = {profile.name_father} onChange={(e)=>changeValue("name_father",e.target.value)} required/>
          </div>
          <div className="profile-fam d-flex">
            <div className="fam1-edit">
              <label>อายุ</label><br></br>
              <input className = "halfbar" type="number" min="0" placeholder="อายุ" value = {profile.age_father} onChange={(e)=>changeValue("age_father",e.target.value)} required/>
            </div>
            <div className="fam2-edit">
              <label>สถานะภาพ</label>
              <select className="form-select form-select-lg mb-3" value = {profile.status_father} onChange={(e)=>changeValue("status_father",e.target.value)} required>
                <option value="0">เลือก</option>
                <option value="ยังมีชีวิตอยู่">ยังมีชีวิตอยู่</option>
                <option value="ถึงแก่กรรม">ถึงแก่กรรม</option>
              </select>
            </div>
          </div>
          
          <div className="profile-fam d-flex">
            <div className="fam1-edit">
              <label>อาชีพ</label><br></br>
              <input className = "halfbar" placeholder="ระบุอาชีพ" value = {profile.career_father} onChange={(e)=>changeValue("career_father",e.target.value)} required/>
            </div>
            <div className="fam2-edit">
              <label>เบอร์โทรศัพท์</label><br></br>
              <input className = "halfbar" type="tel"  placeholder="ระบุเบอร์โทรศัพท์" value = {profile.tel_father} onChange={(e)=>changeValue("tel_father",e.target.value)} required/>
            </div>
          </div>
       
          <div className="profile-fam d-flex">
            <div className="fam1-edit">
              <label>รายได้ต่อเดือน</label><br></br>
              <input className = "halfbar" type="number" min="0" placeholder="ระบุรายได้ต่อเดือน" value = {profile.income_father} onChange={(e)=>changeValue("income_father",e.target.value)} required/>
            </div>
            <div className="fam2-edit">
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
          <div className="profile-fam d-flex">
            <div className="fam1-edit">
              <label>อายุ</label><br></br>
              <input className="halfbar" type="number" min="0" placeholder="อายุ" value = {profile.age_mother} onChange={(e)=>changeValue("age_mother",e.target.value)}  required/>
            </div>
            <div className="fam2-edit">
              <label>สถานะภาพ</label>
              <select className="form-select form-select-lg mb-3" value = {profile.status_mother} onChange={(e)=>changeValue("status_mother",e.target.value)}  required>
                <option value="0">เลือก</option>
                <option value="ยังมีชีวิตอยู่">ยังมีชีวิตอยู่</option>
                <option value="ถึงแก่กรรม">ถึงแก่กรรม</option>
              </select>
            </div>
          </div>

          <div className="profile-fam d-flex">
            <div className="fam1-edit">
              <label>อาชีพ</label><br></br>
              <input className = "halfbar" placeholder="ระบุอาชีพ" value = {profile.career_mother} onChange={(e)=>changeValue("career_mother",e.target.value)} required/>
            </div>
            <div className="fam2-edit">
              <label>เบอร์โทรศัพท์</label><br></br>
              <input className = "halfbar" type="tel"  placeholder="ระบุเบอร์โทรศัพท์" value = {profile.tel_mother} onChange={(e)=>changeValue("tel_mother",e.target.value)} required/>
            </div>
          </div>

          <div className="profile-fam d-flex">
            <div className="fam1-edit">
              <label>รายได้ต่อเดือน</label><br></br>
              <input className = "halfbar" type="number" min="0" placeholder="ระบุรายได้ต่อเดือน" value = {profile.income_mother} onChange={(e)=>changeValue("income_mother",e.target.value)} required/>
            </div>
            <div className="fam2-edit">
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
          
          <div className="profileCre-footer">
            <div className="btn-confirm-profile">
            <button className="btn-confirm" >บันทึก</button>
            </div>
          </div>
        </form>
        
        {showModal && <ConfirmModal sendConfirm={getConfirm}/>}
   
      </div>
      
    </div>
  ) 
}

export default ProfileEdit;
