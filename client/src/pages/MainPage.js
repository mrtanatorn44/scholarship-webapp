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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({
    imgUrl: ku_eng_src_logo,
    email : 'before using.',
    name  : 'Please Log-in',
    fname : '',
    lname : '',
    role  : ''
  });
  const [content, setContent] = useState("Announcement");


  // Authenticating
  function showUser() {

    const fetchData = async() => {
      console.log('fetData')
      if (window.gapi) {
        const auth2 = window.gapi.auth2.getAuthInstance();
        if (auth2 != null) {
          const isLoggedIn = auth2.isSignedIn.get();
          if (isLoggedIn && !isAuth) {
            const cUser = await auth2.currentUser.get();
            const lName = cUser.profileObj.familyName.charAt(0).toUpperCase() + 
                          cUser.profileObj.familyName.slice(1).toLowerCase()
            setUser({
              ...user,
              imgUrl: cUser.profileObj.imageUrl,
              email : cUser.profileObj.email,
              name  : cUser.profileObj.givenName + ' ' + lName,
              fname : cUser.profileObj.givenName,
              lname : lName
            });

            setIsAuth(true);
            setIsLoggedIn(true);

          }
        }
      }
    }
    fetchData();

    return (
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
    )
  }

  // Check is Authenticate / IF Not Pass => 'Login-Page'
  useEffect(() => {
    /*
    if (isLoggedIn) {
      return;
    }
    async function checkSignedIn() {
      if (window.gapi) {
        const auth2 = window.gapi.auth2.getAuthInstance()
        if (auth2 != null) {
          var isLoggedIn = auth2.isSignedIn.get()
          if (!isLoggedIn) {
            navigate("/");
            alert("Please log-in.");
          }
        }
      }
    }
    checkSignedIn();
    */
  }, [isLoggedIn])

  // Run after Authenticate is Pass / TO check ROLE
  useEffect(() => {
    if (isAuth === false) {
      return;
    }

    console.log(user.email)
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
          var email = user.email;
          var fname = user.fname;
          var lname = user.lname;
          var role  = 'student';
          Axios.put("http://localhost:5000/addUser", {
            email : email, 
            fname : fname, 
            lname : lname, 
            role  : role
          }).then(
            (response) => {
              alert('Welcome for the first time.')
              setContent('StudentAnnouncement')
            }
          );
        }
      }
    );

  }, [isAuth])

  // Get props data from component child
  // To change content
  function getContent(data) {
    contentPermission(data[0],data[1]);
  }
  
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

  /*
asdfasdfgasdgfasdfgasdfg
  */
  function contentRender() {
    switch (content) {
      /*---------- STUDENT ----------*/
      case 'StudentAnnouncement':
        return  <StudentAnnouncement/>
      case 'StudentScholarshipList':
        return <StudentScholarshipList/>
      case 'StudentScholarshipStatus':
        return <StudentScholarshipStatus/>
      case 'StudentProfile':
        return <StudentProfile/>
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
      case 'AdminConfirmModal' :
        return <AdminConfirmModal sendContent={getContent}/>
      case 'AdminScholarshipListCreate':
        return <AdminScholarshipListCreate sendContent={getContent}/>

        
    }
  }

  const contentButtonRender = () => {
    if (isAuth) {
      /*---------- STUDENT ----------*/
      if (user.role === 'student') {
        return (
          <ul class="navs-link">
            <li class="d-flex" 
              style={{
                background: 
                  (content==='Announcement')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('student','StudentAnnouncement')}
            >
              <i class="bi bi-megaphone"></i>
              <p>ประกาศข่าวสาร</p>
            </li>

            <li class="current d-flex"
              style={{
                background: 
                  (content==='ScholarshipList')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('student','StudentScholarshipList')}
            >
              <i class="bi bi-card-list"></i>
              <p>ทุนที่เปิดให้ลงทะเบียน</p>
            </li>   

            <li class="d-flex"
              style={{
                background: 
                  (content==='ScholarshipStatus')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('student','StudentScholarshipStatus')}
            >
              <i class="bi bi-grid-3x3"></i>
              <p>สถานะทุนปัจจุบัน</p>
            </li>

            <li class="d-flex"
              style={{
                background: 
                  (content==='Profile')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('student','StudentProfile')}
            >
              <i class="bi bi-person"></i>
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
                  (content==='Announcement')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('interviewer','InterviewerAnnouncement')}
            >
              <i class="bi bi-megaphone"></i>
              <p>ประกาศข่าวสาร</p>
            </li>

            <li class="current d-flex"
              style={{
                background: 
                  (content==='ScholarshipList')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('interviewer','InterviewerScholarshipList')}
            >
              <i class="bi bi-card-list"></i>
              <p>ทุนที่เปิดให้ลงทะเบียน</p>
            </li>   

            <li class="interview-link d-flex"
              style={{
                background: 
                  (content==='Interview')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('interviewer','InterviewerInterview')}
            >
              <i class="bi bi-calendar-check"></i>
              <p>การสัมภาษณ์</p>
            </li>
          </ul>
        )
      } 
      /*---------- ADMIN ----------*/
      else if (user.role === 'admin') {
        return (
          <ul class="navs-link">
            <li class="d-flex" 
              style={{
                background: 
                  (content==='Announcement')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('admin','AdminAnnouncement')}
            >
              <i class="bi bi-megaphone"></i>
              <p>ประกาศข่าวสาร</p>
            </li>

            <li class="current d-flex"
              style={{
                background: 
                  (content==='ScholarshipList')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('admin','AdminScholarshipList')}
            >
              <i class="bi bi-card-list"></i>
              <p>ทุนที่เปิดให้ลงทะเบียน</p>
            </li>   

            <li class="d-flex"
              style={{
                background: 
                  (content==='Report')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('admin','AdminReport')}
            >
              <i class="bi bi-files"></i>
              <p>รายงานทุน</p>
            </li>

            <li class="d-flex"
              style={{
                background: 
                  (content==='ScholarshipCheck')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('admin','AdminScholarshipCheck')}
            >
              <i class="bi bi-search"></i>
              <p>ตรวจสอบข้อมูล</p>
            </li>

            <li class="d-flex"
              style={{
                background: 
                  (content==='RoleSetting')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('admin','AdminRoleSetting')}
            >
              <i class="bi bi-three-dots"></i>
              <p>กำหนดสิทธิ์การเข้าถึง</p>
            </li>

            <li class="interview-link d-flex"
              style={{
                background: 
                  (content==='Interview')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('admin','AdminInterview')}
            >
              <i class="bi bi-calendar-check"></i>
              <p>การสัมภาษณ์</p>
            </li>
          </ul>
        )
      } else if (user.role === 'deverloper') {
        return (
          <ul class="navs-link">
            <li class="d-flex" 
              style={{
                background: 
                  (content==='Announcement')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('deverloper','DeverloperAnnouncement')}
            >
              <i class="bi bi-megaphone"></i>
              <p>ประกาศข่าวสาร</p>
            </li>

            <li class="current d-flex"
              style={{
                background: 
                  (content==='ScholarshipList')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('deverloper','DeverloperScholarshipList')}
            >
              <i class="bi bi-card-list"></i>
              <p>ทุนที่เปิดให้ลงทะเบียน</p>
            </li>   

            <li class="d-flex"
              style={{
                background: 
                  (content==='ScholarshipStatus')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('deverloper','DeverloperScholarshipStatus')}
            >
              <i class="bi bi-grid-3x3"></i>
              <p>สถานะทุนปัจจุบัน</p>
            </li>

            <li class="d-flex"
              style={{
                background: 
                  (content==='Profile')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('deverloper','DeverloperProfile')}
            >
              <i class="bi bi-person"></i>
              <p>ข้อมูลส่วนตัว</p>
            </li>

            <li class="d-flex"
              style={{
                background: 
                  (content==='Report')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('deverloper','DeverloperReport')}
            >
              <i class="bi bi-files"></i>
              <p>รายงานทุน</p>
            </li>

            <li class="d-flex"
              style={{
                background: 
                  (content==='ScholarshipCheck')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('deverloper','DeverloperScholarshipCheck')}
            >
              <i class="bi bi-search"></i>
              <p>ตรวจสอบข้อมูล</p>
            </li>

            <li class="d-flex"
              style={{
                background: 
                  (content==='RoleSetting')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('deverloper','DeverloperRoleSetting')}
            >
              <i class="bi bi-three-dots"></i>
              <p>กำหนดสิทธิ์การเข้าถึง</p>
            </li>

            <li class="interview-link d-flex"
              style={{
                background: 
                  (content==='Interview')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('deverloper','DeverloperInterview')}
            >
              <i class="bi bi-calendar-check"></i>
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
            {showUser()}     
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
              {/* FOR LATER
              <div class="icon-bell">
                <i class="bi bi-bell"></i>
              </div>
              */}

              {/*<button onClick={() =>test(userEmail)}>TEST</button>*/}
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
