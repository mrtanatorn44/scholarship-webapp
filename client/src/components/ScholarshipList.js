import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../data/datanews.js';


function ScholarshipList(props) {

  const [Scholar, setScholar] = useState(
    data.map((x) => ({
      ...x,
      check:false
    }))
  )

  const checkState = (index) => {
    let a=[...Scholar];
    a[index].check=!a[index].check;
    setScholar(a);
  }
  
  return (
    Scholar.map((scholar, index) => (
      <div className = "d-flex">
        <div className = "scholar-list">

          <div className = 'title'>
            <h2>{scholar.title}</h2>
            <h3>{scholar.date}</h3>
          </div>

          <div className='bottom'>
            <div className='user-panel'>
              <h3 onClick={() => checkState(index)}>
                {!scholar.check ? "รายละเอียดเพิ่มเติม (แสดง)" : "รายละเอียดเพิ่มเติม (ซ่อน)"}
              </h3>  
            </div>
          </div> 
          {scholar.check && <h3>{scholar.detail}</h3>} 
        </div>
        <button className = "button" onClick = {() => props.sendContent(['student','ScholarshipListRegister'])}>
          ลงทะเบียน
        </button>
      </div>
    ))
  )
}

export default ScholarshipList;