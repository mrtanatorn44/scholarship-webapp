import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App.js';
import Axios from 'axios';

// Alert & Image Modal
import Swal from 'sweetalert2'
import Lightbox from 'react-image-lightbox';

function AnnounceList() {

  // Context
  const { User, Content, Announce, EditAnnounceID } = useContext(WebContext);
  const [user, setUser] = User;
  const [content, setContent] = Content;
  const [announce,setAnnounce] = Announce;
  const [editAnnounceID, setEditAnnounceID] = EditAnnounceID;

  const onHandleDeleteAnnounceBtn = (newsID) => {
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "ที่จะลบประกาศนี้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#03A96B',
      confirmButtonText: 'Delete',
      cancelButtonColor: '#A62639',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        if (user.role === 'admin') {
          Axios.post("http://localhost:5000/deleteAnnounce", { id : newsID }).then((response) => { 
            if (response.data.errno) { // Check if Backend return error
              Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
              return;
            }
            setAnnounce([]);
            Swal.fire('ลบประกาศเรียบร้อย!','','success')
          })
        }
      }
    })
  }

  return (
    announce.map((news, news_idx) => (
      <div className="news" key={news_idx}>

        {/* ----- TITLE ----- */}
        <div className='title'>
          <h2>{news.title}</h2>
          <h3>{news.dateFormat}</h3>
        </div>

        {/* ----- CONTENT ----- */}
        { /* IMAGE */
          !news.toggleContent && !news.imageIsEmpty &&
          <div className='content-image'>
            <img  className='news-image' src={ news.imageData } alt='scholarship promote' 
              onClick = {() => { news.ImageModal = true; setAnnounce([...announce]); }}/> 
          </div> 
        }
        { /* DETAIL */
          news.toggleContent && 
          <div className='content'><h3 className='preline'>{ news.detail }</h3></div> 
        }
        { /* MODAL POPUP IMAGE */
          news.ImageModal && 
          <Lightbox mainSrc={ news.imageData } onCloseRequest={() => { news.ImageModal = false; setAnnounce([...announce]); }}/>
        }

        {/* ----- BOTTOM ----- */}
        { /* IF no announce from DB no render */
          !news.isEmpty && 
          <div className='bottom1'>
            <div className='admin-panel'>
              { /* ADMIN BUTTON */
                user.role === 'admin' && 
                <>            
                <button className="button-admin orange1" onClick={() => { onHandleDeleteAnnounceBtn(news.id); }}> ลบ </button>
                <button className="button-admin red1" onClick={() => { localStorage.setItem('announceEditID_target',news.id);setContent("AnnouncementEdit"); }}> แก้ไข </button>
                </> 
              }
            </div> 
            <div className='user-panel'>
              { /* USER BUTTON */
                !news.imageIsEmpty &&
                <h3 onClick={() => {news.toggleContent = !news.toggleContent; setAnnounce([...announce])} }>
                  { !news.toggleContent ? "รายละเอียดเพิ่มเติม (แสดง)" : "รายละเอียดเพิ่มเติม (ซ่อน)" }
                </h3> 
              }
            </div>
          </div>
        }
      </div>
    ))
  )
}

export default AnnounceList;
