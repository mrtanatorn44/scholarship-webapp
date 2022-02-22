import React from 'react';
import NewsList from '../components/NewsList';

function Announcement(props) {

  return (
    <div className="frame-content">   
      <div className="head-content d-flex">
        <div className="icon-news">
          <i className="bi bi-megaphone"/>
        </div>
        <div className="topic">
          <h4>ประกาศข่าวสาร</h4>
        </div>
        <button  className='button-add d-flex' onClick={() => { props.sendContent(['admin', 'AnnouncementCreate']); }}>
          <i className="bi bi-plus-lg"/>
          <p>เพิ่มข่าวสาร</p>
        </button>
      </div>
      <div class="frame-subcontent">
        <NewsList/>
      </div>
    </div>
  )
}

export default Announcement;
