import React, { useState } from 'react';
import './ScholarshipListCreate.css';
import ConfirmModal from '../modal/ConfirmModal.js';
import Axios from 'axios';


function ScholarshipListCreate(props) {

  const [showModal, setShowModal] = useState(false);

  const [type, setType] = useState("");
  const [stdyears, setstdYears] = useState(0);
  const [detail, setDetail] = useState("");
  const [supporter, setSupporter] = useState("");
  const [price, setPrice] = useState(0);

  
  
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
              <p>หัวข้อ</p>
              <p>นามสกุลไฟล์</p>
            
              <div className="detail-files_part">
                <input className="files_part1" type="text" placeholder="สำเนาบัตรประชาชน" ></input>
                <input className="files_part2"  type="text" placeholder="รหัสนิสิต,บัตรประชาชน"></input>
                <select>
                  <option value="type_file1">PDF</option>
                  <option value="type_file2">JPG</option>
                </select>
                <button className="delete" type="button">
                  <i className="bi bi-dash-circle"></i>
                </button>
              </div>
              <div className="plus">
                <button className="plus-icon" type="button" >
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
                <input className="rate_part1" type="text" placeholder="เกรด" ></input>
                <select>
                  <option value="value1.1">คะแนน(100.00)</option>
                  <option value="value1.2">คะแนน(75.00)</option>
                </select>
                <input className="rate_part2" type="text" placeholder="100.00%" ></input>
                <button className="delete" type="button">
                  <i className="bi bi-dash-circle"></i>
                </button>
              </div>
              <div className="detail-rate_part2">
                <input className="rate_part2.1" type="text" placeholder="สถานะทางการเงิน" ></input>
                <select>
                  <option value="value2.1">ผ่าน</option>
                  <option value="value2.2">ไม่ผ่าน</option>
                </select>
                <input className="rate_part2" type="text" placeholder="50.00%" ></input>
                <button className="delete" type="button">
                  <i className="bi bi-dash-circle"></i>
                </button>
              </div>
              <div className="plus">
                <button className="plus-icon" type="button">
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
