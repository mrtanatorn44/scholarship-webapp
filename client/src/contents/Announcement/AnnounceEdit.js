import React, { useState, useContext, useEffect } from 'react';
import { WebContext } from '../../App';
import Axios from 'axios';

// Alert & Image Modal
import Swal from 'sweetalert2'
import Lightbox from 'react-image-lightbox';

function AnnounceEdit(props) {
  const { User, Content, Announce } = useContext(WebContext)
  const         [ user, setUser ] = User;
  const   [ content, setContent ] = Content;
  const [ announce, setAnnounce ] = Announce;

  const [form, setForm] = useState({
    title         : '',
    detail        : '',
    dateFormat    : '',
    image         : '',
    imageName     : '',
    imageModal    : false,
    toggleContent : true,
  })

  /*
  date: "2022-03-09T00:41:17.000Z"
  dateFormat: "วันที่ 9 มีนาคม 2565"
  detail: "test\ns\nets\nets\net\nsetset"
  id: 225
  image: "data:image/png;base64,/9j/4QAWRXhpZgAATU0AKgAAAAg
  imageIsEmpty: false
  imageModal: false
  image_data: {type: 'Buffer', data: Array(144092)}
  image_name: "58649 (1).jpg"
  isEmpty: false
  number: 0
  title: "ดเ้ดเ้ด"
  toggleContent: false
  */
  function getAnnounceTarget() {
    var announceID = parseInt(localStorage.getItem('announceEditID_target'));
    var announceTarget = announce.filter(obj => {
      return obj.id === announceID;
    })
    if (announceTarget.length === 0) { // Check announce is not null
      Swal.fire('Error!','Something went wrong, please try again!','warning');
      console.log('Announce ID : ', announceID);
      setContent('Announcement');
      return;
    }
    setForm({
      ...form, 
      id          : announceTarget[0].id,
      title       : announceTarget[0].title,
      detail      : announceTarget[0].detail,
      imageSrc    : announceTarget[0].imageSrc,
      imageName   : announceTarget[0].imageName,
      imageData   : announceTarget[0].imageData,
      dateFormat  : announceTarget[0].dateFormat,
    })
  }
  useEffect(() => {
    getAnnounceTarget();
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
    var file = e.target.files[0];
    if (file.size <= 1048576) {
      var arrayBuffer;
      var reader = new FileReader();
      reader.onload = async function() {
        arrayBuffer = reader.result;
        setForm({
          ...form,
          imageSrc  : 'data:image/jpeg;base64,' + _arrayBufferToBase64(arrayBuffer),
          imageData :  _arrayBufferToBase64(arrayBuffer),
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
        Axios.post("http://localhost:5000/editAnnounce", {
          id          : form.id,
          title       : form.title,
          detail      : form.detail,
          imageData   : form.imageName === '' ? '' : form.imageData,
          imageName   : form.imageName
        }).then((response) => {
          if (response.data.errno) { // Check if Backend return error
            console.log(response.data)
            Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
            return;
          }
          // if not error do thing
          setAnnounce([]);
          setContent('Announcement');
          localStorage.setItem('announceEditID_target', '')
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
        localStorage.setItem('announceEditID_target', '')
        setContent('Announcement');
      }
    })
  }
  
  return (
    <div className="frame">
      <div className="header">
        <div  className="left">
          <div className="icons"><i className="bi bi-plus-lg"/></div>
          <div className="topic"><h4>แก้ไขข่าวสาร</h4></div>
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
              <input required type="text" defaultValue={form.title} placeholder="หัวข้อข่าว" onChange={(e) => setForm({ ...form, title: e.target.value })}/>
            </div>
            <div className="detail">
              <textarea required type="text" defaultValue={form.detail} placeholder="รายละเอียดข่าวสาร" onChange={(e) => setForm({ ...form, detail: e.target.value })}/>
            </div>
            <div className="insertbutton">
              <label className="green1" >
                <input className="insert" type="file" accept="image/jpeg, image/png" name="file" id="file" onChange={(file) => onHandleUpload(file)} onClick={(e) => e.target.value=''}/>
                <i className="bi bi-card-image"/>
              </label>
              <p> {form.imageName===""? "เพิ่มรูปภาพ": form.imageName } </p>
              { /* DELETE IMAGE BTN */
                form.imageName!=='' && 
                <button className="button-circle red1" onClick={() => setForm({...form, imageSrc: '', imageData: '', imageName: ''})}>
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
              <h3>{form.dateFormat}</h3>
            </div>
            {/*---------- CONTENT ----------*/}
            { /* IMAGE */
              !form.toggleContent && form.imageName!=='' &&
              <div className='content-image'>
                <img className='news-image' src={form.imageSrc} alt='scholarship promote' 
                  onClick = {() => { form.imageModal = true; setForm({...form}); }}/> 
              </div> 
            }
            { /* DETAIL */
              form.toggleContent && 
              <div style={{whiteSpace:'pre-line'}} className='content'><h3>{ form.detail }</h3></div> 
            }
            { /* MODAL POPUP IMAGE */
              form.imageModal && 
              <Lightbox mainSrc={form.imageSrc} onCloseRequest={() => { form.imageModal = false; setForm({...form}); }}/>
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

export default AnnounceEdit;
