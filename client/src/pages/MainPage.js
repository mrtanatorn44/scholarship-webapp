import { React, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Login from "../components/Login.js"
import Axios from 'axios';

// STUDENT
import StudentAnnouncement          from '../contents/student/Announcement.js';
import StudentScholarshipList       from '../contents/student/ScholarshipList.js';
import StudentScholarshipStatus     from '../contents/student/ScholarshipStatus.js';
import StudentProfile               from '../contents/student/Profile.js';

// STUDENT SUB-COMPONENT
import StudentScholarshipListRegister               from '../sub-contents/student/ScholarshipListRegister.js';
import StudentScholarshipEdit              from '../sub-contents/student/ScholarshipEdit.js';
import StudentProfileEdit              from '../sub-contents/student/ProfileEdit.js';
import StudentProfileCreate              from '../sub-contents/student/ProfileCreate.js';
// STUDENT MODAL
import StudentInterviewSchedule               from '../modal/InterviewSchedule.js';

// INTERVIEWER
import InterviewerAnnouncement      from '../contents/interviewer/Announcement.js';
import InterviewerScholarshipList   from '../contents/interviewer/ScholarshipList.js';
import InterviewerInterview         from '../contents/interviewer/Interview.js';
// INTERVIEWER SUB-COMPONENT
import InterviewerProfile        from '../sub-contents/interviewer/Profile.js';
import InterviewerScholarshipCheckForm        from '../sub-contents/interviewer/ScholarshipCheckForm.js';
import InterviewerInterviewRate        from '../sub-contents/interviewer/InterviewRate.js';
// INTERVIEWER MODAL
import InterviewerInterviewSchedule       from '../modal/InterviewSchedule.js';

// ADMIN COMPONENT
import AdminAnnouncement            from '../contents/admin/Announcement.js';
import AdminScholarshipList         from '../contents/admin/ScholarshipList.js';
import AdminReport                  from '../contents/admin/Report.js';
import AdminScholarshipCheck        from '../contents/admin/ScholarshipCheck.js';
import AdminRoleSetting             from '../contents/admin/RoleSetting.js';
import AdminInterview               from '../contents/admin/Interview.js';
// ADMIN SUB-COMPONENT
import AdminAnnouncementCreate      from '../sub-contents/admin/AnnouncementCreate.js';
import AdminAnnouncementEdit        from '../sub-contents/admin/AnnouncementEdit.js';
import AdminScholarshipListCreate   from '../sub-contents/admin/ScholarshipListCreate.js';
import AdminScholarshipListEdit     from '../sub-contents/admin/ScholarshipListEdit.js';
import AdminReportInspect           from '../sub-contents/admin/ReportInspect.js';
import AdminScholarshipCheckForm    from '../sub-contents/admin/ScholarshipCheckForm.js';
import AdminProfile                 from '../sub-contents/admin/Profile.js';
import AdminInterviewRate           from '../sub-contents/admin/InterviewRate.js';
import AdminInterviewSchedule       from '../sub-contents/admin/InterviewSchedule.js';
import AdminInterviewScheduleCreate from '../sub-contents/admin/InterviewScheduleCreate.js';
import AdminInterviewScheduleEdit   from '../sub-contents/admin/InterviewScheduleEdit.js';
// ADMIN MODAL
import AdminConfirmModal   from '../modal/ConfirmModal.js';




import './MainPage.css';

import ku_eng_src_logo    from "../images/engsrc.png";
import ku_src_logo        from "../images/ku.png";



function MainPage() {
  
  const navigate = useNavigate();

  const [content, setContent] = useState("Announcement");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    imgUrl: ku_eng_src_logo,
    email : 'before using.',
    name  : 'Please Log-in',
    fname : '',
    lname : '',
    role  : ''
  });

  // Check is Login ?
  useEffect(() => {

    var isSignedIn;
    var currentUser;

    async function fetchGoogleAuth() {
      if (window.gapi) {
        // LOAD authenticate
        await window.gapi.load('auth2', function() {
          // INIT authenticate
          window.gapi.auth2.init({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID
          }).then( 
            // LISTEN authenticate
            async function() {
              await window.gapi.auth2.getAuthInstance().isSignedIn.listen(fetchLogin);
              // FETCH isSignedIn & currentUser
              fetchLogin(window.gapi.auth2.getAuthInstance().isSignedIn.get(),
                        window.gapi.auth2.getAuthInstance().currentUser.get());
              function fetchLogin(authIsSignedIn, authCurrentUser) {
                isSignedIn = authIsSignedIn;
                currentUser = authCurrentUser;
              }
              // ASSIGN value to userState
              if (isSignedIn && !isLoggedIn) {
                const lName = currentUser.profileObj.familyName.charAt(0).toUpperCase() + 
                              currentUser.profileObj.familyName.slice(1).toLowerCase();
                setUser({
                  ...user,
                  imgUrl: currentUser.profileObj.imageUrl,
                  email : currentUser.profileObj.email,
                  name  : currentUser.profileObj.givenName + ' ' + lName,
                  fname : currentUser.profileObj.givenName,
                  lname : lName
                });
                setIsLoggedIn(true);
              } else if (!isLoggedIn) { 
                alert('Some thing went wrong, please re-login.')
              }
            }
          );
        });
      } else {
        alert('Google API is not working, please contact admin.')
      }
    }
    fetchGoogleAuth();
  }, [])

  // Check user with DB after isLoggedIn
  useEffect(() => {
    if (isLoggedIn === false) {
      return;
    }

    // GET user from DB by email from G-API
    Axios.post("http://localhost:5000/getUser", {
      email : user.email
    }).then(
      (response) => {
        if (response.data.length !== 0) {
          const data = response.data[0];
          const dbRole = data.role;
          setUser({
            ...user,
            role  : dbRole
          })
          setContent(dbRole.charAt(0).toUpperCase() + dbRole.slice(1) + 'Announcement');
          alert('Welcome back, ' + dbRole + ' - ' + user.name);
        } else {
          setUser({
            ...user,
            role  : 'student'
          })
          Axios.put("http://localhost:5000/addUser", {
            email : user.email, 
            fname : user.fname, 
            lname : user.lname, 
            role  : 'student'
          }).then(
            (response) => {
              setContent('StudentAnnouncement')
              alert('Welcome for the first time.')
            }
          );
        }
      }
    );
  }, [isLoggedIn])

  // GET PROPS DATA FROM METHOD
  function getContent(data) {
    contentPermission(data[0],data[1]);
  }
  
  // CHECK PERMISSION BEFORE RENDER CONTENT
  function contentPermission(targetRole, targetContent) {
    Axios.post("http://localhost:5000/getUser", {
      email : user.email
    }).then(
      (response) => {
        if (response.data.length !== 0) {
          const data = response.data[0];
          if (data.role === targetRole || data.role === 'admin') {
            setContent(targetContent);
          } else {
            alert('You dont have permission [' + data.role + ']\n[' +
              targetContent + '] required => [' + targetRole + ']');
          }
        }
      }
    );
  }
  // RENDER CONTENT
  function contentRender() {
    switch (content) {
      /*---------- STUDENT ----------*/
      case 'StudentAnnouncement':
        return  <StudentAnnouncement/>
      case 'StudentScholarshipList':
        return <StudentScholarshipList sendContent={getContent}/>
      case 'StudentScholarshipStatus':
        return <StudentScholarshipStatus/>
      case 'StudentProfile':
        return <StudentProfile sendContent={getContent}/>
      /*---------- STUDENT SUB-CONTENT --------*/
      case 'StudentScholarshipListRegister':
        return <StudentScholarshipListRegister/>
      case 'StudentProfileCreate':
        return <StudentProfileCreate/>

      /*---------- INTERVIEWER ----------*/
      case 'InterviewerAnnouncement':
        return <InterviewerAnnouncement/>
      case 'InterviewerScholarshipList':
        return <InterviewerScholarshipList/>
      case 'InterviewerInterview':
        return <InterviewerInterview/>
      /*---------- ADMIN CONTENT ----------*/
      case 'AdminAnnouncement' :
        return <AdminAnnouncement sendContent={getContent} />
      case 'AdminScholarshipList' :
        return <AdminScholarshipList sendContent={getContent} />
      case 'AdminReport' :
        return <AdminReport/>
      case 'AdminScholarshipCheck' :
        return <AdminScholarshipCheck/>
      case 'AdminRoleSetting' :
        return <AdminRoleSetting/>
      case 'AdminInterview' :
        return <AdminInterview/>
      /*---------- ADMIN SUB-CONTENT ----------*/
      case 'AdminAnnouncementCreate':
        return <AdminAnnouncementCreate sendContent={getContent}/>
      case 'AdminScholarshipListCreate':
        return <AdminScholarshipListCreate sendContent={getContent}/>

        
    }
  }
  // RENDER BUTTON TO CONTROL CONTENT
  function contentButtonRender() {
    if (isLoggedIn) {
      /*---------- STUDENT ----------*/
      if (user.role === 'student') {
        return (
          <ul className="navs-link">
            <li className="d-flex" 
              style={{
                background: 
                  (content==='StudentAnnouncement')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('student','StudentAnnouncement')}
            >
              <i className="bi bi-megaphone"></i>
              <p>ประกาศข่าวสาร</p>
            </li>

            <li className="current d-flex"
              style={{
                background: 
                  (content==='StudentScholarshipList')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('student','StudentScholarshipList')}
            >
              <i className="bi bi-card-list"></i>
              <p>ทุนที่เปิดให้ลงทะเบียน</p>
            </li>   

            <li className="d-flex"
              style={{
                background: 
                  (content==='StudentScholarshipStatus')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('student','StudentScholarshipStatus')}
            >
              <i className="bi bi-grid-3x3"></i>
              <p>สถานะทุนปัจจุบัน</p>
            </li>

            <li className="d-flex"
              style={{
                background: 
                  (content==='StudentProfile')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('student','StudentProfile')}
            >
              <i className="bi bi-person"></i>
              <p>ข้อมูลส่วนตัว</p>
            </li>

          </ul>
        )
      } 
      /*---------- INTERVIEWER ----------*/
      else if (user.role === 'interviewer') {
        return (
          <ul class="navs-link">
            <li class="d-flex" 
              style={{
                background: 
                  (content==='InterviewerAnnouncement')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('interviewer','InterviewerAnnouncement')}
            >
              <i className="bi bi-megaphone"></i>
              <p>ประกาศข่าวสาร</p>
            </li>

            <li className="current d-flex"
              style={{
                background: 
                  (content==='InterviewerScholarshipList')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('interviewer','InterviewerScholarshipList')}
            >
              <i className="bi bi-card-list"></i>
              <p>ทุนที่เปิดให้ลงทะเบียน</p>
            </li>   

            <li className="interview-link d-flex"
              style={{
                background: 
                  (content==='InterviewerInterview')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('interviewer','InterviewerInterview')}
            >
              <i className="bi bi-calendar-check"></i>
              <p>การสัมภาษณ์</p>
            </li>
          </ul>
        )
      } 
      /*---------- ADMIN ----------*/
      else if (user.role === 'admin') {
        return (
          <ul className="navs-link">
            <li className="d-flex" 
              style={{
                background: 
                  (content==='AdminAnnouncement')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('admin','AdminAnnouncement')}
            >
              <i className="bi bi-megaphone"></i>
              <p>ประกาศข่าวสาร</p>
            </li>

            <li className="current d-flex"
              style={{
                background: 
                  (content==='AdminScholarshipList')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('admin','AdminScholarshipList')}
            >
              <i className="bi bi-card-list"></i>
              <p>ทุนที่เปิดให้ลงทะเบียน</p>
            </li>   

            <li className="d-flex"
              style={{
                background: 
                  (content==='AdminReport')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('admin','AdminReport')}
            >
              <i className="bi bi-files"></i>
              <p>รายงานทุน</p>
            </li>

            <li className="d-flex"
              style={{
                background: 
                  (content==='AdminScholarshipCheck')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('admin','AdminScholarshipCheck')}
            >
              <i className="bi bi-search"></i>
              <p>ตรวจสอบข้อมูล</p>
            </li>

            <li className="d-flex"
              style={{
                background: 
                  (content==='AdminRoleSetting')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('admin','AdminRoleSetting')}
            >
              <i className="bi bi-three-dots"></i>
              <p>กำหนดสิทธิ์การเข้าถึง</p>
            </li>

            <li className="interview-link d-flex"
              style={{
                background: 
                  (content==='AdminInterview')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('admin','AdminInterview')}
            >
              <i className="bi bi-calendar-check"></i>
              <p>การสัมภาษณ์</p>
            </li>
          </ul>
        )
      } else if (user.role === 'deverloper') {
        return (
          <ul className="navs-link">
            <li className="d-flex" 
              style={{
                background: 
                  (content==='DeverloperAnnouncement')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('deverloper','DeverloperAnnouncement')}
            >
              <i className="bi bi-megaphone"></i>
              <p>ประกาศข่าวสาร</p>
            </li>

            <li className="current d-flex"
              style={{
                background: 
                  (content==='DeverloperScholarshipList')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('deverloper','DeverloperScholarshipList')}
            >
              <i className="bi bi-card-list"></i>
              <p>ทุนที่เปิดให้ลงทะเบียน</p>
            </li>   

            <li className="d-flex"
              style={{
                background: 
                  (content==='DeverloperScholarshipStatus')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('deverloper','DeverloperScholarshipStatus')}
            >
              <i className="bi bi-grid-3x3"></i>
              <p>สถานะทุนปัจจุบัน</p>
            </li>

            <li className="d-flex"
              style={{
                background: 
                  (content==='DeverloperProfile')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('deverloper','DeverloperProfile')}
            >
              <i className="bi bi-person"></i>
              <p>ข้อมูลส่วนตัว</p>
            </li>

            <li className="d-flex"
              style={{
                background: 
                  (content==='DeverloperReport')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('deverloper','DeverloperReport')}
            >
              <i className="bi bi-files"></i>
              <p>รายงานทุน</p>
            </li>

            <li className="d-flex"
              style={{
                background: 
                  (content==='DeverloperScholarshipCheck')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('deverloper','DeverloperScholarshipCheck')}
            >
              <i className="bi bi-search"></i>
              <p>ตรวจสอบข้อมูล</p>
            </li>

            <li className="d-flex"
              style={{
                background: 
                  (content==='DeverloperRoleSetting')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('deverloper','DeverloperRoleSetting')}
            >
              <i className="bi bi-three-dots"></i>
              <p>กำหนดสิทธิ์การเข้าถึง</p>
            </li>

            <li className="interview-link d-flex"
              style={{
                background: 
                  (content==='DeverloperInterview')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('deverloper','DeverloperInterview')}
            >
              <i className="bi bi-calendar-check"></i>
              <p>การสัมภาษณ์</p>
            </li>
          </ul>
        )
      }
    }
    
  }
 
  return (
    <div className='main'>
      <div class="d-flex">      

        {/*-----------------------LEFT NAV BAR---------------------*/}

        <div class="column-left d-flex flex-column"> 
          <div class="row-top">
            <div className="user-show">
              <div className='user-profile'>
                <img 
                  src={user.imgUrl} 
                  alt="user profile"
                  className="user-image"
                />
              </div>
              <div className='user-info'>
                <p className="user-email">
                  {user.name}
                </p>
                <p className="user-name">
                  {user.email}
                </p>
              </div>
            </div>    
          </div>
          
          {contentButtonRender()}
          
          <button onClick={() => setUser({...user, role: 'student'})}>show STUDENT</button>
          <button onClick={() => setUser({...user, role: 'interviewer'})}>show INTERVIEWER</button>
          <button onClick={() => setUser({...user, role: 'admin'})}>show ADMIN</button>
        </div>
        <div class="column-right d-flex flex-column">

          {/*-----------------------HEADER---------------------*/}

          <div class="row-top d-flex ">
            <h5>ระบบขอทุน นิสิตวิศวกรรมศาสตร์ มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขต ศรีราชา</h5>
            <div class="icon-button d-flex">
              <Login/>
            </div>
          </div>

          {/*-----------------------CONTENT---------------------*/}

          <div class="row-center ">
            {contentRender()}
          </div>
          
          {/*-----------------------FOOTER---------------------*/}

          <div class="row-bottom d-inline-flex ">
            <img src={ku_src_logo} class="ku_src_logo" alt="eng src"/>
            <img src={ku_eng_src_logo} class="ku_eng_src_logo" alt="eng src"/>
            <h5>
              คณะวิศวกรรมศาสตร์ ศรีราชา
              <br></br>
              มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา
            </h5>        
          </div>
        </div>
      </div>
    </div>
  );

}

export default MainPage;
