import React, { useState, useContext } from 'react';
import { WebContext } from '../../App';

function RateForm (){
  const { ScholarshipForm } = useContext(WebContext)
  const [scholarshipForm, setScholarshipForm] = ScholarshipForm;
    const [rateForms, setRateforms] = useState([{ id : 1, name : "", weigth : "0" }]);
    const fileAutoFormat =[
      {
        title: 'คะแนน(100.00%)',
        type: 'score',
      },
      {
        title: 'ผ่านไม่ผ่าน',
        type: 'pass',
      }
    ]
    const delrateForm = (rateForm) => {
      const id= rateForm.id;
      setRateforms(rateForms.filter(rateForm => rateForm.id !== id));
      setRateforms([...rateForm]) 
    }
    const addrateForm = () => {
      setRateforms([...rateForms, { id : rateForms.length+1, name : "", weigth : "0" }])
    }
    const handleInputChangeName = (e, index) => {
      let tempFiles = [...rateForms]
      tempFiles[index][e.target.name] = e.target.value;
      setRateforms(tempFiles);
    }
  
    const handleInputChangeWeigth = (e, index) => {
      let tempFiles = [...rateForms]
      tempFiles[index][e.target.name] = e.target.value;
      setRateforms(tempFiles);
    }
  
    return(
      <>
       
        <div className="rateForm-head">
          <br></br>
          <h4>เกณฑ์การให้คะแนน</h4>
        </div>
        <div className="rateForm-title">
          <div className='rateForm-setTopic d-flex'>  
            <p className='topics'>หัวข้อ</p>
            <p className='typefile'>รูปแบบการให้คะแนน</p>
            <p className='document'>น้ำหนัก</p>
          </div>
        <div className="rateForm-detail">
        {
          rateForms.map((rateForm, index) => (
            <div key={index}>
              <p className="rateForm-order" >ลำดับที่ {index+1}</p>
              <input className="file-document" required
                  type="text" 
                  name="name"
                  value={rateForm.name || ""}
                  onChange={(e) => handleInputChangeName(e, index)}
              />
              
              <select className="file-select-1">
                {
                  fileAutoFormat.map((format, format_index) =>
                    <option key={format_index}>{format.title}</option>
                  )
                }
              </select>
  
              <input className="file-select-2"
                  type="number" min="0" max="100"
                  name="weigth"
                  value={rateForm.weigth || ""}
                  onChange={(e) => handleInputChangeWeigth(e, index)}
              />
              
              <button className="btn-delete-circle" type="button" onClick={() => delrateForm(rateForm)}>
                <i className="bi bi-dash"></i>
              </button>
            </div>
          ))
          }
        </div>
        <div className="btn-add-scholarCre">
          <button className="btn-add-circle" type="button" onClick={() => addrateForm()}>
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
        </div>
      </>
    )
  }
  export default RateForm;