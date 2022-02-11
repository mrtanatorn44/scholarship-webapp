import { React, useState, useEffect } from 'react';
import './Report.css';
import data from '../../data/datanews.js';

function Report() {
  function Report_list(){
    const [visible, setVisible] = useState(false);
    const Scholar = ({idScholar,title,detail,date}) => {
      return(
        <article className = "reportlist">
          <button type="button" onclick="alert('การประเมิน!')">ดูรายละเอียด</button> 
          <div class='bottom'>
            <h3>{detail}</h3>
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
    <div class="report">
        <div class="header d-flex">
            <div class="icon-files">
                <i class="bi bi-files"></i>
            </div>
            <h4>รายงานทุน</h4>
        </div>

        <div calss="row-top-interview d-flex  ">
          <form>
            <div class="column-left-interview">
              <div >
                <label>ทุนปีการศึกษา</label><br></br>
              </div>
            </div>
              <div class="column-right-interview">
                <select  name="capital">
                  <option value="2564">2564</option>
                  <option value="2563">2563</option>
                  <option value="2562">2562</option>
                  <option value="2561">2561</option>
                </select>
            </div>
          </form>
          
          <form>
            <div class="column-left-interview">
              <div >
                <label>เทอม</label><br></br>
              </div>
            </div>
              <div class="column-right-interview">
                <select  name="capital" >
                  <option value="first">ต้น</option>
                  <option value="final">ปลาย</option>
                </select>
            </div>
          </form>

          <form>
            <div class="column-left-interview">
              <div >
                <label>ทุนประเภท</label><br></br>
              </div>
            </div>
              <div class="column-right-interview">
                <select  name="capital" id="capital">
                  <option value="study">ทุนเรียนดี</option>
                  <option value="activity">ทุนกิจกรรมเด่น</option>
                  <option value="property">ทุนขาดคุณทรัพย์</option>
                  <option value="other">ทุนอื่นๆ</option>
                </select>
            </div>
          </form>

          <form>
            <div class="column-left-interview">
              <div >
                <label>โดย</label><br></br>
              </div>
            </div>
              <div class="column-right-interview">
                <select  name="capital" id="capital">
                  <option value="study">ผู้สนับสนุน</option>
                </select>
            </div>
          </form>

        </div>

      <div>
        <Report_list/>
      </div>

    </div>
    ); 
}
export default Report;
