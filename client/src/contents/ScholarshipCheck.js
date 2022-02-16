import { React, useState, useEffect } from 'react';
import './ScholarshipCheck.css';
import data from '../data/datanews.js';


function ScholarshipCheck(props) {
  function Check_list(){
    const [visible, setVisible] = useState(false);
    const Scholar = ({idScholar,title,detail,date}) => {
      return(
        <article className = "scholar-checklist">
          <div className = 'title'>
            <h2>{title}</h2>
          </div>
          <div className="button-Interview d-flex" >
            <button className="button-search d-flex" type="button" onClick={ () => props.sendContent(['admin','ScholarshipCheckForm']) }>
              <i className="bi bi-search"></i>
              <p>ตรวจสอบเอกสาร</p>
            </button>

            <button className="button-search d-flex"  type="button" onClick={ () => props.sendContent(['admin','ProfileCheck']) }>
              <i className="bi bi-search"></i>
              <p>ตรวจสอบประวัติ</p>
            </button>  

          </div>
          <div className='bottom'>
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
    <div className="schlorshipcheck">
        <div className="header d-flex">
            <div className="icon-calendar-check">
                <i className="bi bi-calendar-check"></i>
            </div>
            <h4>ตรวจสอบข้อมูล</h4>
        </div>

      <div className="row-top-check">
        <form className="d-flex">
          <div className="column-left-check">
            <div className="check-left">
              <label>ประเภทของทุน</label><br></br>
              <select  name="capital" id="capital">
                <option value="study">ทุนเรียนดี</option>
                <option value="activity">ทุนกิจกรรมเด่น</option>
                <option value="property">ทุนขาดคุณทรัพย์</option>
                <option value="other">ทุนอื่นๆ</option>
              </select>
            </div>
          </div>

            <div className="column-right-check" >
            <div className="search-check">
              <input type="text" placeholder="Search" aria-describedby="button-addon2"/>
              <button className="btn " type="button" >
                <i className="bi bi-search"></i>
              </button>
            </div>
         
              
            </div>
          
        </form>
      </div>


        <div calss="row-center-interview ">
          <div className="checklist ">
                <Check_list/>
          </div>
        </div>
      
    </div>
  );
}


export default ScholarshipCheck;
