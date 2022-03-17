/*eslint no-unused-vars:*/

import React, { useContext, useEffect, useState } from 'react'
import { WebContext } from '../context/WebContext';
import Axios from 'axios';
import announce_empty from "../data/images/announce_empty.png";

function Main() {
  const     { ScholarshipForm, Content, Announce } = useContext(WebContext);
  const   [ content, setContent ] = Content;
  const [ announce, setAnnounce ] = Announce;
  const [scholarshipForm, setScholarshipForm] = ScholarshipForm;

  // Handle 'Content' localStorage
  useEffect(() => {
    if (content === '') {
      const localContent = localStorage.getItem('content');
      if (localContent === '' || localContent === undefined) {
        setContent('Announcement');
      } else {
        setContent(localContent);
      }
    }
    localStorage.setItem('content', content);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content])

  const arrayBufferToBase64 = (arrayBuffer) => {
    var CHUNK_SIZE = 8*1024;
    if (arrayBuffer.length <= CHUNK_SIZE)
      return String.fromCharCode.apply(null, arrayBuffer);
    var base64 = '';
    for (var i = 0; i < arrayBuffer.length; i += CHUNK_SIZE)
      base64 += String.fromCharCode.apply(null, arrayBuffer.slice(i, i+CHUNK_SIZE));
    return base64;
  }

  // Get Announce
  useEffect(() => {

    if (announce.length === 0) {
      console.log('Loading Announce...')
      var start = new Date().getTime();
      Axios.get("http://localhost:5000/getAllAnnounce").then((response) => { 
        var result = response.data;
        if (result.length === 0) {
          result = [{ 
            title         : "ไม่มีประกาศในขณะนี้", 
            isEmpty       : true,
            imageSrc      : announce_empty,
            imageIsEmpty  : false,
            imageModal    : false,
            toggleContent : false,
          }]
        } else {
          var month_th      = ["", "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
          result.forEach((res, index) => {
            var dmy           = res.date.split("T")[0].split("-").reverse();
            //console.log('idx:', index, 'size:', parseInt(JSON.stringify(res.image_data.data).length / 3.24 / 1024), 'KB', res )
            // Assign Usage Value
            Object.assign(res, {
              imageSrc      : 'data:image/jpeg;base64,' + arrayBufferToBase64(res.image_data.data),
              imageData     : arrayBufferToBase64(res.image_data.data),
              imageName     : res.image_name,
              imageIsEmpty  : res.image_data.data.length===0 ? true : false,
              imageModal: false,
              toggleContent : res.image_data.data.length===0 ? true : false,
              dateFormat   : "วันที่ " + (parseInt(dmy[0])) + " " + month_th[parseInt(dmy[1], 10)] + " " + (parseInt(dmy[2]) + 543)
            });
            // Delete Un-used Value
            delete res.date;
            delete res.image_data;
            delete res.image_name;
          });
        }
        setAnnounce(result);
        var end = new Date().getTime();
        var time = end - start;
        console.log('Loading Announce done', time, 'ms')
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [announce])

  return null;
}

export default Main