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
      <div className="topic d-flex">
        <input className="type" type="text" placeholder="ประเภททุน" onChange={(event) => {setType(event.target.value)}}></input>
        <input className="year"  type="text" placeholder="ประจำปีการศึกษา" onChange={(event) => {setstdYears(event.target.value)}}></input>
          
        <div className="button-sc d-flex">
          <button className="savebutton" onClick={() => (setShowModal(true), alert('SAVE'))}>
            <i className="bi bi-save"></i>
          </button>
          {showModal && <ConfirmModal sendConfirm={getConfirm}/>}
          
          <button className="cancelbutton" onClick={() => (setShowModal(true), alert('CANCEL'))}>
            <i className="bi bi-x"></i>
          </button>
          {showModal && <ConfirmModal sendConfirm={getConfirm}/>}
        </div>
      </div>
        
      <div className="detail">
        <input className="attribute" type="text" placeholder="คุณสมบัติผู้รับทุน" onChange={(event) => {setDetail(event.target.value)}}></input>
      </div>

      <div className="add-row-bottom ">
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
      <div className="head-files_part ">
        <br></br>
        <h4>เอกสารประกอบการยื่นทุน</h4>
      </div>
      <div className="title-files_part">
        <div className='d-flex'>
          <p>หัวข้อ</p>
          <p>&nbsp;&nbsp;นามสกุลไฟล์</p>
          <p>&nbsp;&nbsp;ระบบอัตโนมัติ</p>
        </div>

        <div className="detail-files_part">
          { files.map((file, index) => (
            <div >
              <p>ลำดับที่ {index+1}</p>
              <input className="files_part1" 
                key={index}
                type="text" 
                name="name"
                value={file.name || ""}
                onChange={(e) => handleInputChange(e, index)}
              />
              <select className="select1">
                <option value="type_file1">PDF</option>
                <option value="type_file2">JPG</option>
              </select>
              <select className="select2">
                {
                  fileAutoFormat.map((format) =>
                    <option>{format.title}</option>
                  )
                }
              </select>
              <button className="delete" type="button" onClick={() => delFile(file)}>
                <i className="bi bi-dash"></i>
              </button>
            </div>
          )) }
        </div>
        <div className="plus">
          <button className="plus-icon" type="button" onClick={() => addFile() }>
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
      
      <div className="head-rate_part">
        <br></br>
        <h4>เกณฑ์การให้คะแนน</h4>
      </div>
      <div className="title-rate_part">
        <div className='d-flex'>  
          <div className="test1">
            <p>หัวข้อ</p>
          </div>
          <div className="test2">
            <p>รูปแบบการให้คะแนน</p>
          </div>
          <div className="test3">
            <p>น้ำหนัก</p>
          </div>
          
        </div>
      <div className="detail-rate_part">
      {
        rateForms.map((rateForm, index) => (
          <div >
            <p>ลำดับที่ {index+1}</p>
            <input className="rate_part1"
                key={index}
                type="text" 
                name="name"
                value={rateForm.name || ""}
                onChange={(e) => handleInputChangeName(e, index)}
            />
            
            <select className="select2">
              {
                fileAutoFormat.map((format) =>
                  <option>{format.title}</option>
                )
              }
            </select>

            <input className="rate_part2"
                key={index}
                type="text" 
                name="weigth"
                value={rateForm.weigth || ""}
                onChange={(e) => handleInputChangeWeigth(e, index)}
            />
            <button className="delete" type="button" onClick={() => delrateForm(rateForm)}>
              <i className="bi bi-dash"></i>
            </button>
          </div>
        ))
        }
      </div>
      <div className="plus">
        <button className="plus-icon" type="button" onClick={() => addrateForm()}>
          <i class="bi bi-plus-lg"></i>
        </button>
      </div>
      </div>
    </form>
  )
}

function ScholarshipListCreate(props) {
   



  return (
    <div className="schlorshiplistcreate">
      <div className="header d-flex">
        <div className="column-left d-flex">
          <div className="icon-plus">
            <i className="bi bi-plus-lg"></i>
          </div>
          <h4>เพิ่มทุน</h4>
        </div>
        <div className='column-center'></div>
      </div>

      <div className = 'content'>

        <div className="center"> <AnnounceForm/> </div>
        <div className='files_part'> <FileForm/> </div>  

        <div className="rate_part"> <RateForm/></div> 
          

        <div class="fotter-button">
          <div class="button-confirm">
            <button class="confirm" type="button" >
              <p>ตกลง</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScholarshipListCreate;
