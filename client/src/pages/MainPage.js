/* eslint-disable */

import { React, useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Login from "../components/LoginGoogle.js"
import Axios from 'axios';
import { WebContext } from "../context/WebContext.js";

// CONTENTS
import Announcement            from '../contents/Announcement/Announcement.js';
import AnnouncementCreate      from '../contents/Announcement/AnnounceCreate.js';
import AnnouncementEdit        from '../contents/Announcement/AnnounceEdit.js';

import Scholarship             from '../contents/Scholarship/Scholarship.js';
import ScholarshipRegister from '../contents/Scholarship/ScholarshipRegister.js';
import ScholarshipEdit         from '../contents/Scholarship/ScholarshipEdit.js';
import ScholarshipCreate       from '../contents/Scholarship/ScholarshipCreate.js';
import EditScholarshipRegister from '../contents/Scholarship/EditScholarshipRegister.js';

import Member   from '../contents/Member/Member.js';

import Applicant                from '../contents/Applicant/Applicant.js';
import ApplicantList            from '../contents/Applicant/ApplicantList.js';
import ApplicantCheck           from '../contents/Applicant/ApplicantCheck.js';
import ApplicantProfile         from '../contents/Applicant/ApplicantProfile.js';

import Status                  from '../contents/Status/Status.js';

import RoleSetting             from '../contents/RoleSetting/RoleSetting.js';

import Profile                 from '../contents/Profile/Profile.js';
import ProfileEdit             from '../contents/Profile/ProfileEdit.js';
import ProfileCreate           from '../contents/Profile/ProfileCreate.js';
import FormProfile             from '../contents/Profile/FormProfile.js';

import Report                  from '../contents/Report/Report.js';
import ReportInspect           from '../contents/Report/ReportInspect.js';

import Interview                    from '../contents/Interview/Interview.js';
import InterviewRate                from '../contents/Interview/InterviewRate.js';
import IntervieweeList                    from '../contents/Interview/IntervieweeList.js';
import InterviewerChoose                    from '../contents/Interview/InterviewerChoose.js';
import InterviewApprovement                    from '../contents/Interview/InterviewApprovement.js';
import InterviewProfile                    from '../contents/Interview/InterviewProfile.js';


// IMAGE
import ku_eng_src_logo    from "../data/images/engsrc.png";
import ku_src_logo        from "../data/images/ku.png";

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
      case 'FormProfile':
        return <FormProfile/>
      case 'Status':
        return <Status/>
      case 'Applicant':
        return <Applicant/>
      case 'ApplicantList':
        return <ApplicantList/>
      case 'ApplicantCheck':
        return <ApplicantCheck/>
      case 'ApplicantProfile':
        return <ApplicantProfile/>
      case 'Profile':
        return <Profile/>
      case 'ScholarshipRegister':
        return <ScholarshipRegister/>
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
      case 'ScholarshipCreate':
        return <ScholarshipCreate/>
      case 'ProfileCheck':
        return <ProfileCheck/>
      case 'ReportInspect':
        return <ReportInspect/>
      case 'AnnouncementEdit':
        return <AnnouncementEdit/>
      case 'Report':
        return <Report/>
      case 'ScholarshipEdit':
        return <ScholarshipEdit/>
      case 'Member':
        return <Member/>
      case 'MemberList':
        return <MemberList/> 
      case 'EditScholarshipRegister':
        return <EditScholarshipRegister/>
      case 'IntervieweeList':
        return <IntervieweeList/>
      case 'InterviewerChoose':
        return <InterviewerChoose/>
      case 'InterviewApprovement':
        return <InterviewApprovement/>
      case 'InterviewProfile':
        return <InterviewProfile/>
      
        default:
        return <Announcement/>
    }
  }

  function contentButtonRender() {
    switch (user.role) {
      case 'student':
        const studentContent = [
          {icon: 'bi bi-megaphone'      , content: 'Announcement' , text: 'ประกาศข่าวสาร'},
          {icon: 'bi bi-pencil-square'  , content: 'Scholarship'  , text: 'ทุนที่เปิดให้ลงทะเบียน'},
          {icon: 'bi bi-clipboard-data' , content: 'Status'       , text: 'สถานะทุนปัจจุบัน'},
          {icon: 'bi bi-person-circle'  , content: 'Profile'      , text: 'ข้อมูลส่วนตัว'}
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
          {icon: 'bi bi-megaphone'        , content: 'Announcement' , text: 'ประกาศข่าวสาร'},
          {icon: 'bi bi-pencil-square'    , content: 'Scholarship'  , text: 'ทุนที่เปิดให้ลงทะเบียน'},
          {icon: 'bi bi-chat-square-text' , content: 'Interview'    , text: 'การสัมภาษณ์'},
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
          {icon: 'bi bi-megaphone'        , content: 'Announcement' , text: 'ประกาศข่าวสาร'},
          {icon: 'bi bi-pencil-square'    , content: 'Scholarship'  , text: 'ทุนที่เปิดให้ลงทะเบียน'},
          {icon: 'bi bi-clipboard-check'  , content: 'Applicant'    , text: 'ตรวจสอบเอกสาร'},
          {icon: 'bi bi-chat-square-text' , content: 'Interview'    , text: 'การสัมภาษณ์'},
          {icon: 'bi bi-file-text'        , content: 'Report'       , text: 'รายงานทุน'},
          {icon: 'bi bi-person-circle'    , content: 'Member'       , text: 'รายชื่อสมาชิก'},
          {icon: 'bi bi-gear'             , content: 'RoleSetting'  , text: 'กำหนดสิทธิ์การเข้าถึง'},      
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

  function changeRole(targetRole) {
    Axios.post("http://localhost:5000/editRole",{ 
      id    : user.id,
      role  : targetRole
    }).then(
      
      (response) => {
        window.location.reload(false);
      }
    )
  }
  return (
    <div className='main-page' >

      {/*-----------------------SIDE NAV BAR---------------------*/}
      <div className="sidebar d-flex flex-column"> 
        <div className="row-top">
          <div className='user-profile'>
            { user.isLogin && user.imgUrl &&
            <img src={user.imgUrl} alt="user"/> }
          </div>
          <div className='user-info'>
            <p> {user.name} </p>
            <p> {user.email} </p>
          </div>
        </div>
        <div className="row-bottom">
          {contentButtonRender()}
          <button onClick={() => changeRole('student')}>show STUDENT</button>
          <button onClick={() => changeRole('interviewer')}>show INTERVIEWER</button>
          <button onClick={() => changeRole('admin')}>show ADMIN</button>
        </div>
        
      </div>

      {/*-----------------------RIGHT CONTENT---------------------*/}
      <div className="column-right">

        {/*-----------------------HEADER---------------------*/}

        <div className="row-top">
          <p>ระบบขอทุน นิสิตวิศวกรรมศาสตร์ มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขต ศรีราชา</p>
          <div className="logout-button d-flex">
            <div style={{visibility: user.isLogin ? 'visible' : 'hidden'}}>
              <Login/>
            </div>
          </div>
        </div>

        {/*-----------------------CONTENT---------------------*/}

        <div className="row-center ">
          { user.isLogin && contentRender()}
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
  );

}

export default MainPage;
