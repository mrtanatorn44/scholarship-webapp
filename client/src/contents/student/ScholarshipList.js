import { React, useState, useEffect } from 'react';
import data from '../../data/datanews.js';
import './ScholarshipList.css';

function ScholarshipList() {

  function Scholarship_list(){
    const [visible, setVisible] = useState(false);
    const Scholar = ({idScholar,title,detail,date}) => {
      return(
        <article className = "scholar">
          
          <div class = 'title'>
            <h2>{title}</h2>
            <h3>{date}</h3>
          </div>

          <div class='bottom'>
              <div class='user-panel'>
                <h3 onClick={() => setVisible(!visible)}>
                    {!visible ? "รายละเอียดเพิ่มเติม ⋁" : "รายละเอียดเพิ่มเติม ⋀"}
                </h3>
              </div>
            </div>

            {visible && <h3>{detail}</h3>} 


        </article>
      );

    }
  
      return(
        <section>{
          data.map((scholar,index) => {
            const {title,detail,date} = scholar;
            return(
              <div>
                <Scholar
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
               <div class="icon-card-list">
                   <i class="bi bi-card-list"></i>
               </div>
               <h4>ทุนที่เปิดให้ลงทะเบียน</h4>
           </div>

            <div class="scholarnews">
              <Scholarship_list/>
            </div>
       </div>
     );
}

export default ScholarshipList;
