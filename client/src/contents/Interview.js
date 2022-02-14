import { React, useState, useEffect } from 'react';
import './Interview.css';
import data from '../data/datanews.js';


function Interview(props) {
  function Name_list(){
    const [visible, setVisible] = useState(false);
    const Scholar = ({idScholar,title,detail,date}) => {
      return(
        <article className = "scholar-Interview">
          <div class = 'title'>
            <h2>{title}</h2>
            
          </div>
          <div class="button-Interview d-flex" >

            <button class="button-search d-flex" type="button" onClick={ () => props.sendContent(['admin', 'InterviewRate']) }>
              <i class="bi bi-search"></i>
              <p>การประเมิน</p>
            </button>

            <button class="button-clock d-flex"  type="button"onClick={ () => props.sendContent(['admin', 'InterviewSchedule']) }>
              <i class="bi bi-clock"></i>
              <p>เวลาสัมภาษณ์</p>
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
    <div class="interview">
        <div class="header d-flex">
            <div class="icon-calendar-check">
                <i class="bi bi-calendar-check"></i>
            </div>
            <h4>การสัมภาษณ์</h4>
        </div>

      <div class="row-top-interview">
        <form class="d-flex">
          <div class="column-left-interview">
              <label>ประเภทของทุน</label><br></br>
              <select  name="capital" id="capital">
                <option value="study">ทุนเรียนดี</option>
                <option value="activity">ทุนกิจกรรมเด่น</option>
                <option value="property">ทุนขาดคุณทรัพย์</option>
                <option value="other">ทุนอื่นๆ</option>
              </select>
              </div>
            <div class="column-right-interview" >
            <div class="input-group">
              <input type="text" placeholder="Search" aria-describedby="button-addon2"/>
              <button class="btn " type="button" >
                <i class="bi bi-search"></i>
              </button>
            </div>
          
              
            </div>
          
        </form>
      </div>


        <div calss="row-center-interview ">
          <div class="scholarnews ">
                <Name_list/>
          </div>
        </div>
      
    </div>
  );
}


export default Interview;
