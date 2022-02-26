import React, { useContext } from 'react';
import NewsList from '../components/NewsList';
import { WebContext } from '../App';

function Announcement(props) {
  const { Content } = useContext(WebContext)
  const [ content, setContent] = Content;

  return (
    <div className="frame-content">   
      <div className="head-content d-flex">
        <div className="icons">
          <i className="bi bi-megaphone"/>
        </div>
        <div className="topic">
          <h4>ประกาศข่าวสาร</h4>
        </div>
        <button  className='button-add d-flex' onClick={() => { setContent('AnnouncementCreate') }}>
          <i className="bi bi-plus-lg"/>
          <p>เพิ่มข่าวสาร</p>
        </button>
      </div>
      <div className="frame-subcontent1">
        <NewsList/>
      </div>
    </div>
  )
}

export default Announcement;
