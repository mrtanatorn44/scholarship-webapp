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
      console.log(state)
    const checkState = (index) =>{
      let a=[...state];
      a[index].check=!a[index].check;
      setState(a);
    }

    const Scholarship = ({idScholar,title,detail,date,index,check}) => {
      return (
        <div class = "d-flex">
          <div className = "scholar-list">

            <div class = 'title'>
              <h2>{title}</h2>
              <h3>{date}</h3>
            </div>

            <div class='bottom'>
              <div class='user-panel'>
            

                <h3 onClick={() => checkState(index)}>
                  {!check ? "รายละเอียดเพิ่มเติม ⋁" : "รายละเอียดเพิ่มเติม ⋀"}
                </h3>  
               


              </div>
            </div> 

            {check && <h3>{detail}</h3>} 

          </div>
          <button class = "button" onClick = {() => props.sendContent(['student','ScholarshipListRegister'])}>
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
    <div class="schlorshiplist">
      <div class="header d-flex">

        <div class='column-top d-flex'>
          <div class="icon-card-list">
            <i class="bi bi-card-list"></i>
          </div>  

          <h4>ทุนที่เปิดให้ลงทะเบียน</h4>
        </div>

        <div class='column-center'>

        </div>

        <div class='column-right'>
          <button class = "add-capital d-flex" type = "button" onClick={ () => props.sendContent(['admin', 'ScholarshipListCreate']) } >
            <i class="bi bi-plus-lg"></i>
            <p>สร้างทุน</p>
          </button>
        </div>

      </div>
      <div class="center">
        <div class="scholarnews">
                <ScholarshipListContent/>
        </div>
      </div>

    </div>
  );
}

export default ScholarshipList;

