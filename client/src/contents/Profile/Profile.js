/*eslint no-unused-vars:*/

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

  const getProfile = () =>{
    if (user.id === undefined) {
      console.log(user.id)
      return;
    }
    Axios.post("http://localhost:5000/getProfile",{
      id: user.id
    }).then((response) => {
      var data = response.data[0];
      //console.log('res', data)
      //console.log(data)
      if (data === undefined) {
        return;
      }
      var binaryImage   = ''; // ArrayBuffer to Base64
      var bytes         = new Uint8Array( data.picture_data.data );
      var len           = bytes.byteLength;
      for (var i = 0; i < len; i++) binaryImage += String.fromCharCode( bytes[ i ] );
      // setProfile
      var res   = JSON.parse(data.profile_data);
      res.image = "data:image/png;base64," + binaryImage;
      //console.log(res)
      setProfile(res)
    })
  }
  
 
  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return(
    <div className="frame">   
      <div className="contents" >
        <div className="profile">
          <div className="top">
            <form className="form">
              <div className="img-circle">
                { profile.image !== '' && <img src={profile.image} alt='profile'/>}
              </div>
              <div className="data">
                <div className="left "> 
                  <div className="name">
                    <label>ชื่อ-นามสกุล</label><br></br>
                    <input placeholder="ชื่อ-นามสกุล" defaultValue = {profile.name} readOnly="readOnly" ></input>
                  </div>
                  <div className="sector">
                    <label >ภาคการเรียนการสอน</label><br></br>
                    <input placeholder="ภาคปกติ" defaultValue = {profile.fieldStudy} readOnly="readOnly" ></input>
                  </div>
                </div>
                <div className="center">
                  <div className="code">
                    <label >รหัสนิสิต</label><br></br>
                    <input className="d-flex" type="number" placeholder="62XXXXX"  defaultValue = {profile.std_id} readOnly="readOnly" ></input>
                  </div>
                  <div className="branch">
                    <label >สาขา</label><br></br>
                    <input placeholder="" defaultValue = {profile.branch} readOnly="readOnly"></input>
                  </div>
                </div>
                <div className="right">
                  <div className="grade">
                    <label >นิสิตชั้นปีที่</label><br></br>
                    <input placeholder="5" defaultValue = {profile.yearofstudy} readOnly="readOnly" ></input>
                  </div>
                </div>
              </div>
            </form>
            <div>
              { profile.name === ''? 
              <div className=" button-profile">
                <button className="button-3 green1" onClick = {() => setContent('ProfileCreate')}>
                  <p>สร้างโปรไฟล์</p>
                </button>
              </div> :
                <div className="button-profile">
                  <button className="button-3 peach" onClick = {() => setContent('ProfileEdit')}>
                    <p>แก้ไขข้อมูล</p>
                  </button>
                </div>
              }
            </div>
          </div>
       
          <div className="bottom">
            <div className="dropdown">
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
