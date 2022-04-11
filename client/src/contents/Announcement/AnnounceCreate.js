import React, { useState, useContext } from 'react';
import { WebContext } from '../../App';
import Axios from 'axios';

// Alert & Image Modal
import Swal from 'sweetalert2'
import Lightbox from 'react-image-lightbox';

function AnnounceCreate(props) {
  const { User, Content, Announce } = useContext(WebContext)
  const         [ user, setUser ] = User;
  const   [ content, setContent ] = Content;
  const [ announce, setAnnounce ] = Announce;
  
  var month_th      = ["", "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
  var today         = new Date();
  var date_tranform = "วันที่ " + (today.getDate()) + " " + month_th[today.getMonth() + 1] + " " + (today.getFullYear() + 543);

  const [form, setForm] = useState({
    title         : '',
    detail        : '',
    dateFormat    : '',
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
    if (file.size <= 1048576) {
      var arrayBuffer;
      var reader = new FileReader();
      reader.onload = async function() {
        arrayBuffer = reader.result;
        setForm({
          ...form,
          imageData : _arrayBufferToBase64(arrayBuffer),
          imageName : file.name,
        })
      }
      reader.readAsArrayBuffer(file); 
    } else {
      Swal.fire('Limit Image Size!', 'รูปต้องมีขนาดไม่เกิน 1Mb', 'warning')
    }
  }

  function onHandleSubmitBtn(e) {
    e.preventDefault();
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
      if (result.isConfirmed && user.role === 'admin') {
        Axios.post("http://localhost:5000/addAnnounce", {
          title       : form.title,
          detail      : form.detail,
          imageData   : form.imageData,
          imageName   : form.imageName
        }).then((response) => {
          if (response.data.errno) { // Check if Backend return error
            Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
            return;
          }
          console.log(form.imageData)
          setAnnounce([]);
          setContent('Announcement');
          Swal.fire('Success!', 'บันทึกประกาศเรียบร้อย', 'success')
        });
      }
    })
  }

  function onHandleCancelBtn() {
    Swal.fire({
      title : 'Leave this Page?',
      text  : "ข้อมูลจะไม่ถูกบันทึก",
      icon  : 'warning',
      showCancelButton    : true,
      confirmButtonColor  : '#03A96B',
      confirmButtonText   : 'Leave',
      cancelButtonColor   : '#A62639',
      cancelButtonText    : 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setContent('Announcement');
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
          <div className="button-set">
            <button className="button-1 green1" form='announce-form' type='submit'>
              <i className="bi bi-save"/> 
              <p>บันทึก</p>
            </button>
            <button className="button-1 red1" onClick={onHandleCancelBtn}>
              <i className="bi bi-x"/> 
              <p>ยกเลิก</p> 
            </button>
          </div>
        </div>
      </div>

      <div className="contents">
        {/* ----- Content ----- */}
        <div className="content1">
          {/* ----- Form ------ */}
          <form className="form1" id='announce-form' onSubmit={(e) => onHandleSubmitBtn(e)}>
            <div className="heading">
              <input
                required 
                type="text" 
                placeholder="หัวข้อข่าว" 
                onChange={(e) => 
                  setForm({ ...form, title: e.target.value })
                }
              />
            </div>
            <div className="detail">
              <textarea 
                required 
                type="text" 
                placeholder="รายละเอียดข่าวสาร" 
                onChange={(e) => 
                  setForm({ ...form, detail: e.target.value })
                }
              />
            </div>
            <div className="insertbutton">
              <label className="green1" >
                <input 
                  id="file" 
                  className="insert green1" 
                  type="file" 
                  accept="image/jpeg, image/png" 
                  name="file" 
                  onChange={(file) => 
                    onHandleUpload(file)
                  } 
                  onClick={(e) => 
                    e.target.value=''
                  }
                />
                <i className="bi bi-card-image"/>
              </label>
              <p> {form.imageName===""? "เพิ่มรูปภาพ": form.imageName } </p>
              { 
                form.imageName!=='' && 
                <button 
                  className="button-circle red1"  
                  onClick={() => 
                    setForm({...form, imageSrc: '', imageData: '', imageName: ''})
                  }
                >
                  <i className="bi bi-x"/>
                </button> 
              }
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
                <img  className='news-image' src={ 'data:image/jpeg;base64,' + form.imageData } alt='scholarship promote' 
                  onClick = {() => { form.imageModal = true; setForm({...form}); }}/> 
              </div> 
            }
            { /* DETAIL */
              form.toggleContent && 
              <div style={{whiteSpace:'pre-line'}} className='content'><h3>{ form.detail }</h3></div> 
            }
            { /* MODAL POPUP IMAGE */
              form.imageModal && 
              <Lightbox mainSrc={ 'data:image/jpeg;base64,' + form.imageData } onCloseRequest={() => { form.imageModal = false; setForm({...form}); }}/>
            }
            {/*---------- BOTTOM ----------*/}
            <div className='bottom1'>
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
        
    </div>
  )
}

export default AnnounceCreate;
