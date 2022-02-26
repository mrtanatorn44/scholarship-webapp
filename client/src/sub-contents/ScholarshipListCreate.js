import { React, useState, useEffect } from 'react';
import './ScholarshipListCreate.css';
import ConfirmModal from '../modals/ConfirmModal.js';
import Axios from 'axios';
import data from '../data/datanews.js';

// Component Announce form
const AnnounceForm = (props) => {
  const [totalscore, setTotalscore] = useState(0);
  const [score, setscore] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("");
  const [stdyears, setstdYears] = useState(0);
  const [detail, setDetail] = useState("");
  const [supporter, setSupporter] = useState("");
  const [price, setPrice] = useState(0);

  
  function getConfirm(data) {
    if (data) {
      props.sendContent(['admin','ScholarshipList']);
    } else {
      //alert('FALSE !') 
    }
    setShowModal(false);
  }
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
      <div className="announce-topic d-flex">
        <input className="type" type="text" placeholder="ประเภททุน" onChange={(event) => {setType(event.target.value)}}></input>
        <input className="year"  type="text" placeholder="ประจำปีการศึกษา" onChange={(event) => {setstdYears(event.target.value)}}></input>
          
        <div className="button2-set d-flex">
          <button className="save-button " onClick={() => (setShowModal(true), alert('SAVE'))}>
            <i className="bi bi-save"></i>
          </button>
          {showModal && <ConfirmModal sendConfirm={getConfirm}/>}
          
          <button className="cancel-button" onClick={() => (setShowModal(true), alert('CANCEL'))}>
            <i className="bi bi-x"></i>
          </button>
          {showModal && <ConfirmModal sendConfirm={getConfirm}/>}
        </div>
      </div>
        
      <div className="announce-center">
        <input className="detail" type="text" placeholder="คุณสมบัติผู้รับทุน" onChange={(event) => {setDetail(event.target.value)}}></input>
      </div>

      <div className="announce-bottom">
        <div className="contributor">
          <input className="sponsers" type="text" placeholder="ผู้สนับสนุน" onChange={(event) => {setSupporter(event.target.value)}}></input>
          <input className="amount" type="text" placeholder="จำนวนเงิน" onChange={(event) => {setPrice(event.target.value)}}></input>
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
      <div className="fileForm-head">
        <br></br>
        <h4>เอกสารประกอบการยื่นทุน</h4>
      </div>
      <div className="fileForm-title">
        <div className='fileForm-setTopic d-flex'>
         
          <p className='topics' > หัวข้อ</p>
          <p className='typefile'>&nbsp;&nbsp;นามสกุลไฟล์</p>
          <p className='document'>&nbsp;&nbsp;ระบบอัตโนมัติ</p>
        </div>

        <div className="fileForm-detail">
          { files.map((file, index) => (
            <div >
              <p className="fileForm-order" >ลำดับที่ {index+1}</p>
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
                type="text" 
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

function ScholarshipListCreate(props) {
   



  return (
    <div className="frame-content">
      <div className="head-content d-flex">
        <div  className="scholarListCrea-column-left d-flex">
            <div className="icons">  
              <i className="bi bi-plus-lg"></i>
            </div>
            <div className="topic">
              <h4>สร้างทุน</h4>
            </div>
        </div>
      </div>

      <div className = 'frame-subcontent1'>

        <div className="scholarListCrea-center"> <AnnounceForm/> </div>
        <div className='scholarListCrea-fileForm'> <FileForm/> </div>  

        <div className="scholarListCrea-rateForm"> <RateForm/></div> 
          

        <div class="scholarListCrea-footer">
          <div class="btn-confirm-scholarCre ">
            <button class="btn-confirm" type="button" >
              ตกลง
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScholarshipListCreate;
