import React, { useContext, useState, useEffect } from 'react';
import './Report.css';
import data from '../data/datanews.js';
import { WebContext } from '../App';

function Report(props) {

  const { Test1 } = useContext(WebContext);
  const [test1, setTest1] = Test1;

  function Report_list(){
    const [visible, setVisible] = useState(false);
    const Scholar = ({idScholar,title,detail,date}) => {
      return(
        <article className = "reportlist d-flex">
          <div className='bottom'>
            <h3>{detail}</h3>
          </div>
          <div className="button-report">
            <button className="button-search d-flex" type="button"onClick = {() => props.sendContent(['admin','ReportInspect'])}>
              <i className="bi bi-search"></i>
              <p>ดูรายละเอียด</p>
            </button> 
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

/*
   function  handleChange (e) {
      console.log(e.target.value);
      this.setState({message: e.target.value}, this.handleSubmit);
  }*/
  return (
    <div className="report">

      {/* TEST USECONTEXT */} 
      <center>
        <div>
          <h1>{test1}</h1>
          <input onChange={(e) => setTest1(e.target.value)} />
        </div>
      </center>













        <div className="header d-flex">
            <div className="icon-files">
                <i className="bi bi-files"></i>
            </div>
            <h4>รายงานทุน</h4>
        </div>

        <form className="row-top-report d-flex" >
          
            <div className="report-scholarship">
              <label>ทุนปีการศึกษา</label><br></br>
                <select  name="capital">
                <option value="2564">2564</option>
                    <option value="2563">2563</option>
                    <option value="2562">2562</option>
                    <option value="2561">2561</option>
                  </select>
            </div> 

            <div className="report-term">
              <label>เทอม</label><br></br>
              <select  name="capital" >
                <option value="first">ต้น</option>
                <option value="final">ปลาย</option>
              </select>
            </div>
            

            <div className="report-type">
              <label>ทุนประเภท</label> <br></br>
              <select  name="capital" id="capital">
                <option value="study">ทุนเรียนดี</option>
                <option value="activity">ทุนกิจกรรมเด่น</option>
                <option value="property">ทุนขาดคุณทรัพย์</option>
                <option value="other">ทุนอื่นๆ</option>
              </select>
            </div>
          

            <div className="report-sponcer">
              <label>โดย</label> <br></br>
              <select  name="capital" id="capital">
                <option value="study">ผู้สนับสนุน</option>
              </select>  
            </div>
          
       </form>
       
      <div className="row-center-report">
        <Report_list/>
      </div>

    </div>
    ); 
}
export default Report;
