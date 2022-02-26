import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../App.js';
import Axios from 'axios';

import announce_empty from "../images/announce_empty.png";

import ImageModal from "../modals/ImageModal.js";
import AlertModal from '../modals/AlertModal.js';
import ConfirmDeleteModal from '../modals/ConfirmModal.js';



function NewsList() {

// Context
const { User, Content, EditAnnounceID } = useContext(WebContext);
const [user, setUser] = User;
const [content, setContent] = Content;
const [editAnnounceID, setEditAnnounceID] = EditAnnounceID;

const [showModalAlert, setShowModalAlert] = useState(false);
const [alertText, setAlertText] = useState("");

const [showModalDelete, setShowModalDelete] = useState(false);
const [ShowPopupImage, setShowPopupImage] = useState(false);
const [PopupImage, setPopupImage] = useState();

const [Announce,setAnnounce] = useState([]);

const [targetDeleteNews, setTargetDeleteNews] = useState();

  function getConfirm(data) {
    if (data) {
      if (targetDeleteNews != null)
        onDeleteAnnounce(targetDeleteNews);
    } else {
      //alert('FALSE !')
    }
    setShowModalDelete(false);
  }
  
  function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    //console.log(binary);
    return binary ;
  }
  const getAnnounce = () =>{
    Axios.get("http://localhost:5000/getAllAnnounce").then((response)=> { 
      var result = response.data;
      if (result.length === 0) {
        result = [{ 
          number: 0, 
          title: "ไม่มีประกาศในขณะนี้", 
          image: announce_empty,
          detail : "ว่าง", date: "0-0-0T00-00-00", isShow: false
        }]
        setAnnounce(result)
        return;
      }        
      var idx = 0
      result.forEach( (res) => {
        // mysql date_format to human date_format
        var month_th = ["", "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", 
                            "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
        
        var dmy = res.date.split("T")[0].split("-").reverse();
        // console.log(dmy)
        var date_tranform = "วันที่ " + (parseInt(dmy[0])) + " " + month_th[parseInt(dmy[1], 10)] + 
                            " " + (parseInt(dmy[2]) + 543);
        //console.log(res.image_url)
        Object.assign(res, {
          number: idx++,
          image : "data:image/png;base64," + _arrayBufferToBase64(res.image_url.data), // blob to image
          isShow: false,
          date_format: date_tranform
        })
      });
      setAnnounce(result)
    })
  }
  useEffect(() => {
    getAnnounce();
  }, [])
  
  function onHandleImageClick(image) {
    setPopupImage(image);
    setShowPopupImage(true);
  }
  
  function onDeleteAnnounce(id) {
    Axios.post("http://localhost:5000/getUser", {
      email : user.email
    }).then(
      (response) => {
        if (response.data.length !== 0)  /*https://www.youtube.com/watch?v=nhPnTtSwRJk*/ /*ขำๆตอนตื่นจากพีม*/{
          const data = response.data[0];
          const dbRole = data.role;
          if(dbRole === 'admin') {
            Axios.post("http://localhost:5000/deleteAnnounce", { id : id }).then((response) => { setAnnounce([]);getAnnounce();})
            return true;
          } else {
            return false;
          }
        }
      }
    )
  }

  function getConfirmDelete(isConfirm) {
    if (isConfirm) {
      if (onDeleteAnnounce(targetDeleteNews)) {
        setAlertText("ลบข่าวเรียบร้อย");
      } else {
        setAlertText("แกไม่มีสิทธิ์");
      }
      setShowModalAlert(true)
    }
    setShowModalDelete(false);
  }
  function getConfirmAlert(isConfirm) {
    if (isConfirm) {
      setShowModalAlert(false)
    }
  }
  return (
    Announce.map((news) => (
      <article className="news" key={news.number}>

        {/*---------- TITLE ----------*/}
        <div className='title'>
          <h2>{news.title}</h2>
          <h3>{news.date_format}</h3>
        </div>

        {/*---------- CONTENT ----------*/}
        { !news.isShow &&
        <div className='content-image'>
          <img  className='news-image' src={news.image} alt='scholarship promote' onClick = {() => onHandleImageClick(news.image) }/> 
        </div> }
        { news.isShow && <div className='content'><h3>{ news.detail }</h3></div> }
        { ShowPopupImage && <ImageModal image={ PopupImage } sendConfirm={ (data) => setShowPopupImage(data) }/> }

        {/*---------- BOTTOM ----------*/}
        <div className='newsList-bottom'>
          <div className='admin-panel'>
            <button className="btn-delete" onClick={() => { setShowModalDelete(true);setTargetDeleteNews(news.id); }}> ลบ </button>
            <button className="btn-modify" onClick={() => { setEditAnnounceID(news.id);setContent("AnnouncementEdit"); }}> แก้ไข </button>
            { showModalDelete && <ConfirmDeleteModal sendConfirm={getConfirmDelete}/> }
            { showModalAlert && <AlertModal text2={alertText} iconIndex={0} sendConfirm={getConfirmAlert}/>}
          </div>
          <div className='user-panel'>
            <h3 onClick={() => {
              let tempAnnounce=[...Announce];
              tempAnnounce[news.number].isShow = !tempAnnounce[news.number].isShow;
              setAnnounce(tempAnnounce);
            }}>
              { !news.isShow ? "รายละเอียดเพิ่มเติม (แสดง)" : "รายละเอียดเพิ่มเติม (ซ่อน)" }
            </h3>
          </div>
        </div>
      </article>
    ))
  )
}

export default NewsList;
