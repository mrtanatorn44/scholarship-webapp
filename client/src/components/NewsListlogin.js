import { React, useState, useEffect } from 'react';
import Axios from 'axios';

import ImageModal from "../modals/ImageModal.js";

import announce_empty from "../images/announce_empty.png";

function NewsListlogin(props) {
  const [announce,setAnnounce] = useState([]);

  const [ShowPopupImage, setShowPopupImage] = useState(false);
  const [PopupImage, setPopupImage] = useState();

  function base64ArrayBuffer(arrayBuffer) {
    var base64    = ''
    var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  
    var bytes         = new Uint8Array(arrayBuffer)
    var byteLength    = bytes.byteLength
    var byteRemainder = byteLength % 3
    var mainLength    = byteLength - byteRemainder
  
    var a, b, c, d
    var chunk
  
    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
      // Combine the three bytes into a single integer
      chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]
  
      // Use bitmasks to extract 6-bit segments from the triplet
      a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
      b = (chunk & 258048)   >> 12 // 258048   = (2^6 - 1) << 12
      c = (chunk & 4032)     >>  6 // 4032     = (2^6 - 1) << 6
      d = chunk & 63               // 63       = 2^6 - 1
  
      // Convert the raw binary segments to the appropriate ASCII encoding
      base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
    }
  
    // Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
      chunk = bytes[mainLength]
  
      a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2
  
      // Set the 4 least significant bits to zero
      b = (chunk & 3)   << 4 // 3   = 2^2 - 1
  
      base64 += encodings[a] + encodings[b] + '=='
    } else if (byteRemainder == 2) {
      chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]
  
      a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
      b = (chunk & 1008)  >>  4 // 1008  = (2^6 - 1) << 4
  
      // Set the 2 least significant bits to zero
      c = (chunk & 15)    <<  2 // 15    = 2^4 - 1
  
      base64 += encodings[a] + encodings[b] + encodings[c] + '='
    }
    
    return base64
  }

  const getAnnounce = () =>{
    Axios.get("http://localhost:5000/getAllAnnounce").then(async(response)=> { 
      var result = response.data;
      if (result.length === 0) {
        result = [{ 
          isEmpty: true,
          number: 0, 
          title: "ไม่มีประกาศในขณะนี้", 
          image: announce_empty,
          toggleContent: false,
          imageIsEmpty: false
        }]
      } else {
        var idx = 0
        result.forEach( (res) => {
          // mysql date_format to human date_format
          var month_th      = ["", "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
          var dmy           = res.date.split("T")[0].split("-").reverse();
          var date_tranform = "วันที่ " + (parseInt(dmy[0])) + " " + month_th[parseInt(dmy[1], 10)] + " " + (parseInt(dmy[2]) + 543);
          
          var binaryImage   = ''; // ArrayBuffer to Base64
          var bytes         = new Uint8Array( res.image_url.data );
          var len           = bytes.byteLength;
          for (var i = 0; i < len; i++) { binaryImage += String.fromCharCode( bytes[ i ] ); }
          
          Object.assign(res, {
            isEmpty       : false,
            number        : idx++,
            image         : "data:image/png;base64," + binaryImage, // blob to image
            imageIsEmpty  : res.image_url.data.length===0 ? true : false,
            toggleContent : res.image_url.data.length===0 ? true : false,
            date_format   : date_tranform
          })
        });
      }
      setAnnounce(result)
    })
  }
  useEffect( () => {
    getAnnounce();
  }, [])

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
    announce.map((news) => (
      <div className="news" key={news.number}>
        {/*---------- TITLE ----------*/}
        <div className='title'>
          <h2>{news.title}</h2>
          <h3>{news.date_format}</h3>
        </div>
        
        {/*---------- CONTENT ----------*/}
        { /* IMAGE */
          !news.toggleContent && !news.imageIsEmpty &&
          <div className='content-image'>
            <img  className='news-image' src={ news.image } alt='scholarship promote' 
              onClick = {() => onImageClick(news.image) }/> 
          </div> 
        }
        { /* DETAIL */
          news.toggleContent && 
          <div  style={{whiteSpace:'pre-line'}} className='content'><h3>{ news.detail }</h3></div> 
        }
        { /* MODAL POPUP IMAGE */
          ShowPopupImage && 
          <ImageModal image={ PopupImage } sendConfirm={ (data) => setShowPopupImage(data) }/> 
        }

        {/*---------- BOTTOM ----------*/}
        <div className='newsList-bottom'>
          <div className='admin-panel'></div>
          <div className='user-panel'>
            { /* USER BUTTON */
              !news.imageIsEmpty && !news.isEmpty &&
              <h3 onClick={() => onToggleContentClick(news.number) }>
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

