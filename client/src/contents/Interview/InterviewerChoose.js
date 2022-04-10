import React, { useState, useContext, useEffect } from 'react';
import { WebContext } from '../../App';
import Axios from 'axios';

function InterviewerChoose (){
  const [ itvList, setItvList ] = useState([])
  const [ itvSelected, setItvSelected ] = useState([])
  function getInterviewer() {
    Axios.get("http://localhost:5000/getUserRole",{
      role : "interviewer"
    }).then((response) => { 
      console.log(response.data);
      if(response.data !== undefined || response.data.length !== 0) {
        
      }
    })
  }
  
  useEffect(() => {
    getInterviewer()

    setItvList([
      {
        hashID    : Math.random().toString(36).substr(2, 7),
        id    : "",
        email : "",
      }
    ]);
    
  }, [])

  return (
    <div className="frame"> 
      <div className="header">
        <div  className="left">
            <div className="icons">  
              <i className="bi bi-plus-lg"></i>
            </div>
            <div className="topic">
              <h4>เพิ่มกรรมการ</h4>
            </div>
        </div>

        <div className="right">
        </div>
      </div>
      <div className='contents'> 
        <div className='content1'>  
          <div className="itvList" >
            <div className="heading">

                <h4>รายชื่อกรรมการที่จะทำการสัมภาษณ์</h4>
            </div>

            <div className="subject">
              {/* HEADER */}
              <div className='w100 d-flex'>
                <div className='w10'></div>
                <div className='w40'></div>
                <div className='w40'>กรรมการ</div>
                <div className='w10'></div>
              </div>

              {/* ----- INTERVIEWER OPTION ----- */}
              { 
                itvSelected.map((itv, index) => (
                  // EACH itv
                  <div className="w100 d-flex" key={index}>
                    { /* ----- ORDER ----- */ }
                    <div className="w10 text1 fs07"><b>ลำดับ {index+1}</b></div>

                    { /* ----- itv Name ----- */ }
                    <div className="w40 select2">
                      
                        <select 
                          value={itv.title}
                          onChange={
                            (e) => {
                              var tempItvList = [...itvList];
                              var handleSelect = tempItvList.filter(
                                (obj) => {
                                  if (obj.hashID === itv.hashID) {
                                    obj.title = e.target.selectedOptions[0].text;
                                  }
                                }
                              )
                              setItvList(tempItvList) // apply value
                            }
                          }
                          required
                        >
                          {
                            itvList.map((allItv, idx) => (
                              <option 
                                key={idx}
                                value={allItv.email}
                              >
                                {allItv.email}
                              </option>
                            ))
                          }
                        </select>
                      
                      
                    
                    </div>

                    

                    {/* DELETE CURRENT INPUT */}
                    <div className="w10">
                      <button 
                        className="button-circle red1" 
                        type='button' 
                        onClick={() => {
                          setItvList((itvList) => itvList.filter((obj) => obj.hashID !== itv.hashID))
                        }}>
                        <i className="bi bi-dash"></i>
                      </button>
                    </div>
                  </div>
                )) 
              } 

              { /* ----- ADD NEW OPTION ----- */ }
              <div className='w100 d-flex'>
                <div className='w10'></div>
                <div className='w40'></div>
                <div className='w40'></div>
                <div className='w10'>
                  <button 
                    className="button-circle green1" 
                    type='button' 
                    onClick={() => {
                      setItvList([
                        ...itvList, 
                        { 
                          hashID  : Math.random().toString(36).substr(2, 7),
                          itv_id    : "",
                          itv_name  : "",
                        }
                      ])
                    }}>
                    <i className="bi bi-plus-lg"></i>
                  </button>
                </div>
              </div>
            </div>
            
          </div>

          {/* ----- FOOTER ------ */}
          <div className="footer2">
            <div className="confirm">
              <button className="button-confirm green1" type="submit">
                ตกลง 
              </button>
            </div>
          </div>

        </div>
      </div>  
    </div>
  );
}

export default InterviewerChoose;