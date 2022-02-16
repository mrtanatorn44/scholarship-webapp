import { React, useState, useEffect } from 'react';
import data from '../data/datanews.js';
import './Announcement.css';
import Axios from 'axios';

function Announcement(props) {

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
      // add Blob(arrayBuffer) to Image base64 into Announe
      var result = response.data;
      var idx = 0
      result.forEach( (res) => {
        Object.assign(res, {
          number: idx++,
          image : "data:image/png;base64," + _arrayBufferToBase64(res.image_url.data),
          isShow: false
        })
      });
      //console.log(result)
      setAnnounce(result)
    })
  }
  useEffect(() => {
    getAnnounce();
  }, [])
  function Test() {
    
    return (
      Announce.map((news) =>
        <div key={news.id}>
          <p>{news.title}</p>
          <p>{news.detail}</p>
          <p>{news.date}</p>
          <img src={news.image} />
         
          
        </div>
      )
    )
  }
  useEffect(() => {
    if (Announce.length == 0)
      return;

      //console.log(Announce[0].image_url)
      /*
      Object.assign(Announce[0], {
        image : "data:image/png;base64," + 
        btoa(String.fromCharCode.apply(null, new Uint8Array(Announce[0].image_url.data)))
      })
  */

  }, [Announce])

  function NewsList() {

    function onShow(id, show) {
      
      setAnnounce({ id : !show})

    }
    return (
      Announce.map((news) => (
        <article className="news" key={news.number}>
          <div className='title'>
            <h2>{news.title}</h2>
            <h3>{news.date}</h3>
          </div>

          <div className='content'>
            {!news.isShow && <img src={news.image} alt='scholarship promote'/>}
            {news.isShow && <h3>{news.detail}</h3>}
          </div> 

          <div className='bottom'>
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
      
      <div className="newslist">
        <NewsList/>
      </div>
    </div>
  );
}

export default Announcement;
