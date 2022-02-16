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
      <div className = "sc">
      <div className="header d-flex">
        <div className="column-left d-flex">
          <div className="icon-plus">
            <i className="bi bi-plus-lg"></i>
          </div>
          <h4>เพิ่มทุน</h4>
        </div>

        <div className='column-center'></div>

      </div>

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
            <div className="button-next">
              <div className="next-p1 d-flex">
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
