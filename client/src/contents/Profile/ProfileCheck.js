/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App.js';
import Axios from 'axios';

function ProfileCheck(props) {
  const { Content  } = useContext(WebContext)
  const [content, setContent] = Content;
  
  return(
    <div className="frame">
      <div className="contents">
        <div className="profile">   
          <div className="top">
            <form className="form">
              <div className="img-circle">
                <img src="https://i.pinimg.com/564x/e6/c9/78/e6c9783ef31e29427d42939766031372.jpg" alt='profile'/>
                <p>สภาพเป็นแฟนกัน</p>
              </div>
              <div className="data">
                <div className="left"> 
                  <div className="name">
                    <label>ชื่อ - นามสกุล(ภาษาไทย)</label><br></br>
                    <input placeholder="" required></input> 
                  </div>
                  <div className="profile-sector">
                    <label >ภาคการเรียนการสอน</label><br></br>
                    <input placeholder="" required></input>
                  </div>
                </div>
                <div className="center">
                  <div className="code">
                    <label >รหัสนิสิต</label><br></br>
                    <input className="d-flex" placeholder="" required></input>
                  </div>
                  <div className="branch">
                    <label >สาขา</label><br></br>
                    <input placeholder="" required></input>
                  </div>
                </div>
                <div className="right">
                  <div className="grade">
                    <label >นิสิตชั้นปีที่</label><br></br>
                    <input placeholder="" required/>
                  </div>
                </div>
              </div>
            </form>
            <div>
              <div className="button-profile">
                <button className="button-3 red3" onClick = {() => setContent('FormProfile')}>
                   <p>ดูข้อมูล</p>
                </button>
              </div>             
            </div>
            
          </div>

          <div className="bottom">
            <div className="dropdown">
              <label>ประเภทของทุน</label><br></br>
              <select>
                <option value="study">    ทุนเรียนดี       </option>
                <option value="activity"> ทุนกิจกรรมเด่น   </option>
                <option value="property"> ทุนขาดคุณทรัพย์ </option>
                <option value="other">    ทุนอื่นๆ         </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCheck;
