import React from 'react';
import NewsListlogin from '../components/NewsListlogin';

function AnnouncementLogin() {
  return (
    <div className="annoucement-login">
      <div className="header d-flex">
        <div className="icon-news">
          <i className="bi bi-megaphone"/>
        </div>
        <h4>ประกาศข่าวสาร</h4>
      </div>
      <div className="newslist">
        <NewsListlogin/>
      </div>
    </div>
  );
}

export default AnnouncementLogin;
