import { React, useState, useEffect } from 'react';
import './ScholarshipListCreate.css';
import ConfirmModal from '../modal/ConfirmModal.js';
import Axios from 'axios';
import data from '../data/datanews.js';

function ScholarshipListCreate(props) {
   
  const [showModal, setShowModal] = useState(false);

  const [type, setType] = useState("");
  const [stdyears, setstdYears] = useState(0);
  const [detail, setDetail] = useState("");
  const [supporter, setSupporter] = useState("");
  const [price, setPrice] = useState(0);
    const [totalscore, setTotalscore] = useState(0);
  const [score, setscore] = useState([]);

  const [totalfile, setTotalfile] = useState(1);

  const [files, setFiles] = useState({
    total : 0,
    data : []
  });
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

  
  function getConfirm(data) {
    if (data) {
      //alert('TRUE !')
      // PUSH DATA TO DATABASE
      // CLOSE OR SAVE
      props.sendContent(['admin','ScholarshipList']);
    } else {
      //alert('FALSE !')
    }
    setShowModal(false);
  }

  /* like this is better, i thing. no need scls ok sure*/


  const createSCLS = () => {
    Axios.post("http://localhost:5000/creatSCLS", {
      Type : type,
      stdYears : stdyears,
      Detail : detail,
      Supporter : supporter,
      Price : price
    })
  };
  
  const addFile = () => {

    var newFile = {
      id : files.total+=1,
      name : "",
      value : "",
      format :""
    }
    setFiles({
      ...files,
      data: [...files.data, newFile]
    })

  }

  function File_list(){
    const delFile = () => {
      alert("from DelFile")
      setFiles([...files]);
      setTotalfile(totalfile-1);
    }

    function handleInputChange(text, id) {
      const tempData = files.data.slice();
      tempData[id-1].value = text.target.value;
      setFiles({
        ...files,
        data : tempData
      })
    }

    return (
        files.data.map((file, id) => (
        
          <div key={id}>
            <p>ลำดับที่ {file.id}</p>
            <input className="files_part1" type="text" placeholder="สำเนาบัตรประชาชน"
              value={file.value}
              onChange={(e) => {handleInputChange(e, file.id)/*
                const tempData = files.data.slice();
                tempData[file.id-1].name = e.target.value;
                console.log(files)
                setFiles({
                  ...files,
                  data : e.target.value
                })*/
              }}
            ></input>
            <select>
              <option value="type_file1">PDF</option>
              <option value="type_file2">JPG</option>
            </select>
            <select>
              {
                fileAutoFormat.map((format) =>
                  <option>{format.title}</option>
                )
              }
            </select>
            <button className="delete" type="button">
              <i className="bi bi-dash-circle"></i>
            </button>
          </div>
        )
      )
    );
  }


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
        <div className="center">
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
            

          </div>
        
          <div className='files_part'>
          <br></br>
          <form>
            <div className="head-files_part ">
              <h4>เอกสารประกอบการยื่นทุน</h4>
            </div>
            <div className="title-files_part">
              <div className='d-flex'>
                <p>หัวข้อ</p>
                <p>&nbsp;&nbsp;ชื่อไฟล</p>
                <p>&nbsp;&nbsp;นามสกุลไฟล์</p>
                <p>&nbsp;&nbsp;ระบบอัตโนมัติ</p>
              </div>
              <div className="detail-files_part">
                <File_list/>
              </div>
              <div className="plus">
                <button className="plus-icon" type="button" onClick={() => addFile() }>
                  <i class="bi bi-plus-circle"></i>
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="rate_part">
          <br></br>
          <form>
            <div className="head-rate_part">
              <h4>เกณฑ์การให้คะแนน</h4>
            </div>
            <div className="title-rate_part">
              <p>หัวข้อการให้คะแนน</p>
              <p>รูปแบบการให้คะแนน</p>
              <p>น้ำหนัก</p>
              <div className="detail-rate_part1">
                
              </div>
              <div className="detail-rate_part2">
                
              </div>
              <div className="plus">
                <button className="plus-icon" type="button"onClick={() => addFile() } >
                  <i class="bi bi-plus-circle"></i>
                </button>
              </div>
            </div>
          </form>

          <div class="fotter-button">
            <div class="button-confirm">
              <button class="confirm" type="button" >
                <p>ตกลง</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
   );
}


export default ScholarshipListCreate;
