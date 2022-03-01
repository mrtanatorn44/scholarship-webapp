import React, { useState, useContext } from 'react';

import { WebContext } from '../App';
function InterviewRate(props) {

  const { Content } = useContext(WebContext)
  const [ content, setContent] = Content;
  const [check,setCheck]=useState();
  const [check1,setCheck1]=useState();
 
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
    <div className="frame-content">
      <div className="interviewrate-head d-flex">
        <h4>คะแนนการสัมภาษณ์</h4>
      </div>
      <div className="interviewrate-center d-flex">
        <form>
          <div className="interviewrate-score">
            <div className="detail1">
              <p>ประเมินด้าน1</p>
              <input type="number" min="0" max="100" placeholder="50.00"/>
            </div>
            <div className="detail2">
              <br></br>
              <p>ประเมินด้าน2</p>
              <input type="number" min="0" max="100" placeholder="70.00"/>
            </div>
            <div className="detail3">
              <br></br>
              <p>ประเมินด้าน3</p>
              <input type="number" min="0" max="100" placeholder="90.00"/>
            </div>
          </div>
          <div className="interviewrate-complete d-flex">

            <div className="interviewrate-complete1">
              <div className="interviewrate-topic">
                <br></br>
                <p>ประเมินด้าน xxx</p>
              </div>

              <div className="interviewrate-checks d-flex ">
                <div className="interviewrate-check-true">
                  <input type="radio" name="check" value="Pass" onChange={e=>setCheck(e.targer.value)}/>
                  <label for="check1">สมบูรณ์</label>
                </div>
                <div className="interviewrate-check-false">
                  <input type="radio" name="check" value="Notpass" onChange={e=>setCheck(e.targer.value)}/>
                  <label for="check2">ไม่สมบูรณ์</label>
                </div> 
              </div>
            </div>

            <div className="interviewrate-complete2">
              <div className="interviewrate-topic">
                <p>ประเมินด้าน 2</p>
              </div>
              <div className="interviewrate-checks d-flex ">
                  <div className="interviewrate-check-true">
                    <input type="radio" name="check1" value="Pass" onChange={e=>setCheck1(e.targer.value)} />
                    <label for="check1">สมบูรณ์</label>
                  </div>
                  <div className="interviewrate-check-false">
                    <input type="radio" name="check1" value="Notpass" onChange={e=>setCheck1(e.targer.value)}/>
                    <label for="check2">ไม่สมบูรณ์</label>
                  </div> 
              </div>
            </div>

          </div>   
        </form>
      </div>
      <div className="footer">
        <div className="btn-confirm-interviewrate d-flex">
          <button type="submit"className="btn-confirm" onClick={() => setContent('Interview')}>ยืนยัน</button>
        </div>
      </div>
    </div>
  );
}


export default InterviewRate;
