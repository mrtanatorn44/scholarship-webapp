import React from "react";
import Login from "../components/Login.js"
import './LoginPage.css';
import ku_eng_src_logo from "../images/engsrc.png";
import ku_src_logo from "../images/ku.png";
import AnnouncementLogin from '../contents/AnnouncementLogin.js';

function LoginPage() {

  return (
    <body class="login">
      <div class="d-flex">

        {/*---------------------ANNOUNCEMENT----------------------*/}

        <div class="column-left d-flex flex-column">     
          <AnnouncementLogin/>
        </div>

        {/*---------------------LOGIN SIDE------------------------*/}

        <div class="column-right d-flex flex-column">
          
          {/*------------HEADER-------------*/}

          <div class="row-top ">
            <center>
              <p>
                ระบบขอทุน นิสิตวิศวกรรมศาสตร์
                <br></br>
                มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขต ศรีราชา
              </p>
            </center>
          </div>

          {/*----------LOGIN SECTION-----------*/}

          <center>
            <div class="row-center ">
              <img src={ku_eng_src_logo} class="ku_eng_src_logo" alt="eng src"/>
              <Login/>
              {/* FOR LATER
                <button onClick={show}>HWERE</button>
              */}
            </div>
          </center>
          
          {/*------------FOOTER-------------*/}

          <div class="row-bottom">
            <img src={ku_src_logo} class="ku_src_logo" alt="eng src"/>
            <p>คณะวิศวกรรมศาสตร์ ศรีราชา
            <br></br>
            มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา
            </p>
          </div>

        </div>
      </div>
    </body>
  );
}


export default LoginPage;

