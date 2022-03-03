import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../App';
import Axios from 'axios';
import announce_empty from "../images/announce_empty.png";

import ConfirmSaveModal from '../modals/ConfirmModal.js';
import ConfirmCancelModal from '../modals/ConfirmModal.js';
import AlertModal from '../modals/AlertModal.js';

function AnnouncementEdit(props) {
  const { Content, EditAnnounceID } = useContext(WebContext)
  const [ content, setContent] = Content;
  const [editAnnounceID, setEditAnnounceID] = EditAnnounceID;

  const [showModalSave, setShowModalSave] = useState(false);
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);

  const [form, setForm] = useState({
    title: "",
    detail: "",
    image: "",
    image_name: "",
    oldimg:""
  })

  function getAnnounce() {
    Axios.post("http://localhost:5000/getAnnounce", {
        id : editAnnounceID
      }).then((response)=> { 
        var result =  response.data[0];   
        
        var binaryImage   = ''; // ArrayBuffer to Base64
        var bytes         = new Uint8Array( response.data[0].image_url.data );
        var len           = bytes.byteLength;
        for (var i = 0; i < len; i++) binaryImage += String.fromCharCode( bytes[ i ] );
        setForm(
          {
            ...form,
            title: result.title,
            detail: result.detail,
            image : "data:image/png;base64," + _arrayBufferToBase64(result.image_url.data), // blob to image
            imageData: result.image_url.data
          }
        )

      }
    )
  }
  useEffect(() => {
    getAnnounce();
  }, [])

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
    console.log("tam");
    var file = e.target.files[0];
    console.log('file: ', file.name)

    var arrayBuffer;
    var reader = new FileReader();
    reader.onload = async function() {
      arrayBuffer = await new Uint8Array(reader.result);
      var res = reader.result;
      console.log(reader.result);
      var binImage = _arrayBufferToBase64(arrayBuffer);
      //src={'data:image/jpeg;base64,' + bufferToBase64( data.fileImg.data )}
      console.log(binImage);
      setForm({...form,
        image:  binImage,
        image_name: file.name
      })
      
    }
    reader.readAsArrayBuffer(file); 
    
  }

  const onChangenews = (form,id) => {
    console.log(form.image);
    console.log(form.imageData)
    Axios.post("http://localhost:5000/editAnnounce", { 
      title :form.title,
      detail : form.detail,
      image_url: form.image_name === ''? form.imageData : form.image,
      id: id
    }).then((response)=>{
      console.log("OK");
    })
  }
  

  function getConfirmSave(isConfirm) {
    if (isConfirm) {
      onChangenews(form,editAnnounceID);
      setContent('Announcement');
    }
    setShowModalSave(false);
  }
  function getConfirmCancel(isConfirm) {
    if (isConfirm) {
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
    <div className="frame">
      <div className="header">
        <div className="left">
          <div className="icons">
            <i className="bi bi-plus-lg"/>
          </div>
          <div className="topic">
            <h4>แก้ไขข่าวสาร</h4>
          </div>
        </div>

        <div className="right">
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
      <div className="announEdit-center d-flex">
        <form>
          <div className="topic d-flex">
            <input type="text" placeholder="หัวข้อข่าว" value={form.title} onChange={(e) => { setForm({ ...form, title: e.target.value })}}/>
          </div>
          <div className="detail">
            <input type="text" placeholder="รายละเอียดข่าวสาร" value={form.detail} onChange={(e) => {setForm({...form, detail: e.target.value })}}/>
          </div>
          <div className="announEdit-row-bottom d-flex">
           
            <div className="insertbutton d-flex">
              <input class="insert" type="file" name="file" id="file" onChange={(file) => onHandleUpload(file)}/>
              <label for="file"> <i class="bi bi-card-image"/> </label>
              <p>{ form.image_name===""? "เพิ่มรูปภาพ": form.image_name }</p>
            </div>
          </div>
        </form>
      </div> 
        <img src={ "data:image/png;base64," + form.image }/>
    </div>
  );
}

export default AnnouncementEdit;
