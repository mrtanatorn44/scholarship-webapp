import React, { useState, useContext } from 'react';
import ConfirmModal from '../../modals/ConfirmModal.js';
import { WebContext } from '../../App';
function InterviewRate(props) {

  const { Content } = useContext(WebContext)
  const [ content, setContent] = Content;
  const [check,setCheck]=useState();
  const [check1,setCheck1]=useState();
  const [showModal ,setShowModal] = useState(false);

  const inputHandler = (e) => {
    const { value, maxLength } = e.target;
    if (String(value).length >= maxLength) {
      e.preventDefault();
      return;
    }
  };

  function getConfirm(data){
    
    if(data){

      setContent('Interview');
      
    }else{
      
    }
    setShowModal(false);
  }

  const onFormSumbit = (event) => {
    event.preventDefault();
    setShowModal(true);
  }


  //const [content, setContent] = Content;
  /*const handlePass=(e)=>{
    console.warn(e.target.value)
    setPass(e.target.value)
   }
   const handleNotpass=(e)=>{
    console.warn(e.target.value)
    setNotpass(e.target.value)
   }*/
  
  return (
    <div className="frame">
      <div className="header">
        <div className="left">
          <div className="icons">
            <i class="bi bi-bookmark-check"></i>
          </div>
          <div class="topic">
            <h4>คะแนนการสัมภาษณ์</h4>
          </div>
        </div>
        <div className="right"></div> 
      </div>

      <div className="content1 d-flex">
        <form className="interviewrate-form" onSubmit={(e)=> onFormSumbit(e)}>
          <div className="interviewrate-score">
            <div className="detail1">
              <p>ประเมินด้าน1</p>
              <input required type="number" 
                min="0" max="100" maxlength="3" placeholder="50.00" 
                onKeyPress={inputHandler}
                />
            </div>
            <div className="detail2">
              <br></br>
              <p>ประเมินด้าน2</p>
              <input type="number" 
                min="0" max="100"  maxlength="3"  placeholder="70.00" 
                onKeyPress={inputHandler}
                required/>
            </div>
            <div className="detail3">
              <br></br>
              <p>ประเมินด้าน3</p>
              <input type="number" 
                min="0" max="100"  maxlength="3" placeholder="90.00" 
                onKeyPress={inputHandler}
                required/>
            </div>
          </div>
          <div className="interviewrate-complete">

            <div className="interviewrate-complete1">
              <div className="interviewrate-topic">
                <br></br>
                <p>ประเมินด้าน xxx</p>
              </div>

              <div className="interviewrate-check">
                <div className="interviewrate-check-true ">
                  <input type="radio" name="check" value="Pass" onChange={e=>setCheck(e.targer.value)} required/>
                  <label for="check1">สมบูรณ์</label>
                </div>
                <div className="interviewrate-check-false d-flex">
                  <input type="radio" name="check" value="Notpass" onChange={e=>setCheck(e.targer.value)} required/>
                  <label for="check2">ไม่สมบูรณ์</label>
                </div> 
              </div>
            </div>

            <div className="interviewrate-complete2">
              <div className="interviewrate-topic">
                <p>ประเมินด้าน 2</p>
              </div>
              <div className="interviewrate-check d-flex ">
                  <div className="interviewrate-check-true">
                    <input type="radio" name="check1" value="Pass" onChange={e=>setCheck1(e.targer.value)} required/>
                    <label for="check1">สมบูรณ์</label>
                  </div>
                  <div className="interviewrate-check-false">
                    <input type="radio" name="check1" value="Notpass" onChange={e=>setCheck1(e.targer.value)} required/>
                    <label for="check2">ไม่สมบูรณ์</label>
                  </div> 
              </div>
            </div>

          </div>   
          <div className="interviewrate-footer">
            <div className="btn-confirm-interviewrate d-flex">
              <button className="btn-confirm">
                ยืนยัน
              </button>
            </div>
          </div>
        </form>
        {showModal && <ConfirmModal sendConfirm={getConfirm}/>}
      </div>
    </div>
  );
}


export default InterviewRate;
