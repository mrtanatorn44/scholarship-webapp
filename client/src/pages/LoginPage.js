import React from "react";
import Login from "../components/Login.js"
import ku_eng_src_logo from "../images/engsrc.png";
import ku_src_logo from "../images/ku.png";
import AnnouncementLogin from '../contents/AnnouncementLogin.js';

function LoginPage() {
  
  return (
    <div className="login-page">
      {/* ----- Announcement ----- */}
      <div className="column-left">     
        <AnnouncementLogin/>
      </div>

      {/*---------------------LOGIN SIDE------------------------*/}
      <div className="column-right">
        
        {/*------------HEADER-------------*/}
        <div className="row-top ">
          <center>
            <p>ระบบขอทุน นิสิตวิศวกรรมศาสตร์<br/>มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขต ศรีราชา</p>
          </center>
        </div>

        {/*----------LOGIN SECTION-----------*/}
        <div className="row-center">
          <img src={ku_eng_src_logo} className="ku_eng_src_logo" alt="eng src"/>
          <Login/>
        </div>
        
        {/*------------FOOTER-------------*/}
        <div className="row-bottom">
          <img src={ku_src_logo} className="ku_src_logo" alt="eng src"/>
          <p>คณะวิศวกรรมศาสตร์ ศรีราชา<br/>มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;