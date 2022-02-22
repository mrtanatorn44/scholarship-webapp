import { React, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Login from "../components/Login.js"
import Axios from 'axios';
import './MainPage.css';

// CONTENTS
import Announcement            from '../contents/Announcement.js';
import Scholarship        from '../contents/Scholarship.js';
import Applicant        from '../contents/Applicant.js';
import Status       from '../contents/Status.js';
import Profile                 from '../contents/Profile.js';
import Interview               from '../contents/Interview.js';
import Report                  from '../contents/Report.js';
import RoleSetting             from '../contents/RoleSetting.js';
// SUB_CONTENTS
import ProfileCheck            from '../sub-contents/ProfileCheck.js';
import ScholarshipCheckForm    from '../sub-contents/ScholarshipCheckForm.js';
import InterviewRate           from '../sub-contents/InterviewRate.js';
import ScholarshipListRegister from '../sub-contents/ScholarshipListRegister.js';
import ScholarshipEdit         from '../sub-contents/ScholarshipEdit.js';
import ProfileEdit             from '../sub-contents/ProfileEdit.js';
import ProfileCreate           from '../sub-contents/ProfileEdit.js';
import AnnouncementCreate      from '../sub-contents/AnnouncementCreate.js';
import AnnouncementEdit        from '../sub-contents/AnnouncementEdit.js';
import ScholarshipListCreate   from '../sub-contents/ScholarshipListCreate.js';
import ScholarshipListEdit     from '../sub-contents/ScholarshipListEdit.js';
import ReportInspect           from '../sub-contents/ReportInspect.js';
import InterviewSchedule       from '../sub-contents/InterviewSchedule.js';
import InterviewScheduleCreate from '../sub-contents/InterviewScheduleCreate.js';
import InterviewScheduleEdit   from '../sub-contents/InterviewScheduleEdit.js';
// MODEL
import ConfirmModal   from '../modals/ConfirmModal.js';
import AlertModal   from '../modals/AlertModal.js';
// IMAGE
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

  // Check user login
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
              window.gapi.auth2.getAuthInstance().isSignedIn.listen(fetchLogin);
              // FETCH isSignedIn & currentUser
              fetchLogin(await window.gapi.auth2.getAuthInstance().isSignedIn.get(),
                         await window.gapi.auth2.getAuthInstance().currentUser.get());
              function fetchLogin(authIsSignedIn, authCurrentUser) {
                isSignedIn = authIsSignedIn;
                currentUser = authCurrentUser;
              }
              
              // ASSIGN value to userState
              if (isSignedIn && !isLoggedIn) {
                // console.log(currentUser.profileObj);
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
    console.log('fetchAuth')

  }, [])

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
          //alert('Welcome back, ' + dbRole + ' - ' + user.name);
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
    console.log('fetchUser')
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
      case 'ScholarshipList':
        return <Scholarship sendContent={getContent}/>
      case 'ScholarshipStatus':
        return <Status/>
      case 'ScholarshipCheck':
        return <Applicant sendContent={getContent}/>
      case 'Profile':
        return <Profile sendContent={getContent}/>
      case 'ScholarshipListRegister':
        return <ScholarshipListRegister/>
      case 'ProfileEdit':
        return <ProfileEdit/>
      case 'Interview':
        return <Interview sendContent={getContent}/>
      case 'InterviewRate':
        return <InterviewRate/>
      case 'Announcement' :
        return <Announcement sendContent={getContent} />
      case 'Report' :
        return <Report sendContent={getContent}/>
      case 'RoleSetting' :
        return <RoleSetting/>
      case 'AnnouncementCreate':
        return <AnnouncementCreate sendContent={getContent}/>
      case 'ScholarshipListCreate':
        return <ScholarshipListCreate sendContent={getContent}/>
      case 'ScholarshipCheckForm':
        return <ScholarshipCheckForm/>
      case 'ProfileCheck':
        return <ProfileCheck/>
      case 'InterviewSchedule':
        return <InterviewSchedule/>
      case 'ReportInspect':
        return <ReportInspect sendContent={getContent}/>
      case 'AnnouncementEdit':
        return <AnnouncementEdit/>
      case 'AnnouncementEdit':
        return <Report/>
      default:
        return <Announcement/>
    }
  }
  // RENDER BUTTON TO CONTROL CONTENT
  function contentButtonRender() {
    if (isLoggedIn) {
      /*---------- STUDENT ----------*/
      if (user.role === 'student') {
        return (
          <ul className="side-link">
            <li className="announcement d-flex" 
              style={{
                background: 
                  (content==='Announcement')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('student','Announcement')}
            >
              <i className="bi bi-megaphone"></i>
              <p>ประกาศข่าวสาร</p>
            </li>

            <li className="scholarshipList d-flex"
              style={{
                background: 
                  (content==='ScholarshipList')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('student','ScholarshipList')}
            >
              <i className="bi bi-card-list"></i>
              <p>ทุนที่เปิดให้ลงทะเบียน</p>
            </li>   

            <li className="scholarshipStatus d-flex"
              style={{
                background: 
                  (content==='ScholarshipStatus')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('student','ScholarshipStatus')}
            >
              <i className="bi bi-grid-3x3"></i>
              <p>สถานะทุนปัจจุบัน</p>
            </li>

            <li className="profils d-flex"
              style={{
                background:
                  (content==='Profile')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('student','Profile')}
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
          <ul className="side-link">
            <li className="announcement d-flex" 
              style={{
                background: 
                  (content==='Announcement')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('interviewer','Announcement')}
            >
              <i className="bi bi-megaphone"></i>
              <p>ประกาศข่าวสาร</p>
            </li>

            <li className="ScholarshipList d-flex"
              style={{
                background: 
                  (content==='ScholarshipList')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('interviewer','ScholarshipList')}
            >
              <i className="bi bi-card-list"></i>
              <p>ทุนที่เปิดให้ลงทะเบียน</p>
            </li>   

            <li className="interview-link d-flex"
              style={{
                background: 
                  (content==='Interview')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('interviewer','Interview')}
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
          <ul className="side-link">
            <li className="d-flex" 
              style={{
                background: 
                  (content==='Announcement')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('admin','Announcement')}
            >
              <i className="bi bi-megaphone"></i>
              <p>ประกาศข่าวสาร</p>
            </li>

            <li className="current d-flex"
              style={{
                background: 
                  (content==='ScholarshipList')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('admin','ScholarshipList')}
            >
              <i className="bi bi-card-list"></i>
              <p>ทุนที่เปิดให้ลงทะเบียน</p>
            </li>   

            <li className="d-flex"
              style={{
                background: 
                  (content==='Report')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('admin','Report')}
            >
              <i className="bi bi-files"></i>
              <p>รายงานทุน</p>
            </li>

            <li className="d-flex"
              style={{
                background: 
                  (content==='ScholarshipCheck')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('admin','ScholarshipCheck')}
            >
              <i className="bi bi-search"></i>
              <p>ตรวจสอบข้อมูล</p>
            </li>


            <li className="d-flex"
              style={{
                background: 
                  (content==='RoleSetting')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('admin','RoleSetting')}
            >
              <i className="bi bi-three-dots"></i>
              <p>กำหนดสิทธิ์การเข้าถึง</p>
            </li>

            <li className="interview-link d-flex"
              style={{
                background: 
                  (content==='Interview')
                    ? '#505356'
                    : '#74787C'
              }}
              onClick={() => contentPermission('admin','Interview')}
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
      <div className="d-flex">      

        {/*-----------------------LEFT NAV BAR---------------------*/}

        <div className="side-link-left d-flex flex-column"> 
          <div className="row-top">
            <div className="user-show">
              <div className='user-profile'>
                <img 
                  src={user.imgUrl} 
                  alt="user profile"
                  className="img-circle"
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

        {/*-----------------------RIGHT CONTENT---------------------*/}
        <div className="column-right d-flex flex-column">

          {/*-----------------------HEADER---------------------*/}

          <div className="header-page d-flex">
            <h5 >ระบบขอทุน นิสิตวิศวกรรมศาสตร์ มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขต ศรีราชา</h5>
            <div className="logout-button d-flex">
              <Login/>
            </div>
          </div>

          {/*-----------------------CONTENT---------------------*/}

          <div className="row-center ">
            {contentRender()}
          </div>
          
          {/*-----------------------FOOTER---------------------*/}

          <div className="footer-page d-flex ">
            <img src={ku_src_logo} className="ku_src_logo" alt="eng src"/>
            <img src={ku_eng_src_logo} className="ku_eng_src_logo" alt="eng src"/>
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
