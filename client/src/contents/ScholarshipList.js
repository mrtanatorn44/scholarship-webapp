import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../data/datanews.js';
import './SchlorshipList.css';


function ScholarshipList(props) {

  const navigate = useNavigate();
  
  function ScholarshipListContent() {
    
    const [state, setState] = useState(
      data.map((x) => ({
        ...x,
        check:false
      }))
    );
      //console.log(state)
    const checkState = (index) =>{
      let a=[...state];
      a[index].check=!a[index].check;
      setState(a);
    }

    const Scholarship = ({idScholar,title,detail,date,index,check}) => {
      return (
        <div className = "d-flex">
          <div className = "scholar-list">

            <div className = 'title'>
              <h2>{title}</h2>
              <h3>{date}</h3>
            </div>

            <div className='bottom'>
              <div className='user-panel'>
            

                <h3 onClick={() => checkState(index)}>
                  {!check ? "รายละเอียดเพิ่มเติม ⋁" : "รายละเอียดเพิ่มเติม ⋀"}
                </h3>  
               


              </div>
            </div> 

            {check && <h3>{detail}</h3>} 

          </div>
          <button className = "button" onClick = {() => props.sendContent(['student','ScholarshipListRegister'])}>
            ลงทะเบียน
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
              <Scholarship
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

  return(
    <div className="schlorshiplist">
      <div className="header d-flex">

        <div className='column-top d-flex'>
          <div className="icon-card-list">
            <i className="bi bi-card-list"></i>
          </div>  

          <h4>ทุนที่เปิดให้ลงทะเบียน</h4>
        </div>

        <div className='column-center'>

        </div>

        <div className='column-right'>
          <button className = "add-capital d-flex" type = "button" onClick={ () => props.sendContent(['admin', 'ScholarshipListCreate']) } >
            <i className="bi bi-plus-lg"></i>
            <p>สร้างทุน</p>
          </button>
        </div>

      </div>
      <div className="center">
        <div className="scholarnews">
                <ScholarshipListContent/>
        </div>
      </div>

    </div>
  );
}

export default ScholarshipList;

