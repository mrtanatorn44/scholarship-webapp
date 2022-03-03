import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../App';
import Axios from 'axios';

function Profile() {

  const { Content } = useContext(WebContext)
  const [content, setContent] = Content;

  const { User } = useContext(WebContext);
  const [user, setUser] = User;

  const [profile, setProfile] = useState({
    name:"",
    age:"",
    std_id:"",
    address:"",
    branch:"",
    yearofstudy:"",
    fieldStudy:"",
    image:""
  })
  
  const getProfile = () =>{
    Axios.post("http://localhost:5000/getProfile",{
      user_id:user.id
    }).then((response) => {
      console.log(response)
      var binaryImage   = ''; // ArrayBuffer to Base64
      var bytes         = new Uint8Array( response.data[0].picture.data );
      var len           = bytes.byteLength;
      for (var i = 0; i < len; i++) binaryImage += String.fromCharCode( bytes[ i ] );
      // setProfile
      var res   = JSON.parse(response.data[0].file_path);
      res.image = "data:image/png;base64," + binaryImage;
      setProfile(res)
    })
  }
  useEffect(() => {
    getProfile();
  }, [])
  
  return(
    <div className="frame">   
      <div className="profile-row-top">
          <form className="profile-form d-flex ">
            <div className="profile-img">
              <img src={profile.image}/>
            </div>
            <div className="profile-data d-flex">
              <div className="profile-column-left "> 
                <div className="profile-name">
                  <label>ชื่อ-นามสกุล</label><br></br>
                  <input placeholder="ภวัตกะนะโนน" value = {profile.name} required></input>
                </div>
                <div className="profile-sector">
                  <label >ภาคการเรียนการสอน</label><br></br>
                  <input placeholder="ภาคปกติ" value = {profile.fieldStudy} required></input>
                </div>
              </div>
              <div className="profile-column-center">
                <div className="profile-code">
                  <label >รหัสนิสิต</label><br></br>
                  <input className="d-flex" type="number" placeholder="62XXXXX"  value = {profile.std_id} required></input>
                </div>
                <div className="profile-branch">
                  <label >สาขา</label><br></br>
                  <input placeholder="GMMTV" value = {profile.branch} required></input>
                </div>
              </div>
              <div className="profile-column-right">
                <div className="profile-grade">
                  <label >นิสิตชั้นปีที่</label><br></br>
                  <input placeholder="5" value = {profile.yearofstudy} required></input>
                </div>
              </div>
            </div>
          </form>
          
          <div className="botton-edit">
            { profile.name === ''? 
              <button onClick = {() => setContent('ProfileCreate')}>
                <p>สร้างโปรไฟล์</p>
              </button>:
              <button onClick = {() => setContent('ProfileEdit')}>
                <p>แก้ไขข้อมูล</p>
              </button>
            }
          </div>
          
        
      </div>
      <div className="profile-row-bottom">
        <div className="drop-scholaship">
          <label>ประเภทของทุน</label>
          <br></br>
          <select>
            <option value="study">ทุนเรียนดี</option>
            <option value="activity">ทุนกิจกรรมเด่น</option>
            <option value="property">ทุนขาดคุณทรัพย์</option>
            <option value="other">ทุนอื่นๆ</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Profile;
