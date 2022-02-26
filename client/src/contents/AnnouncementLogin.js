import React from 'react';
import NewsListlogin from '../components/NewsListlogin';

function AnnouncementLogin() {
  return (
    <div className="frame-content">
      <div className="head-content d-flex">
        <div className="icons">
          <i className="bi bi-megaphone"/>
        </div>
        <div className="topic">
          <h4>ประกาศข่าวสาร</h4>
        </div>
      </div>
      <div className="frame-subcontent1">
        <NewsListlogin/>
      </div>
    </div>
  );
}

export default AnnouncementLogin;
