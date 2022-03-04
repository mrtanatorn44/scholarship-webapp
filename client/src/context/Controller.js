/*eslint-disable */

import React, { useContext, useEffect, useState } from 'react'
import { WebContext } from './WebContext';
import Axios from 'axios';

import announce_empty from "../data/images/announce_empty.png";

function Controller() {
  const { User, Content, Announce, Profile, Scholar, EditProfileID, Query, ScholarshipCreate, EditAnnounceID} = useContext(WebContext);
  const [ content, setContent ]   = Content;
  const [ announce, setAnnounce ] = Announce;
  const [ scholar, setScholar ] = Scholar;
  
  const [scholarshipCreate, setScholarshipCreate] = ScholarshipCreate;
  const [query, setQuery]  = Query;                           
  const [editProfileID, setEditProfileID] = EditProfileID;          
  const [editAnnounceID, setEditAnnounceID] = EditAnnounceID;                              
  const [profile, setProfile] = Profile;                       
  
  


  // save & get "content-page" with localStorage
  useEffect(() => {
    localStorage.removeItem("todos")
    localStorage.removeItem("rememberMe")
    if (content === '') {
      const localContent = localStorage.getItem('content');
      if (localContent === '') {
        setContent('Announcement');
      } else {
        setContent(localContent);
      }
    }
    localStorage.setItem('content', content);
  }, [content])

  useEffect(() => {
    if (announce.length === 0) {
      console.log('Loading Announce...')

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
          result.forEach((res, index) => {
            var month_th      = ["", "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
            var dmy           = res.date.split("T")[0].split("-").reverse();
            var date_tranform = "วันที่ " + (parseInt(dmy[0])) + " " + month_th[parseInt(dmy[1], 10)] + " " + (parseInt(dmy[2]) + 543);
            
            var binaryImage   = ''; // ArrayBuffer to Base64
            var bytes         = new Uint8Array( res.image_data.data );
            var len           = bytes.byteLength;
            for (var i = 0; i < len; i++) { binaryImage += String.fromCharCode( bytes[ i ] ); }
            
            Object.assign(res, {
              isEmpty       : false,
              number        : index,
              image         : "data:image/png;base64," + binaryImage, // blob to image
              imageIsEmpty  : res.image_data.data.length===0 ? true : false,
              imageModal: false,
              toggleContent : res.image_data.data.length===0 ? true : false,
              date_format   : date_tranform
            });
          });
        }
        setAnnounce(result);
      })
    }
  }, [announce])

  return (<></>)
}

export default Controller;