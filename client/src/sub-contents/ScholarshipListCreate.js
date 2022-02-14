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
      props.sendContent(['admin','AdminScholarshipList']);
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
    <div class="schlorshiplistcreate">
      <div class = "sc">
      <div class="header d-flex">
        <div class="column-left d-flex">
          <div class="icon-plus">
            <i class="bi bi-plus-lg"></i>
          </div>
          <h4>เพิ่มทุน</h4>
        </div>

        <div class='column-center'></div>

      </div>

      <div className="center">
        <form >
          <div class="topic d-flex">
            <input class="type" type="text" placeholder="ประเภททุน" onChange={(event) => {setType(event.target.value)}}></input>
            <input class="year"  type="text" placeholder="ประจำปีการศึกษา" onChange={(event) => {setstdYears(event.target.value)}}></input>
            
            <div class="button-sc d-flex">
              <button class="savebutton" onClick={() => (setShowModal(true), alert('SAVE'))}>
                <i class="bi bi-save"></i>
              </button>
              {showModal && <ConfirmModal sendConfirm={getConfirm}/>}
              
              <button class="cancelbutton" onClick={() => (setShowModal(true), alert('CANCEL'))}>
                <i class="bi bi-x"></i>
              </button>
              {showModal && <ConfirmModal sendConfirm={getConfirm}/>}
            </div>
        </div>
          
          <div class="detail">
            <input class="attribute" type="text" placeholder="คุณสมบัติผู้รับทุน" onChange={(event) => {setDetail(event.target.value)}}></input>
          </div>

          <div class="add-row-bottom ">
            <div class="contributor">
              <input class="sponsers" type="text" placeholder="ผู้สนับสนุน" onChange={(event) => {setSupporter(event.target.value)}}></input>
              <input class="amount" type="text" placeholder="จำนวนเงิน" onChange={(event) => {setPrice(event.target.value)}}></input>
            </div>
            <div class="button-next">
              <div class="next-p1 d-flex">
                <p>หน้า 1</p>
                <button>Next</button>
            </div>
        </div>
          </div>
        </form>
        

      </div>
      </div> 
    </div>
  );
}


export default ScholarshipListCreate;
