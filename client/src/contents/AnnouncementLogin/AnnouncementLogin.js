import React from 'react';
import NewsListlogin from './NewsListlogin';

function AnnouncementLogin() {
  return (
    <div className="frame">
      <div className="header">
        <div className='left'>
          <div className="icons">
            <i className="bi bi-megaphone"/>
          </div>
          <div className="topic">
            <h4>ประกาศข่าวสาร</h4>
          </div>
        </div>
        <div className='right'></div>
      </div>

      <div className="content1">
        <NewsListlogin/>
      </div>
    </div>
  );
}

export default AnnouncementLogin;
