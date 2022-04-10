/*eslint no-unused-vars:*/
import React, { useState, useContext ,useEffect } from 'react';
import Axios from 'axios';
import { WebContext } from '../../App';

function EditRateForm (){

    const  { RateForm}  = useContext(WebContext)
    //const [scoringFormat, setScoringFormat] = ScoringFormat;
    const [rateForm, setRateForm] = RateForm;
    
    //const [rateForms, setRateforms] = useState([{ hashID : Math.random().toString(36).substr(2, 7), name : "", type:"" , weight : "" }]);

    const presetRateType =[
      {
        title: 'เลือกเกณฑ์การให้คะแนน',
        type: '',
      },
      {
        title: 'คะแนน(เต็มร้อย)',
        type: 'score100',
      },
      {
        title: 'คะแนน(เต็มสิบ)',
        type: 'score10',
      },
      {
        title: 'ผ่านหรือไม่ผ่าน',
        type: 'state',
      }
    ]
    
    useEffect(() => {
      setRateForm([
        {
          hashID  : Math.random().toString(36).substr(2, 7), 
          title   : "", 
          type    : "",
          weight  : ""
        }
      ]);
    }, [])
    
    return(
      <>
        <div className="heading">
          <h4>เกณฑ์การให้คะแนน</h4>
        </div>
  
        <div className="subject">
          <div className='setSubject d-flex'>  
            <p className='topics'>หัวข้อ</p>
            <p className='typefile'>รูปแบบการให้คะแนน</p>
            <p className='weight'>น้ำหนัก</p>
          </div>
  
          <div className="detail">
            {
              rateForm.map((rate, index) => (
                <div className="file d-flex" key={index}>
                  <p className="order" >ลำดับ {index+1}</p>
                    <div className="set-select d-flex">
                      {/* RATE TITLE */}
                      <input 
                        className   = "file-document"
                        value       = {rate.title}
                        type        = "text" 
                        placeholder = "หัวข้อการให้คะแนน"
                        onChange    = {
                          (e) => {
                            var tempRateForm = [...rateForm];
                            var handleInput = tempRateForm.filter(obj => {
                              if (obj.hashID === rate.hashID) {
                                rate.title = e.target.value; // set new 'title'
                              }
                            })
                            setRateForm(tempRateForm) // apply value
                          }
                        }
                        required
                      />
                      
                      {/* RATE TYPE */}
                      <select
                        className     = "select-2"
                        value         = {rate.type}
                        onChange      = {
                          (e) => {
                            var tempRateForm = [...rateForm]; 
                            var handleSelect = tempRateForm.filter(obj => {
                              if (obj.hashID === rate.hashID) {
                                rate.type = e.target.value; // update value
                              }
                            })
                            setRateForm(tempRateForm) // apply value
                          }
                        }
                        required
                      >
                        {
                          presetRateType.map((presetRate, presetRateIdx) =>
                            <option 
                              key   = {presetRateIdx}
                              value = {presetRate.type}
                            >
                              {presetRate.title}
                            </option>
                          )
                        }
                      </select>
          
                      {/* WEIGHT INPUT */}
                      <input 
                        className   = "select-2"
                        value       = {rate.weight}
                        type        = "number" min="0" max="100"
                        placeholder = "น้ำหนักการให้คะแนน"
                        required
                        onChange    = {
                          (e) => {
                            var tempRateForm = [...rateForm]; 
                            var handleInput = tempRateForm.filter(
                              (obj) => {
                                if (obj.hashID === rate.hashID) {
                                  rate.weight = e.target.value; // update value
                                }
                              }
                            )
                            setRateForm(tempRateForm) // apply value
                          }
                        }
                      />
                      
                      {/* DELETE CURRENT 'RATE' ELEMENT */}
                      <button 
                        className="button-circle red1" 
                        type="button" 
                        onClick={(e) => {
                          e.preventDefault();
                          setRateForm((rateForm) => 
                            rateForm.filter((obj) => 
                              obj.hashID !== rate.hashID
                            )
                          )
                        }}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                    </div>  
                </div>
              ))
            }
          </div>
  
          {/* ADD NEW 'RATE' ELEMENT */}
          <div className="button-add2">
            <button 
              className="button-circle green1" 
              type="button" 
              onClick={() => {
                setRateForm([
                  ...rateForm, 
                  {
                    hashID  : Math.random().toString(36).substr(2, 7),
                    title   : "",
                    type    : "",
                    weight  : "" 
                  }
                ])
              }}
            >
              <i className="bi bi-plus-lg"></i>
            </button>
          </div>
        </div>
      </>
    )
  }
  export default EditRateForm;