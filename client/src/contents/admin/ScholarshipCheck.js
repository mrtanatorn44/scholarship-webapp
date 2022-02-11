import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SchlorshipCheck.css';
import data from '../../data/datanews.js';

function ScholarshipCheck() {
  function Name_list(){
    const [visible, setVisible] = useState(false);
    const Scholar = ({idScholar,title,detail,date}) => {
      return(
        <article className = "scholar">
          <button type="button" onclick="alert('การประเมิน!')">ตรวจสอบเอกสาร</button>
          <button type="button" onclick="alert('เวลาสัมภาษณ์!')">ตรวจสอบประวัติ</button>  
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
    <div class="scholarshipcheck">
        <div class="header d-flex">
            <div class="icon-search">
                <i class="bi bi-search"></i>
            </div>
            <h4>ตรวจสอบข้อมูล</h4>
        </div>

      <div calss="row-top-interview d-flex  ">
        <form>
          <div class="column-left-interview">
            <div >
              <label>ประเภทของทุน</label><br></br>
            </div>
          </div>
            <div class="column-right-interview">
              <select  name="capital" id="capital">
                <option value="study">ทุนเรียนดี</option>
                <option value="activity">ทุนกิจกรรมเด่น</option>
                <option value="property">ทุนขาดคุณทรัพย์</option>
                <option value="other">ทุนอื่นๆ</option>
              </select>
              <div class="input-icons">
                <input placeholder="Search" required class="input-field" type="text"></input>
                <i class="bi bi-search"></i>
            </div>
          </div>
        </form>
        <div calss="row-top-interview">
          <div class="scholarnews">
                <Name_list/>
          </div>
        </div>

   
      </div>

    </div>
    ); 
}

export default ScholarshipCheck;
