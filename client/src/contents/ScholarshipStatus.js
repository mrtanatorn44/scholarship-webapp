import { React, useState, useEffect } from 'react';
import './ScholarshipStatus.css';
import data from '../data/datanews.js';
import StudentScholarshipListRegister   from '../sub-contents/ScholarshipListRegister.js';

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
        <div className = "d-flex">
          <div className = "scholar">
            <div className = 'title'>
              <h2>{title}</h2>
              <h3>{date}</h3>
            </div>
            <div className='bottom'>
                <div className='user-panel'>
                  <h3  onClick={() => checkState(index)}>
                      {!check ? "รายละเอียดเพิ่มเติม ⋁" : "รายละเอียดเพิ่มเติม ⋀"}
                  </h3>
                </div>
              </div>

              {check && <h3>{detail}</h3>} 
          </div>
          <button className = "button" /*onClick = {() => props.sendContent(['student','StudentScholarshipListRegister'])}*/>
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
    <div className="schlorshipstatus">
        <div className="header d-flex">
            <div className="icon-grid">
                <i className="bi bi-grid-3x3"></i>
            </div>
            <h4>สถานะการยื่นทุน</h4>
        </div>

          <div className="scholarnews">
            <Scholarship_list/>
          </div>
    </div>
  );
}


export default ScholarshipStatus;
