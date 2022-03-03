import React, { useState, useContext } from 'react';
import { WebContext } from '../App';
import Axios from 'axios';
import announce_empty        from "../images/announce_empty.png";

import ImageModal from "../modals/ImageModal.js";
import ConfirmSaveModal from '../modals/ConfirmModal.js';
import ConfirmCancelModal from '../modals/ConfirmModal.js';
import AlertModal from '../modals/AlertModal.js';

function AnnouncementCreate(props) {
  const { Content, EditAnnounceID } = useContext(WebContext)
  const [ content, setContent] = Content;

  const [showModalSave, setShowModalSave] = useState(false);
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);

  const [ShowPopupImage, setShowPopupImage] = useState(false);
  const [PopupImage, setPopupImage] = useState();
  var month_th      = ["", "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
  var today = new Date();
  var date_tranform = "วันที่ " + (today.getDate()) + " " + month_th[today.getMonth() + 1] + " " + (today.getFullYear() + 543);

  const [form, setForm] = useState({
    title         : '',
    detail        : '',
    date_format   : '',
    image_src     : announce_empty,
    image_data    : '',
    image_name    : '',
    toggleContent : true,
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

    var arrayBuffer;
    var reader = new FileReader();
    reader.onload = async function() {
      arrayBuffer = await new Uint8Array(reader.result);
      var res = reader.result;
      var binImage = _arrayBufferToBase64(arrayBuffer);
      console.log(file.name)
      setForm({...form,
        image_src   : 'data:image/jpeg;base64,' + binImage,
        image_data  : binImage,
        image_name  : file.name,
      })
    }
    reader.readAsArrayBuffer(file); 
  }
  const checkForm = () => {
    const { title, detail } = form;
    if (title === "" || detail === "") {
      alert('News title and detail can\'t be empty!')
    } else {
      setShowModalSave(true);
    }
  }
  function getConfirmSave(isConfirm) {
    if (isConfirm) {
      const { title, detail, image_data, image_name } = form;
      Axios.post("http://localhost:5000/addAnnounce", {
        title       : title,
        detail      : detail,
        image       : image_data,
        image_name  : image_name
      }).then((response) => {
        console.log(response)
        setContent('Announcement');
      });
    }
    setShowModalSave(false);
  }
  function getConfirmCancel(data) {
    if (data) {
      setContent('Announcement');
    } 
    setShowModalCancel(false);
  }
  const onImageClick = (image) => {
    setPopupImage(image);
    setShowPopupImage(true);
  }
  
  return (
    <div className="frame">
      <div className="header">
        <div  className="left">
          <div className="icons"><i className="bi bi-plus-lg"/></div>
          <div className="topic"><h4>เพิ่มข่าวสาร</h4></div>
        </div>
        <div className="right">
          <div className="button2-set">
            <button className="save-button" onClick={() => (checkForm())}>
              <i className="bi bi-save"/> <p>บันทึก</p>
            </button>
            { showModalSave && <ConfirmSaveModal sendConfirm={getConfirmSave}/> }
            <button className="cancel-button" onClick={() => (setShowModalCancel(true))}>
              <i className="bi bi-x"/> <p>ยกเลิก</p> 
            </button>
            { showModalCancel && <ConfirmCancelModal sendConfirm={getConfirmCancel}/> }
          </div>
        </div>
      </div>

      {/* ----- Content ----- */}
      <div className="announCre-center">

        {/* ----- Form ------ */}
        <form>
          <div className="topic-input d-flex">
            <input type="text" placeholder="หัวข้อข่าว" onChange={(event) => {setForm({ ...form, title: event.target.value })}}/>
          </div>
          <div className="detail">
            <textarea type="text" placeholder="รายละเอียดข่าวสาร" onChange={(event) => {setForm({ ...form, detail: event.target.value })}}/>
          </div>
          <div className="insertbutton">
            <label>
              <input className="insert" type="file" accept="image/*" name="file" id="file" onChange={(file) => onHandleUpload(file)}/>
              <i className="bi bi-card-image"/>
            </label>
            <p> {form.image_name===""? "เพิ่มรูปภาพ": form.image_name } </p>
            { form.image_name!=='' && <button className="cancel-button" onClick={() => setForm({...form, image: '', image_name: ''})}><i className="bi bi-x"/></button> }
          </div>
        </form>

        {/* ----- Preview ----- */} 
        <div className="preview">
          <h4>Preview</h4>
        </div>
        <div className="news">
          {/*---------- TITLE ----------*/}
          <div className='title'>
            <h2>{form.title}</h2>
            <h3>{date_tranform}</h3>
          </div>
          {/*---------- CONTENT ----------*/}
          { /* IMAGE */
            !form.toggleContent && form.image_name!=='' &&
            <div className='content-image'>
              <img  className='news-image' src={ form.image_src } alt='scholarship promote' 
                onClick = {() => onImageClick(form.image_src) }/> 
            </div> 
          }
          { /* DETAIL */
            form.toggleContent && 
            <div style={{whiteSpace:'pre-line'}} className='content'><h3>{ form.detail }</h3></div> 
          }
          { /* MODAL POPUP IMAGE */
            ShowPopupImage && 
            <ImageModal image={ PopupImage } sendConfirm={ (data) => setShowPopupImage(data) }/> 
          }
          {/*---------- BOTTOM ----------*/}
          <div className='newsList-bottom'>
            <div className='admin-panel'>
            </div>
            <div className='user-panel'>
              { /* USER BUTTON */
                form.image_name!=='' &&
                <h3 onClick={() => setForm({...form, toggleContent: !form.toggleContent}) }>
                  { !form.toggleContent ? "รายละเอียดเพิ่มเติม (แสดง)" : "รายละเอียดเพิ่มเติม (ซ่อน)" }
                </h3> 
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementCreate;
