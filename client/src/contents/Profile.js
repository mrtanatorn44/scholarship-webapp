import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../App';
import Axios from 'axios';

function Profile(props) {

  const { Content } = useContext(WebContext)
  const [content, setContent] = Content;

  const { User } = useContext(WebContext);
  const [user, setUser] = User;

  const[profile,setProfile]=useState({
    fname:"",
    age:"",
    std_id:"",
    address:"",
    tel:"",
    yearofstudy:"",
    fieldStudy:""
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
  
  function Check(){
      if(user.id != null){
        return(
          <button onClick = {() => setContent('ProfileCreate')}>
              <p>createProfile</p>
          </button>
        )
      }
      else{
        return(
          <button onClick = {() => setContent('ProfileEdit')}>
              <p>แก้ไขข้อมูล</p>
          </button>
        )

      }
  }
  useEffect(()=>{
    getProfile();
  },[]);
  return(
    <div className="frame-content">   
            <button onClick = {() => alert(user.id)}>
              <p>ปุ่มโง่ๆ</p>
          </button> 
      <div className="profile-row-top">
          <form className="profile-form d-flex ">
            <div className="profile-img">
              <img src="https://i.pinimg.com/564x/e6/c9/78/e6c9783ef31e29427d42939766031372.jpg"/>
              <p>สภาพเป็นแฟนกัน</p>
            </div>
            <div className="profile-data d-flex">
              <div className="profile-column-left "> 
                <div className="profile-name">
                  <label>ชื่อ-นามสกุล</label><br></br>
                  <input placeholder="ภวัตกะนะโนน" value = {profile.fname} required></input> 
                </div>
                <div className="profile-sector">
                  <label >ภาคการเรียนการสอน</label><br></br>
                  <input placeholder="ภาคปกติ" required></input>
                </div>
              </div>
              <div className="profile-column-center">
                <div className="profile-code">
                  <label >รหัสนิสิต</label><br></br>
                  <input className="d-flex" placeholder="62XXXXX" required></input>
                </div>
                <div className="profile-branch">
                  <label >สาขา</label><br></br>
                  <input placeholder="GMMTV" required></input>
                </div>
              </div>
              <div className="profile-column-right">
                <div className="profile-grade">
                  <label >นิสิตชั้นปีที่</label><br></br>
                  <input placeholder="5" required></input>
                </div>
              </div>
            </div>
          </form>
          
          <div className="botton-edit">
            <Check/>
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
