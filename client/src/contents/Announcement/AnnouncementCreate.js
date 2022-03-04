import React, { useState, useContext } from 'react';
import { WebContext } from '../../App';
import Axios from 'axios';
import announce_empty from "../../data/images/announce_empty.png";

// Alert & Image Modal
import Swal from 'sweetalert2'
import Lightbox from 'react-image-lightbox';

function AnnouncementCreate(props) {
  const { User, Content, EditAnnounceID } = useContext(WebContext)
  const [ content, setContent] = Content;
  const [ user, setUser ] = User;

  var month_th      = ["", "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
  var today         = new Date();
  var date_tranform = "วันที่ " + (today.getDate()) + " " + month_th[today.getMonth() + 1] + " " + (today.getFullYear() + 543);

  const [form, setForm] = useState({
    title         : '',
    detail        : '',
    dateFormat    : '',
    imageSrc      : announce_empty,
    imageData     : '',
    imageName     : '',
    imageModal    : false,
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
    console.log(file)
    var arrayBuffer;
    var reader = new FileReader();
    reader.onload = async function() {
      arrayBuffer = await new Uint8Array(reader.result);
      var res = reader.result;
      var binImage = _arrayBufferToBase64(arrayBuffer);
      console.log(file.name)
      setForm({...form,
        imageSrc   : 'data:image/jpeg;base64,' + binImage,
        imageData  : binImage,
        imageName  : file.name,
      })
    }
    reader.readAsArrayBuffer(file); 
  }
  const onHandleSubmitBtn = (e) => {
    e.preventDefault();
    if (form.title === "" || form.detail === "") { 
      Swal.fire('กรอกข้อมูลไม่ครบ!', 'หัวข้อและรายละเอียดไม่สามารถว่างได้', 'warning')
    } else {
      Swal.fire({
        title: 'คุณแน่ใจหรือไม่?',
        text: 'ที่จะบันทึกประกาศนี้!',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#03A96B',
        confirmButtonText: 'Save',
        cancelButtonColor: '#A62639',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          if (user.role === 'admin') {
            Axios.post("http://localhost:5000/addAnnounce", {
              title       : form.title,
              detail      : form.detail,
              imageData   : form.imageData,
              imageName   : form.imageName
            }).then((response) => {
              setContent('Announcement');
              Swal.fire('บันทึกแล้ว!', '', 'success')
            });
          }
        }
      })
    }
  }
  const onHandleCancelBtn = () => {
    Swal.fire({
      title: 'คุณแน่ใจไหม?',
      text: "ที่จะยกเลิกการสร้างประกาศนี้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#03A96B',
      confirmButtonText: 'Leave',
      cancelButtonColor: '#A62639',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setContent('Announcement');
        Swal.fire('ยกเลิกการสร้างประกาศ!','','success')
      }
    })
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
            <button form='announce-form' type='submit' className="save-button" >
              <i className="bi bi-save"/> <p>บันทึก</p>
            </button>
            <button className="cancel-button" onClick={() => onHandleCancelBtn()}>
              <i className="bi bi-x"/> <p>ยกเลิก</p> 
            </button>
          </div>
        </div>
      </div>

      {/* ----- Content ----- */}
      <div className="announCre-center">

        {/* ----- Form ------ */}
        <form id='announce-form' onSubmit={(e) => onHandleSubmitBtn(e)}>
          <div className="topic-input d-flex">
            <input required type="text" placeholder="หัวข้อข่าว" onChange={(event) => {setForm({ ...form, title: event.target.value })}}/>
          </div>
          <div className="detail">
            <textarea required type="text" placeholder="รายละเอียดข่าวสาร" onChange={(event) => {setForm({ ...form, detail: event.target.value })}}/>
          </div>
          <div className="insertbutton">
            <label>
              <input className="insert" type="file" accept="image/*" name="file" id="file" onChange={(file) => onHandleUpload(file)} onClick={(e) => e.target.value=''}/>
              <i className="bi bi-card-image"/>
            </label>
            <p> {form.imageName===""? "เพิ่มรูปภาพ": form.imageName } </p>
            { form.imageName!=='' && <button className="cancel-button" onClick={() => setForm({...form, imageSrc: '', imageData: '', imageName: ''})}><i className="bi bi-x"/></button> }
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
            !form.toggleContent && form.imageName!=='' &&
            <div className='content-image'>
              <img  className='news-image' src={ form.imageSrc } alt='scholarship promote' 
                onClick = {() => { form.imageModal = true; setForm([...form]); }}/> 
            </div> 
          }
          { /* DETAIL */
            form.toggleContent && 
            <div style={{whiteSpace:'pre-line'}} className='content'><h3>{ form.detail }</h3></div> 
          }
          { /* MODAL POPUP IMAGE */
            form.imageModal && 
            <Lightbox mainSrc={ form.imageSrc } onCloseRequest={() => { form.imageModal = false; setForm([...form]); }}/>
          }
          {/*---------- BOTTOM ----------*/}
          <div className='newsList-bottom'>
            <div className='admin-panel'>
            </div>
            <div className='user-panel'>
              { /* USER BUTTON */
                form.imageName!=='' &&
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
