import { React, useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Login from "../components/Login.js"
import Axios from 'axios';
import { WebContext } from '../App';

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
import ProfileCreate           from '../sub-contents/ProfileCreate';
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
  
  const { User, Content } = useContext(WebContext)
  const [user, setUser] = User;
  const [content, setContent] = Content;

  function checkRole(targetRole, targetContent) {
    if (user.role === targetRole || user.role === 'admin') { 
      setContent(targetContent);
    } else {
      alert('You dont have permission for [' + user.role + ']\n as \'' + targetContent + '\', require \'' + targetRole + '\'');
    }
  }
  function contentRender() {
    switch (content) {
      case 'Scholarship':
        return <Scholarship/>
      case 'Status':
        return <Status/>
      case 'Applicant':
        return <Applicant/>
      case 'Profile':
        return <Profile/>
      case 'ScholarshipListRegister':
        return <ScholarshipListRegister/>
      case 'ProfileEdit':
        return <ProfileEdit/>
      case 'ProfileCreate':
          return <ProfileCreate/>
      case 'Interview':
        return <Interview/>
      case 'InterviewRate':
        return <InterviewRate/>
      case 'Announcement' :
        return <Announcement/>
      case 'Report' :
        return <Report/>
      case 'RoleSetting' :
        return <RoleSetting/>
      case 'AnnouncementCreate':
        return <AnnouncementCreate/>
      case 'ScholarshipListCreate':
        return <ScholarshipListCreate/>
      case 'ScholarshipCheckForm':
        return <ScholarshipCheckForm/>
      case 'ProfileCheck':
        return <ProfileCheck/>
      case 'InterviewSchedule':
        return <InterviewSchedule/>
      case 'ReportInspect':
        return <ReportInspect/>
      case 'AnnouncementEdit':
        return <AnnouncementEdit/>
      case 'AnnouncementEdit':
        return <Report/>
      case 'ScholarshipListCreate':
        return <ScholarshipListCreate/>
      default:
        return <Announcement/>
    }
  }

  function contentButtonRender() {
    switch (user.role) {
      case 'student':
        const studentContent = [
          {icon: 'bi bi-megaphone', content: 'Announcement' , text: 'ประกาศข่าวสาร'},
          {icon: 'bi bi-card-list', content: 'Scholarship'  , text: 'ทุนที่เปิดให้ลงทะเบียน'},
          {icon: 'bi bi-grid-3x3' , content: 'Status'       , text: 'สถานะทุนปัจจุบัน'},
          {icon: 'bi bi-person'   , content: 'Profile'      , text: 'ข้อมูลส่วนตัว'}
        ]
        return (
          <ul className="side-link"> {
            studentContent.map((item, index) => (
              <li className="d-flex" key={index}
                style={{ background: (content===item.content)? '#505356': '#74787C' }}
                onClick={() => checkRole( user.role, item.content )}>
                <i className={item.icon}></i>
                <p>{item.text}</p>
              </li>
            ))
          } </ul>
        )
        break;
      case 'interviewer': 
        const interviewerContent = [
          {icon: 'bi bi-megaphone'      , content: 'Announcement' , text: 'ประกาศข่าวสาร'},
          {icon: 'bi bi-card-list'      , content: 'Scholarship'  , text: 'ทุนที่เปิดให้ลงทะเบียน'},
          {icon: 'bi bi-calendar-check' , content: 'Interview'    , text: 'การสัมภาษณ์'},
        ]
        return (
          <ul className="side-link"> {
            interviewerContent.map((item, index) => (
              <li className="d-flex" key={index}
                style={{ background: (content===item.content)? '#505356': '#74787C' }}
                onClick={() => checkRole( user.role, item.content )}>
                <i className={item.icon}></i>
                <p>{item.text}</p>
              </li>
            ))
          } </ul>
        )
        break;
      case 'admin':
        const adminContent = [
          {icon: 'bi bi-megaphone'      , content: 'Announcement' , text: 'ประกาศข่าวสาร'},
          {icon: 'bi bi-card-list'      , content: 'Scholarship'  , text: 'ทุนที่เปิดให้ลงทะเบียน'},
          {icon: 'bi bi-files'          , content: 'Report'       , text: 'รายงานทุน'},
          {icon: 'bi bi-search'         , content: 'Applicant'    , text: 'ตรวจสอบข้อมูล'},
          {icon: 'bi bi-three-dots'     , content: 'RoleSetting'  , text: 'กำหนดสิทธิ์การเข้าถึง'},
          {icon: 'bi bi-calendar-check' , content: 'Interview'    , text: 'การสัมภาษณ์'}
        ]
        return (
          <ul className="side-link"> {
            adminContent.map((item, index) => (
              <li className="d-flex" key={index}
                style={{ background: (content===item.content)? '#505356': '#74787C' }}
                onClick={() => checkRole( user.role, item.content )}>
                <i className={item.icon}></i>
                <p>{item.text}</p>
              </li>
            ))
          } </ul>
        )
        break;
      default:
        return ( <ul className="side-link"></ul> )
        break;
    }
  }

  return (
    <div className='main'>
      <div className="d-flex">      

        {/*-----------------------SIDE NAV BAR---------------------*/}
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
