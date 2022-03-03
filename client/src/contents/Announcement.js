import React, { useContext } from 'react';
import NewsList from '../components/NewsList';
import { WebContext } from '../App';

function Announcement(props) {
  const { Content, User } = useContext(WebContext)
  const [ content, setContent] = Content;
  const [ user, setUser] = User;
  return (
    <div className="frame">   
      <div className="header">
        <div className="left ">
          <div className="icons">
            <i className="bi bi-megaphone"/>
          </div>
          <div className="topic">
            <h4>ประกาศข่าวสาร</h4>
          </div>
        </div>
        <div className="right">
          { user.role === 'admin' &&
          <button  className='button-add d-flex' onClick={() => { setContent('AnnouncementCreate') }}>
            <i className="bi bi-plus-lg"/>
            <p>เพิ่มข่าวสาร</p>
          </button> }
        </div>
      </div>

      <div className="content1">
        <NewsList/>
      </div>
    </div>
  )
}

export default Announcement;
