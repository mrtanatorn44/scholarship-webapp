/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App.js';
import Axios from 'axios';
import Lightbox from 'react-image-lightbox';
import announce_empty from "../../data/images/announce_empty.png";

function NewsListlogin(props) {
  const { Announce , Content } = useContext(WebContext);
  const [announce,setAnnounce] = Announce;

  const [ShowPopupImage, setShowPopupImage] = useState(false);
  const [PopupImage, setPopupImage] = useState();

  const onToggleContentClick = (newsNumber) => {
    let tempAnnounce=[...announce];
    tempAnnounce[newsNumber].toggleContent = !tempAnnounce[newsNumber].toggleContent;
    setAnnounce(tempAnnounce);
  }
  const onImageClick = (image) => {
    setPopupImage(image);
    setShowPopupImage(true);
  }

  return (
    announce.map((news, idx) => (
      <div className="news" key={idx}>
        {/*---------- TITLE ----------*/}
        <div className='title'>
          <h2>{news.title}</h2>
          <h3>{news.date_format}</h3>
        </div>
        
        {/*---------- CONTENT ----------*/}
        { /* IMAGE */
          !news.toggleContent && !news.imageIsEmpty &&
          <div className='content-image'>
            <img  className='news-image' src={ news.imageData } alt='scholarship promote' 
              onClick = {() => { news.ImageModal = true; setAnnounce([...announce]); }}/> 
          </div> 
        }
        { /* DETAIL */
          news.toggleContent && 
          <div  style={{whiteSpace:'pre-line'}} className='content'><h3>{ news.detail }</h3></div> 
        }
        { /* MODAL POPUP IMAGE */
          news.ImageModal && 
          <Lightbox mainSrc={ news.imageData } onCloseRequest={() => { news.ImageModal = false; setAnnounce([...announce]); }}/>
        }

        {/*---------- BOTTOM ----------*/}
        <div className='bottom1'>
          <div className='admin-panel'></div>
          <div className='user-panel'>
            { /* USER BUTTON */
              !news.imageIsEmpty && !news.isEmpty &&
              <h3 onClick={() => {news.toggleContent = !news.toggleContent; setAnnounce([...announce])} }>
                { !news.toggleContent ? "รายละเอียดเพิ่มเติม (แสดง)" : "รายละเอียดเพิ่มเติม (ซ่อน)" }
              </h3> 
            }
          </div>
        </div>

      </div>
    ))
  );
}


export default  NewsListlogin;

