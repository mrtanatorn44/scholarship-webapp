import { React, useState, useEffect, useContext } from 'react';
import './AnnouncementEdit.css';
import Axios from 'axios';
import announce_empty        from "../images/announce_empty.png";
import ConfirmSaveModal from '../modals/ConfirmModal.js';
import ConfirmCancelModal from '../modals/ConfirmModal.js';
import { WebContext } from '../App';

function AnnouncementEdit(props) {
  const { EditAnnounceID } = useContext(WebContext)
  const [editAnnounceID, setEditAnnounceID] = EditAnnounceID;
  const [showModalSave, setShowModalSave] = useState(false);
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [form, setForm] = useState({
    title: "X",
    detail: "",
    image: "",
    image_name: ""
  })

  function getAnnounce() {
    Axios.post("http://localhost:5000/getAnnounce", {
        id : editAnnounceID
      }).then((response)=> { 
        var result =  response.data[0];
        console.log(result)
        if (result.length === 0) {
          result = [{ number: 0, 
            title: "ไม่มีประกาศ", 
            image: announce_empty,
            detail : "ว่าง", date: "0-0-0T00-00-00", isShow: false}]
            setForm(result)
          return;
        }  
        console.log("data:image/png;base64," + _arrayBufferToBase64(result.image_url.data));      

        setForm(
          {
            ...form,
            title: result.title,
            detail: result.detail,
            image : "data:image/png;base64," + _arrayBufferToBase64(result.image_url.data), // blob to image
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
    return binary;
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
      console.log(binImage);
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
      
      Axios.post("http://localhost:5000/EditAnnounce", { 
        id:editAnnounceID,
        title : title,
        detail : detail,
        image : image,
        image_name : image_name
      }).then(
        (response) => {
          console.log(response);
          console.log('add image done')
        }
      );
      props.sendContent(['admin','Announcement']);

    }
    setShowModalSave(false);
    
  }

  function getConfirmCancel(data) {
    if (data) {
      props.sendContent(['admin','Announcement']);
    } 
    setShowModalCancel(false);
  }

  return (
    <div className="announcementEdit">
      <div className="header d-flex">
        <div className="column-left d-flex">
          <div className="icon-plus">
            <i className="bi bi-plus-lg"/>
          </div>
          <h4>เพิ่มข่าวสาร</h4>
        </div>

        <div className="column-right d-flex">
          <button className="save-button" onClick={() => (setShowModalSave(true))}>
            <i className="bi bi-save"/>
          </button>
          { showModalSave && <ConfirmSaveModal sendConfirm={getConfirmSave}/> }
          <button className="cancel-button" onClick={() => (setShowModalCancel(true))}>
            <i className="bi bi-x"/>
          </button>
          { showModalCancel && <ConfirmCancelModal sendConfirm={getConfirmCancel}/> }
        </div>
      </div>
      <div className="center d-flex">
        <form>
          <div className="topic d-flex">
            <input type="text" placeholder="หัวข้อข่าว" value={form.title} onChange={(e) => { setForm({ ...form, title: e.target.value })}}/>
          </div>
          <div className="detail">
            <input type="text" placeholder="รายละเอียดข่าวสาร" value={form.detail} onChange={(e) => {setForm({...form, detail: e.target.value })}}/>
          </div>
          <div className="add-row-bottom d-flex">
            <div className="insertbutton d-flex">
              <input class="insert" type="file" name="file" id="file" onChange={(file) => onHandleUpload(file)}/>
              <label for="file"> <i class="bi bi-card-image"/> </label>
              <p>{ form.image_name===""? "เพิ่มรูปภาพ": form.image_name }</p>
            </div>
          </div>
        </form>
      </div> 
      <img src={ "data:image/png;base64," + form.image }/>
      <img src={ form.image }/>
    </div>
  );
}

export default AnnouncementEdit;
