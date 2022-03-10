import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App';
import Axios from 'axios';

function Profile() {

  const { User, Content } = useContext(WebContext)
  const [content, setContent] = Content;
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
  
  console.log(user);
  console.log(profile);

  const getProfile = () =>{
    console.log(user.id)
    if (user.id === undefined) {
      console.log(user.id)
      return;
    }
    Axios.post("http://localhost:5000/getProfile",{
      id: user.id
    }).then((response) => {
      var data = response.data[0];
      console.log('res', data)

      var binaryImage   = ''; // ArrayBuffer to Base64
      var bytes         = new Uint8Array( data.picture_data.data );
      var len           = bytes.byteLength;
      for (var i = 0; i < len; i++) binaryImage += String.fromCharCode( bytes[ i ] );
      // setProfile
      var res   = JSON.parse(data.profile_data);
      res.image = "data:image/png;base64," + binaryImage;
      setProfile(res)
    })
  }
 
  useEffect(() => {
    getProfile();
  }, [])
  
  return(
    <div className="frame">   
      <div className="contents" >
        <div className="content6">
          <div className="profile-row-top">
            <form className="profile-form d-flex ">
              <div className="profile-img">
                <img src={profile.image} alt='profile'/>
              </div>
              <div className="profile-data d-flex">
                <div className="profile-column-left "> 
                  <div className="profile-name">
                    <label>ชื่อ-นามสกุล</label><br></br>
                    <input placeholder="ชื่อ-นามสกุล" defaultValue = {profile.name} readOnly="readOnly" ></input>
                  </div>
                  <div className="profile-sector">
                    <label >ภาคการเรียนการสอน</label><br></br>
                    <input placeholder="ภาคปกติ" defaultValue = {profile.fieldStudy} readOnly="readOnly" ></input>
                  </div>
                </div>
                <div className="profile-column-center">
                  <div className="profile-code">
                    <label >รหัสนิสิต</label><br></br>
                    <input className="d-flex" type="number" placeholder="62XXXXX"  defaultValue = {profile.std_id} readOnly="readOnly" ></input>
                  </div>
                  <div className="profile-branch">
                    <label >สาขา</label><br></br>
                    <input placeholder="" defaultValue = {profile.branch} readOnly="readOnly"></input>
                  </div>
                </div>
                <div className="profile-column-right">
                  <div className="profile-grade">
                    <label >นิสิตชั้นปีที่</label><br></br>
                    <input placeholder="5" defaultValue = {profile.yearofstudy} readOnly="readOnly" ></input>
                  </div>
                </div>
              </div>
            </form>
            <div className="botton-edit">
              { profile.name === ''? 
              <div className="botton-edit1">
                <button onClick = {() => setContent('ProfileCreate')}>
                  <p>สร้างโปรไฟล์</p>
                </button>
              </div> :
                <div className="botton-edit2">
                  <button onClick = {() => setContent('ProfileEdit')}>
                    <p>แก้ไขข้อมูล</p>
                  </button>
                </div>
              }
            </div>
          </div>
          <div className="profile-row-bottom">
            <div className="drop-scholaship">
              <label>ประเภทของทุน</label>
              <br></br>
              <select>
                <option defaultValue="study">ทุนเรียนดี</option>
                <option defaultValue="activity">ทุนกิจกรรมเด่น</option>
                <option defaultValue="property">ทุนขาดคุณทรัพย์</option>
                <option defaultValue="other">ทุนอื่นๆ</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
