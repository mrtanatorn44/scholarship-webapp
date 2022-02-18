
import { React, useState, useEffect } from 'react';
import Axios from 'axios';

import announce_empty from "../images/announce_empty.png";
import ImageModal from "../modal/ImageModal.js";
import './Announcement.css';

//import { SHOWINDEXES } from 'sequelize/types/query-types';

function Announcement(props) {

  const [Announce,setAnnounce] = useState([]);
  const [ShowPopupImage, setShowPopupImage] = useState(false);
  const [PopupImage, setPopupImage] = useState();
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
    Axios.get("http://localhost:5000/getAnnounce").then((response)=> { 
      var result = response.data;
      console.log(result)
      if (result.length === 0) {
        result = [{ number: 0, 
          title: "ไม่มีประกาศ", 
          image: announce_empty,
          detail : "ว่าง", date: "0-0-0T00-00-00", isShow: false}]
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
      console.log('fetchAnnounce')
    })
  }
  useEffect(() => {
    getAnnounce();
  }, [])

  function onHandleImageClick(image) {
    setPopupImage(image);
    setShowPopupImage(true);
  }
  function NewsList() {
    return (
      Announce.map((news) => (
        <article className="news" key={news.number}>
          
          <div className='title'>
            <h2>{news.title}</h2>
            <h3>{news.date_format}</h3>
          </div>
          { !news.isShow &&
          <div className='content-image'>
            <img 
              className='news-image'
              src={news.image} 
              alt='scholarship promote' 
              onClick = {() => onHandleImageClick(news.image)}
            /> 
          </div>
          }
          { news.isShow &&
          <div className='content'>
             <h3>{news.detail}</h3>
          </div> 
          }
          {
            ShowPopupImage &&
            <ImageModal image={PopupImage} sendConfirm={(data) => setShowPopupImage(data)}/>
          }
          <div className='bottom'>
            <div className='admin-panel'>
              <button className="btn-delete">
                ลบ
              </button>
              <button className="btn-modify" onClick={ () => props.sendContent(['admin', 'AnnouncementEdit']) }>
                แก้ไข
              </button>
              <button
                onClick={() => {
                  console.log(Announce[news.number].image_url)
                }}
              >
                
              </button>
            </div>
            <div className='user-panel'>
              <h3 onClick={() => {
                let tempAnnounce=[...Announce];
                tempAnnounce[news.number].isShow = !tempAnnounce[news.number].isShow;
                setAnnounce(tempAnnounce);
              }}>
                  {!news.isShow ? "รายละเอียดเพิ่มเติม (แสดง)" : "รายละเอียดเพิ่มเติม (ซ่อน)"}
              </h3>
            </div>
          </div>
          
        </article>
      ))
    )
  }

  return (
    <div className="annoucement">   



      <div class="header d-flex">
        <div class='column-left d-flex'>
          <div class="icon-news">
            <i class="bi bi-megaphone"></i>
          </div> 
          <h4>ประกาศข่าวสาร</h4>
        </div>
        <div class='column-center'>
        </div>
        <div class='column-right  d-flex'>
          <button  className='addNews d-flex' onClick={ () => props.sendContent(['admin', 'AnnouncementCreate']) } >
            <i class="bi bi-plus-lg"></i>
            <p>เพิ่มข่าวสาร</p>
          </button>
        </div>
      </div>
      <div className="newslist">
        <NewsList/>
      </div>
    </div>
  );
}

export default Announcement;
