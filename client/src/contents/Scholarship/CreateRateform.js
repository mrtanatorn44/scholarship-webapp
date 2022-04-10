/*eslint no-unused-vars:*/

import React, { useState, useEffect, useContext } from 'react';
import { WebContext } from '../../App';

function RateForm (){
  const { RateForm }  = useContext(WebContext)
  const [ rateForm, setRateForm ] = RateForm;

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
        <div className='w100 d-flex'>
          <div className='w10'></div>
          <div className='w30'>หัวข้อ</div>
          <div className='w30'>เกณฑ์คะแนน</div>
          <div className='w20'>น้ำหนัก</div>
          <div className='w10'></div>
        </div>


        
        {
          rateForm.map((rate, index) => (
            <div className="w100 mgb1 d-flex" key={index}>
              <div className="w10 text1 fs07"><b>ลำดับ {index+1}</b></div>
              <div className="w30 select2">
                <input className="file-document"
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
              </div>
              {/* RATE TYPE */}
              <div className="w30 select2">
                <select
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
              </div>

              {/* WEIGHT INPUT */}
              <div className="w20 select2">
                <input 
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
              </div>

              {/* DELETE CURRENT 'RATE' ELEMENT */}
              <div className="w10 ">
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

        {/* ADD NEW 'RATE' ELEMENT */}
        <div className='w100 d-flex'>
          <div className='w10'></div>
          <div className='w30'></div>
          <div className='w30'></div>
          <div className='w20'></div>
          <div className='w10'>
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

      </div>
    </>
  )
}

export default RateForm;