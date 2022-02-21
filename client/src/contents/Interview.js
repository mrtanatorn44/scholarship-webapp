import React, { useContext, useState, useEffect } from 'react';
import './Interview.css';
import data from '../data/datanews.js';
import {WebContext} from "../App";



function Interview(props) {
  const { Test2 } = useContext(WebContext);
  const [test2, setTest2] = Test2;
  
  function Name_list(){
    const [visible, setVisible] = useState(false);
    const Scholar = ({idScholar,title,detail,date}) => {
      return(
        <article className = "scholar-Interview">
          <div className = 'title'>
            <h2>{title}</h2>
            
          </div>
          <div className="button-Interview d-flex" >

            <button className="button-search d-flex" type="button" onClick={ () => props.sendContent(['admin', 'InterviewRate']) }>
              <i className="bi bi-search"></i>
              <p>การประเมิน</p>
            </button>

            <button className="button-clock d-flex"  type="button"onClick={ () => props.sendContent(['admin', 'InterviewSchedule']) }>
              <i className="bi bi-clock"></i>
              <p>เวลาสัมภาษณ์</p>
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
    <div className="interview">

        <div className="header d-flex">
            <div className="icon-calendar-check">
                <i className="bi bi-calendar-check"></i>
            </div>
            <h4>การสัมภาษณ์</h4>
        </div>
        

      <div className="row-top-interview">
        <form className="d-flex">
          <div className="column-left-interview">
              <label>ประเภทของทุน</label><br></br>
              <select  name="capital" id="capital">
                <option value="study">ทุนเรียนดี</option>
                <option value="activity">ทุนกิจกรรมเด่น</option>
                <option value="property">ทุนขาดคุณทรัพย์</option>
                <option value="other">ทุนอื่นๆ</option>
              </select>
              </div>
            <div className="column-right-interview" >
            <div className="input-group">
              <input type="text" placeholder="Search" aria-describedby="button-addon2"/>
              <button className="btn" type="button" >
                <i className="bi bi-search"></i>
              </button>
            </div>
          
              
            </div>
          
        </form>
      </div>


        <div calss="row-center-interview ">
          <div className="scholarnews ">
                <Name_list/>
          </div>
        </div>
      
    </div>
  );
}


export default Interview;
