import { React, useState, useEffect } from 'react';
import Axios from 'axios';
import announce_empty from "../images/announce_empty.png";

function NewsListlogin(props) {
  const [Announce,setAnnounce] = useState([]);
    const [visible, setVisible] = useState(false);

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
      //console.log(result)
      if (result.length === 0) {
        result = [{ number: 0, 
          title: "ไม่มีประกาศในขณะนี้", 
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
        var date_tranform = "วันที่ " + (parseInt(dmy[0])) + " " + month_th[parseInt(dmy[1], 10)] + 
                            " " + (parseInt(dmy[2]) + 543);
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
  
  return (
    Announce.map((news) => (
      <article className="news" key={news.number}>
        {/*---------- TITLE ----------*/}
        <div className='title'>
          <h2>{news.title}</h2>
          <h3>{news.date_format}</h3>
        </div>
        
        {/*---------- CONTENT ----------*/}
        { !news.isShow && <img src={news.image} alt='scholarship promote'/>}
        {news.isShow && <h3>{news.detail}</h3>}

        {/*---------- PANEL ----------*/}
        <div className='newsLogin-bottom'>
          <div className='news-user-panel'>
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
  );
}


export default  NewsListlogin;

