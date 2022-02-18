import { React, useState, useEffect } from 'react';
import './AnnouncementEdit.css';
import Axios from 'axios';
import announce_empty        from "../images/announce_empty.png";

function AnnouncementEdit(props) {
  const [Announce,setAnnounce] = useState([]);

  function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
    
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
  
  
  return (
    <div className="annoucement">   
      <div class="header d-flex">
        <div class='column-left d-flex'>
          <div class="icon-news">
            <i class="bi bi-megaphone"></i>
          </div> 
          <h4>แก้ไขข่าวสาร</h4>
        </div>
        <div class='column-center'>
        </div>
        
      </div>
      <div className="newslist">
        
      </div>
    </div>
  );
}


export default AnnouncementEdit;
