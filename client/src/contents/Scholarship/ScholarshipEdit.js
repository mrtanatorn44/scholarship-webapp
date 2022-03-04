/* eslint-disable */
import React, { useState, useContext } from 'react';
import { WebContext } from '../../App';
import ConfirmModal from '../../modals/ConfirmModal.js';
import Axios from 'axios';
import data from '../../data/datanews.js';


const AnnounceForm = (props) => {
  
  const [type, setType] = useState("");
  const [stdyears, setstdYears] = useState(0);
  const [detail, setDetail] = useState("");
  const [supporter, setSupporter] = useState("");
  const [price, setPrice] = useState(0);
  const [term, setTerm] = useState(0);
  
  const [scholar, setScholar]=useState({
    
   })
  
  
  const createSCLS = () => {
    Axios.post("http://localhost:5000/creatSCLS", {
      Type : type,
      stdYears : stdyears,
      Detail : detail,
      Supporter : supporter,
      Price : price
    })
  };

  return (
    <form >
      <div className="announce-topic ">
      
          <div className="type">
            <select name="capital" id="capital">
              <option value="">ประเภททุน</option>
              <option value="study">ทุนเรียนดี</option>
              <option value="activity">ทุนกิจกรรมเด่น</option>
              <option value="property">ทุนขาดคุณทรัพย์</option>
              <option value="other">ทุนอื่นๆ</option>
            </select>
          </div>
          
          <div className="year" >
            <input className="academic"  type="text" placeholder="ประจำปีการศึกษา" onChange={(event) => {setstdYears(event.target.value)}}></input>
          </div>
        
        <div className="term">
            <select  name="term" id="capital" onChange={(event) => {setTerm(event.target.value)}}>
              <option value="">ภาคการศึกษา</option>
              <option value="1">ภาคต้น</option>
              <option value="2">ภาคปลาย</option>
            </select>
          </div>  
        {/*<div className="button2-set d-flex">
          <button className="save-button " onClick={() => (setShowModal(true), alert('SAVE'))}>
            <i className="bi bi-save"></i>
          </button>
          
          
          <button className="cancel-button" onClick={() => (setShowModal(true), alert('CANCEL'))}>
            <i className="bi bi-x"></i>
          </button>

        </div>*/}
      </div>
        
      <div className="announce-center">
        <textarea className="detail" type="text" placeholder="คุณสมบัติของผู้รับทุน" onChange={(event) => {setDetail(event.target.value)}}></textarea>
      </div>

      <div className="announce-bottom">
        <div className="bottom-1">
          <div className="min">
            <input type="number" placeholder="min_student_year" onChange={(event) => {setSupporter(event.target.value)}}></input>
          </div>
          <div className="max">
            <input type="number" placeholder="max_student_year" onChange={(event) => {setPrice(event.target.value)}}></input>
          </div>
          <div className="sponsers">
            <input className="sponsers" type="text" placeholder="ผู้สนับสนุน" onChange={(event) => {setSupporter(event.target.value)}}></input>
          </div>
          <div className="amount">
            <input className="amount" type="number" placeholder="จำนวนเงิน" onChange={(event) => {setPrice(event.target.value)}}></input>
          </div>
        </div>
        <div className="bottom-2">
          <div className="date1">
            <label >วันที่เปิดให้ลงทะเบียน</label>
            <input type="date" placeholder="วันที่เปิดให้ลงทะเบียน" onChange={(event) => {setSupporter(event.target.value)}}></input>
          </div>
          <div className="date2">
            <label >วันที่ปิดการให้ลงทะเบียน</label>
            <input type="date" placeholder="วันที่ปิดการให้ลงทะเบียน" onChange={(event) => {setPrice(event.target.value)}}></input>
          </div>
        </div>
    </div>
    </form>
    
  )
}
// Component File form
const FileForm = () => {
  const [files, setFiles] = useState([{ id : 1, name : "", format :"" }]);
  const fileAutoFormat =[
    {
      title: 'สำเนาบัตรประชาชน',
      name: 'ID_62303xxx',
      type: 'pdf'
    },
    {
      title: 'ทะเบียนบ้าน',
      name: 'ทะเบียนบ้าน',
      type: 'pdf'
    },
    {
      title: 'เกรดเฉลี่ยสะสม',
      name: 'GPA_6230XXXX',
      type: 'pdf'
    }
  ]
  const delFile = (file) => {
    const id= file.id;
    setFiles(files.filter(file => file.id !== id));
    setFiles([...file])   
  }
  const addFile = () => {
    setFiles([...files, { id : files.length+1, name : "", format :"" }])
  }
  const handleInputChange = (e, index) => {
    let tempFiles = [...files];
    tempFiles[index][e.target.name] = e.target.value;
    setFiles(tempFiles);
  }

  return (
    <form>
      <div className = 'line-gray'></div>
      <div className="fileForm-head">
        <br></br>
        <h4>เอกสารประกอบการยื่นทุน</h4>
      </div>
      <div className="fileForm-title">
        <div className='fileForm-setTopic'>
         
          <p className='topics' > หัวข้อ</p>
          <p className='typefile'>&nbsp;&nbsp;นามสกุลไฟล์</p>
          <p className='document'>&nbsp;&nbsp;ระบบอัตโนมัติ</p>
        </div>

        <div className="fileForm-detail">
          { files.map((file, index) => (
            <div>
              <p className="fileForm-order" >ลำดับที่ {index+1}</p>
              <div className='fileForm-file d-flex'>
                <input className="file-document" 
                  key={index}
                  type="text" 
                  name="name"
                  value={file.name || ""}
                  onChange={(e) => handleInputChange(e, index)}
                />

                <select className="file-select-1">
                  <option value="type_file1">PDF</option>
                  <option value="type_file2">JPG</option>
                </select>

                <select className="file-select-2">
                  {
                    fileAutoFormat.map((format) =>
                      <option>{format.title}</option>
                    )
                  }
                </select>

                <button className="btn-delete-circle" type="button" onClick={() => delFile(file)}>
                  <i className="bi bi-dash"></i>
                </button>
              </div>

            </div>
          )) }
        </div>


        <div className="btn-add-scholarCre">
          <button className="btn-add-circle" type="button" onClick={() => addFile() }>
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>
    </form>
  );
}
// Component Rate form
const RateForm = () => {
  const [rateForms, setRateforms] = useState([{ id : 1, name : "", weigth : "0" }]);
  const fileAutoFormat =[
    {
      title: 'คะแนน(100.00%)',
      type: 'score',
    },
    {
      title: 'ผ่านไม่ผ่าน',
      type: 'pass',
    }
  ]
  const delrateForm = (rateForm) => {
    const id= rateForm.id;
    setRateforms(rateForms.filter(rateForm => rateForm.id !== id));
    setRateforms([...rateForm]) 
  }
  const addrateForm = () => {
    setRateforms([...rateForms, { id : rateForms.length+1, name : "", weigth : "0" }])
  }
  const handleInputChangeName = (e, index) => {
    let tempFiles = [...rateForms]
    tempFiles[index][e.target.name] = e.target.value;
    setRateforms(tempFiles);
  }

  const handleInputChangeWeigth = (e, index) => {
    let tempFiles = [...rateForms]
    tempFiles[index][e.target.name] = e.target.value;
    setRateforms(tempFiles);
  }

  return(
    <form>
      
      <div className="rateForm-head">
        <br></br>
        <h4>เกณฑ์การให้คะแนน</h4>
      </div>
      <div className="rateForm-title">
        <div className='rateForm-setTopic d-flex'>  
          <p className='topics'>หัวข้อ</p>
          <p className='typefile'>รูปแบบการให้คะแนน</p>
          <p className='document'>น้ำหนัก</p>
        </div>
      <div className="rateForm-detail">
      {
        rateForms.map((rateForm, index) => (
          <div >
            <p className="rateForm-order" >ลำดับที่ {index+1}</p>
            <input className="file-document"
                key={index}
                type="text" 
                name="name"
                value={rateForm.name || ""}
                onChange={(e) => handleInputChangeName(e, index)}
            />
            
            <select className="file-select-1">
              {
                fileAutoFormat.map((format) =>
                  <option>{format.title}</option>
                )
              }
            </select>

            <input className="file-select-2"
                key={index}
                type="number" min="0" max="100"
                name="weigth"
                value={rateForm.weigth || ""}
                onChange={(e) => handleInputChangeWeigth(e, index)}
            />
            
            <button className="btn-delete-circle" type="button" onClick={() => delrateForm(rateForm)}>
              <i className="bi bi-dash"></i>
            </button>
          </div>
        ))
        }
      </div>
      <div className="btn-add-scholarCre">
        <button className="btn-add-circle" type="button" onClick={() => addrateForm()}>
          <i class="bi bi-plus-lg"></i>
        </button>
      </div>
      </div>
    </form>
  )
}

function ScholarshipListEdit() {
   
  const { Content } = useContext(WebContext)
  const [content, setContent] = Content;
  const [showModal, setShowModal] = useState(false);

  function getConfirm(data) {
    if (data) {
      setContent("Scholarship")
    } else {
      //alert('FALSE !') 
    }
    setShowModal(false);
  }

  return (
    <div className="frame">
      <div className="header">
        <div  className="left">
            <div className="icons">  
              <i className="bi bi-plus-lg"></i>
            </div>
            <div className="topic">
              <h4>สร้างทุน</h4>
            </div>
        </div>
        <dev className="right"/>
      </div>

      <div className = 'content1'>

        <div className="scholarListCrea-announceForm"> <AnnounceForm/> </div>
        
        <div className='scholarListCrea-fileForm'> <FileForm/> </div>  

        <div className="scholarListCrea-rateForm"> <RateForm/></div> 
          

        <div class="scholarListCrea-footer">
          <div class="btn-confirm-scholarCre ">
            <button class="btn-confirm" type="submit" onClick={() => setShowModal(true)}>
              ตกลง
            </button>
            { showModal && <ConfirmModal sendConfirm={getConfirm}/>}
          </div>
        </div>
      </div>
    </div>
  )
}



export default ScholarshipListEdit;
