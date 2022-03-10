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
  }, [content])

  // Handle 'scholarshipForm' localStorage
  useEffect(() => {
    if (scholarshipForm === '') {
      const localContent = localStorage.getItem('scholarshipForm');
      console.log('local', localContent)
      if (localContent === '' || localContent === undefined) {
        setScholarshipForm([]);
      } else {
        console.log(JSON.parse(localContent))
        setScholarshipForm([JSON.parse(localContent)]);
      }
    }
    localStorage.setItem('scholarshipForm', JSON.stringify(scholarshipForm));
  }, [scholarshipForm])

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
            isEmpty: true,
            number: 0, 
            title: "ไม่มีประกาศในขณะนี้", 
            image: announce_empty,
            imageIsEmpty: false,
            imageModal: false,
            toggleContent: false,
          }]
        } else {
          var month_th      = ["", "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
          result.forEach((res, index) => {
            var dmy           = res.date.split("T")[0].split("-").reverse();
            var binaryImage   = arrayBufferToBase64(res.image_data.data);
            Object.assign(res, {
              isEmpty       : false,
              number        : index,
              image         : "data:image/png;base64," + binaryImage, // blob to image
              imageIsEmpty  : res.image_data.data.length===0 ? true : false,
              imageModal: false,
              toggleContent : res.image_data.data.length===0 ? true : false,
              dateFormat   : "วันที่ " + (parseInt(dmy[0])) + " " + month_th[parseInt(dmy[1], 10)] + " " + (parseInt(dmy[2]) + 543)
            });
          });
        }
        setAnnounce(result);
        var end = new Date().getTime();
        var time = end - start;
        console.log('Loading Announce done', time, 'ms')

      })
    }
  }, [announce])

  return null;
}

export default Main