import { React, useState, useEffect } from 'react';
import './ScholarshipStatus.css';
import data from '../../data/datanews.js';
import StudentScholarshipListRegister   from '../../sub-contents/student/ScholarshipListRegister.js';

function ScholarshipStatus(props) {
  function Scholarship_list(){
    const [state, setState] = useState(data.map((x)=>({...x,check:false})));
    const checkState = (index) =>{
      let a=[...state];
      a[index].check=!a[index].check;
      setState(a);
    }
    
    const Scholar = ({idScholar,title,detail,date,index,check}) => {
      return(
        <div class = "d-flex">
          <div className = "scholar">
            <div class = 'title'>
              <h2>{title}</h2>
              <h3>{date}</h3>
            </div>
            <div class='bottom'>
                <div class='user-panel'>
                  <h3  onClick={() => checkState(index)}>
                      {!check ? "รายละเอียดเพิ่มเติม ⋁" : "รายละเอียดเพิ่มเติม ⋀"}
                  </h3>
                </div>
              </div>

              {check && <h3>{detail}</h3>} 
          </div>
          <button class = "button" /*onClick = {() => props.sendContent(['student','StudentScholarshipListRegister'])}*/>
            นัดหมาย
          </button>
        </div>
        
      );

    }
  
      return(
        <section>{
          state.map((scholar,index) => {
            const {title,detail,date,check} = scholar;
            return(
              <div>
                <Scholar
                  check={check}
                  index={index}
                  date = {date}
                  title={title}
                  detail={detail}
                />
                
              </div>
            );
          })
        }</section>
      );
    }
  
  return (
    <div class="schlorshipstatus">
        <div class="header d-flex">
            <div class="icon-grid">
                <i class="bi bi-grid-3x3"></i>
            </div>
            <h4>สถานะการยื่นทุน</h4>
        </div>

          <div class="scholarnews">
            <Scholarship_list/>
          </div>
    </div>
  );
}


export default ScholarshipStatus;
