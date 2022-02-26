import React, { useState, useContext } from 'react';
import { WebContext } from '../App';
import Axios from 'axios';

import './AnnouncementCreate.css';
import announce_empty        from "../images/announce_empty.png";

import ConfirmSaveModal from '../modals/ConfirmModal.js';
import ConfirmCancelModal from '../modals/ConfirmModal.js';
import AlertModal from '../modals/AlertModal.js';

function AnnouncementCreate(props) {
  const { Content, EditAnnounceID } = useContext(WebContext)
  const [ content, setContent] = Content;

  const [showModalSave, setShowModalSave] = useState(false);
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);

  const [form, setForm] = useState({
    title: "",
    detail: "",
    image: "",
    image_name: ""
  })
  function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  function onHandleUpload(e) {
    var file = e.target.files[0];
    console.log('file: ', file.name)

    var arrayBuffer;
    var reader = new FileReader();
    reader.onload = async function() {
      arrayBuffer = await new Uint8Array(reader.result);
      var res = reader.result;
      var binImage = _arrayBufferToBase64(arrayBuffer);
      //src={'data:image/jpeg;base64,' + bufferToBase64( data.fileImg.data )}
      setForm({...form,
        image:  binImage,
        image_name: file.name
      })
    }
    reader.readAsArrayBuffer(file); 
    
  }
  function getConfirmSave(data) {
    if (data) {
      const { title, detail, image, image_name } = form;
      if (title == "" || detail == "") {
        alert('title and detail cant be null')
        return;
      }
      Axios.post("http://localhost:5000/addAnnounce", {
        title : title,
        detail : detail,
        image : image,
        image_name : image_name
      }).then(
        (response) => {
          setShowModalAlert(true);
        }
      );
    }
    setShowModalSave(false);
  }
  function getConfirmCancel(data) {
    if (data) {
      setContent('Announcement');
    } 
    setShowModalCancel(false);
  }
  function getConfirmAlert(isConfirm) {
    if (isConfirm) {
      setShowModalAlert(false)
      setContent('Announcement');
    }
  }
  return (
    <div className="frame-content">
      <div className="head-content d-flex">
        <div  className="announCre-column-left d-flex">
          <div className="icons">
            <i className="bi bi-plus-lg"/>
          </div>
          <div className="topic">
            <h4>เพิ่มข่าวสาร</h4>
          </div>
        </div>
        <div className="announCre-column-right d-flex">
          <div class="button2-set">
            <button className="save-button" onClick={() => (setShowModalSave(true))}>
              <i className="bi bi-save"/>
            </button>
            { showModalSave && <ConfirmSaveModal sendConfirm={getConfirmSave}/> }
            { showModalAlert && <AlertModal text2='บันทึกเรียบร้อย' iconIndex={0} sendConfirm={getConfirmAlert}/>}
            <button className="cancel-button" onClick={() => (setShowModalCancel(true))}>
              <i className="bi bi-x"/>
            </button>
            { showModalCancel && <ConfirmCancelModal sendConfirm={getConfirmCancel}/> }
          </div>
        </div>
      </div>
      <div className="announCre-center d-flex">
        <form>
          <div className="topic d-flex">
            <input type="text" placeholder="หัวข้อข่าว" onChange={(event) => {setForm({ ...form, title: event.target.value })}}/>
          </div>
          <div className="detail">
            <input type="text" placeholder="รายละเอียดข่าวสาร" onChange={(event) => {setForm({ ...form, detail: event.target.value })}}/>
          </div>
          <div className="announCre-row-bottom d-flex">
            <div className="date">
              <input type="text" placeholder="วัน/เดือนปี ที่ลงข่าว"></input>
            </div>
            <div className="insertbutton d-flex">
              <input class="insert"  type="file" name="file" id="file"  onChange={(file) => onHandleUpload(file)}/>
              <label for="file">
                <i class="bi bi-card-image"/>
              </label>
              <p>{ form.image_name===""? "เพิ่มรูปภาพ": form.image_name }</p>
            </div>
          </div>
        </form>
      </div> 
   
    </div>
  
  )
}

export default AnnouncementCreate;
