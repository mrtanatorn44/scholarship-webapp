import { React } from "react";
import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage.js';
import MainPage from './pages/MainPage.js';

import './App.css';

/*
  <Route path="/announcement/addAnnoucement" element={<addAnnouncementPage/>} />
  <Route path="/announcement/editAnnoucement" element={<editAnnouncementPage/>} />
  <Route path="/ScholarshipList" element={<register_capitalPage/>} />
  <Route path="/ScholarshipList/AddScholarshipList_1" element={<addAnnouncementPage1/>} />
  <Route path="/ScholarshipList/AddScholarshipList_2" element={<addAnnouncementPage2/>} />
  <Route path="/ScholarshipList/AddScholarshipList_3" element={<addAnnouncementPage3/>} />
  <Route path="/ScholarshipList/EditScholarshipList_1" element={<EditAnnouncementPage1/>} />
  <Route path="/ScholarshipList/EditScholarshipList_2" element={<EditAnnouncementPage2/>} />
  <Route path="/ScholarshipList/EditScholarshipList_3" element={<EditAnnouncementPage3/>} />
  <Route path="/Report" element={<ReportPage/>} />
  <Route path="/Report/Name_of_report" element={<NameReportPage/>} />
  <Route path="/ScholarshipCheck" element={<ScholarshipCheckPage/>} />
  <Route path="/ScholarshipCheck1" element={<ScholarshipCheckPage1/>} />
  <Route path="/ScholarshipCheck2" element={<ScholarshipCheckPage2/>} />
  <Route path="/ScholarshipCheck3" element={<ScholarshipCheckPage3/>} />
  <Route path="/ScholarshipCheck4" element={<ScholarshipCheckPage4/>} />
  <Route path="/ProfileCheck" element={<ProfileCheckPage/>} />
  <Route path="/SetPermission" element={<SetPermissionPage/>} />
  <Route path="/Appointment" element={<AppointmentPage/>} />
  <Route path="/Appointment/AddAppointment" element={<addAppointmentPage/>} />
  <Route path="/Appointment/CheckRating" element={<checkReatingPage/>} />
  <Route path="/Appointment/CheckAppointment" element={<checkAppointmentPage/>} />
  <Route path="/announcement/editAnnoucement" element={<addAnnouncementPage/>} />
  <Route path="/announcement/editAnnoucement" element={<addAnnouncementPage/>} />

  <Route path="/announcement/editAnnoucement" element={<addAnnouncementPage/>} />
*/
function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/main" element={<MainPage/>} />
      </Routes>
    </div>
  );
}

export default App;
