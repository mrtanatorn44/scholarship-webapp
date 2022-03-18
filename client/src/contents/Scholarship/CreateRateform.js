/*eslint no-unused-vars:*/

import React, { useState, useContext } from 'react';
import { WebContext } from '../../App';

function RateForm (){
  const  { ScoringFormat }  = useContext(WebContext)
  const [scoringFormat, setScoringFormat] = ScoringFormat;

    const [rateForms, setRateforms] = useState([{ hashID : Math.random().toString(36).substr(2, 7), name : "", type:"" , weight : "" }]);
    const fileAutoFormat =[
      {
        title: 'เลือกเกณฑ์การให้คะแนน',
        type: 'score',
        value: ''
      },
      {
        title: 'คะแนน(100.00%)',
        type: 'score',
        value: '0'
      },
      {
        title: 'ผ่านไม่ผ่าน',
        type: 'pass',
        value: '1'
      }
    ]
    
    function delrateForm(target) {   
      const id = target.hashID;           
      setRateforms((rateForms) => rateForms.filter((item) => item.hashID !== id))
      setScoringFormat((rateForms) => rateForms.filter((item) => item.hashID !== id))
      
    }
     
    const addrateForm = () => {
      setRateforms([...rateForms, {hashID : Math.random().toString(36).substr(2, 7), name : "", type:"", weight : "" }])
    }
    
    function onSelectFormat(e, targetHashID) {
      // if it select 'label' that have value = '' 
      // do nothing
      if (e.target.value === '')
        return;
      var tempFiles = [...rateForms]; 
      tempFiles.forEach((file) => { // loop to find target object
        if (file.hashID === targetHashID) { // check if found target from hashID
          // update value
          file.type = e.target.value;
        }
      })
      setRateforms(tempFiles) // apply value
    }

    function handleInputChangeName(e, targetHashID) {
      // if it select 'label' that have value = '' 
      // do nothing
      if (e.target.value === '')
        return;
      var tempFiles = [...rateForms]; 
      tempFiles.forEach((file) => { // loop to find target object
        if (file.hashID === targetHashID) { // check if found target from hashID
          // update value
          file.name = e.target.value;
        }
      })
      setRateforms(tempFiles) // apply value
    }

    function handleInputChangeWeight(e, targetHashID) {
      // if it select 'label' that have value = '' 
      // do nothing
      if (e.target.value === '')
        return;
      var tempFiles = [...rateForms]; 
      tempFiles.forEach((file) => { // loop to find target object
        if (file.hashID === targetHashID) { // check if found target from hashID
          // update value
          file.weight = e.target.value;
        }
      })
      setRateforms(tempFiles) // apply value
    }

    function showAll() {
       console.log(rateForms);
     }
    
  
    return(
      <>
        <button type='button' onClick={() => showAll()}> SHOW ELEMENT</button>
        <div className="heading">
          <br></br>
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
          rateForms.map((item, index) => (
            <div className="d-flex" key={index}>
              <p className="order" >ลำดับ {index+1}</p>
              <input className="file-document" required
                  type="text" 
                  name="name"
                  placeholder = "หัวข้อการให้คะแนน"
                  onChange={(e) => {handleInputChangeName(e, item.hashID);setScoringFormat(rateForms)}}
              />
              
              <select className="select-2" required onChange={(e) => {onSelectFormat(e, item.hashID);setScoringFormat(rateForms)}} >
                {
                  fileAutoFormat.map((format, format_index) =>
                    <option key={format_index}  value ={format.value} > {format.title}  </option>
                  )
                }
              </select>
  
              <input className="select-2"
                  required
                  type="number" min="0" max="100"
                  name="weight"
                  placeholder = "น้ำหนักการให้คะแนน"
                  onChange={(e) => {handleInputChangeWeight(e, item.hashID); setScoringFormat(rateForms)}}
              />
              
              <button className="button-circle red1" type="button" onClick={() => delrateForm(item)}>
                <i className="bi bi-dash"></i>
              </button>
            </div>
          ))
          }
        </div>
        <div className="button-add2">
          <button className="button-circle green1" type="button" onClick={() => addrateForm()}>
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
        </div>
      </>
    )
  }
  export default RateForm;