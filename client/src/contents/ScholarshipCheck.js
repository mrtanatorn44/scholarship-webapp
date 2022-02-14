import { React, useState, useEffect } from 'react';
import './ScholarshipCheck.css';
import data from '../data/datanews.js';


function ScholarshipCheck(props) {
  function Check_list(){
    const [visible, setVisible] = useState(false);
    const Scholar = ({idScholar,title,detail,date}) => {
      return(
        <article className = "scholar-checklist">
          <div class = 'title'>
            <h2>{title}</h2>
          </div>
          <div class="button-Interview d-flex" >
            <button class="button-search d-flex" type="button" onClick={ () => props.sendContent(['admin','ScholarshipCheckForm']) }>
              <i class="bi bi-search"></i>
              <p>ตรวจสอบเอกสาร</p>
            </button>

            <button class="button-search d-flex"  type="button" onClick={ () => props.sendContent(['admin','ProfileCheck']) }>
              <i class="bi bi-search"></i>
              <p>ตรวจสอบประวัติ</p>
            </button>  

          </div>
          <div class='bottom'>
            <h3>{date}</h3>
          </div>
               
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
  return (
    <div class="schlorshipcheck">
        <div class="header d-flex">
            <div class="icon-calendar-check">
                <i class="bi bi-calendar-check"></i>
            </div>
            <h4>ตรวจสอบข้อมูล</h4>
        </div>

      <div class="row-top-check">
        <form class="d-flex">
          <div class="column-left-check">
            <div class="check-left">
              <label>ประเภทของทุน</label><br></br>
              <select  name="capital" id="capital">
                <option value="study">ทุนเรียนดี</option>
                <option value="activity">ทุนกิจกรรมเด่น</option>
                <option value="property">ทุนขาดคุณทรัพย์</option>
                <option value="other">ทุนอื่นๆ</option>
              </select>
            </div>
          </div>

            <div class="column-right-check" >
            <div class="search-check">
              <input type="text" placeholder="Search" aria-describedby="button-addon2"/>
              <button class="btn " type="button" >
                <i class="bi bi-search"></i>
              </button>
            </div>
         
              
            </div>
          
        </form>
      </div>


        <div calss="row-center-interview ">
          <div class="checklist ">
                <Check_list/>
          </div>
        </div>
      
    </div>
  );
}


export default ScholarshipCheck;
