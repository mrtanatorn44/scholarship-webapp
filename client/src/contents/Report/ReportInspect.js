import React, { useContext, useState, useEffect, Component, PropTypes } from 'react';
import { WebContext } from '../../App';
import Test from '../../data/test.js';
import Axios from 'axios';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// import ReactHTMLTableToExcel from "react-html-table-to-excel";

function ReportInspect(props) {

  const {User,Content,ScholarshipForm} =useContext(WebContext)
  const [content, setContent] = Content;
	const [user,setUser] = User;
  const [query, setQuery] = useState('');
  const [scholarshipForm, setScholarshipForm] = ScholarshipForm;
  const {type,detail,attr_requirement, amount , min_student_year,max_student_year,on_year,on_term,open_date, close_date, donator_id,donator}=scholarshipForm;
  const [form , setForm] = useState([])
  const [attr ,setAttr] = useState([]);
  // const [count , setCount] = useState({
  //   num : 0 
  // })
  const count = form.filter((item)=>{return item.status===4})
  const num= count.length;
  const [table,setTable] = useState({});


  function getForm () {
    Axios.post("http://localhost:5000/getFormByScholarshipID",{
      scholarship_id : localStorage.getItem('ScholarshipID_target')
    }).then((response) => { 
      var result = response.data;
      var ooo =''
      console.log('result', result);
      result.forEach((res, index) => {
        res.profile_detail = JSON.parse(res.profile_detail);
      })
      setForm(result);

    })
  }
console.log(table);

  function getScholarshipForm() {
    
    Axios.post("http://localhost:5000/getScholarship", {
      id : localStorage.getItem('ScholarshipID_target')
    }).then((response)=> {       
      var result =  response.data[0];

      Axios.post("http://localhost:5000/getDonator",{ 
            id: result.donator_id 
      }).then((donator)=> {
        setScholarshipForm({
          ...scholarshipForm,
          id                : result.id,
          status            : result.status,
          type              : result.type,
          detail            : result.detail,
          amount            : result.amount,
          on_year           : result.on_year,
          on_term           : result.on_term,
          open_date         : result.open_date.split("T")[0],
          close_date        : result.close_date.split("T")[0],
          donator_id        : result.donator_id,
          donator           : donator.data[0].name
        })
        setAttr(JSON.parse(result.attribute_requirement))
      })   
    });
  }

  function exportExcel(item){
    console.log(item);
    const XLSX = require('xlsx')

        const convertJsonToExcel = () => {

            const workSheet = XLSX.utils.json_to_sheet([item]);
            const workBook = XLSX.utils.book_new();

            XLSX.utils.book_append_sheet(workBook, workSheet, "form")
            // Generate buffer
            XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })

            // Binary string
            XLSX.write(workBook, { bookType: "xlsx", type: "binary" })

            XLSX.writeFile(workBook, "profiledata.xlsx")
            console.log("lagggg");

        }
        convertJsonToExcel()
  }
  
  useEffect(() => {
    getScholarshipForm();
    getForm();
  }, [])
  return (
    <div className="frame">

        <br></br>
        <center>
          <div className="topic">
            <h4>รายชื่อผู้ที่ได้รับ{scholarshipForm.type}</h4>
            <h4>ทุนประจำปีการศึกษา{scholarshipForm.on_year}  {scholarshipForm.on_term}</h4>
            <h4>สำหรับนิสิต{attr.min_nisit_id}-{attr.max_nisit_id}</h4>
          </div>
        </center>
  
        <div className="right"></div>
        <div className="content5">
          <div className="app-container">
            <table id="table-to-xls">
            <thead>
              <tr>
              <th>ชื่อ</th>
              <th>สาขา</th>
              <th>รหัสนิสิต</th>
              <th>ชั้นปี</th>
              <th>จำนวนเงิน</th>
              </tr>
            </thead>
              {
              <tbody>
              {form
              .filter(
                (item) => {
                  return item.status === 4;
                }).map((item, index) => (
                <>
                  <tr>
                  <td>{item.profile_detail.name} </td>                 
                  <td>{item.profile_detail.branch}</td>
                  <td>{item.profile_detail.std_id}</td>
                  <td>{parseInt(String(new Date().getFullYear() + 543).substring(2, 4)) - String(item.profile_detail.std_id).substring(0,2)}</td>
                  <td>{scholarshipForm.amount}</td>
                </tr>
                {/* {
                  
                  item.status === 4 &&
                    setCount({num : count.num + 1})
                  
                } */}
                </>       
            ))}
            </tbody>
            
           }
           </table>
           </div>
        </div>

        <div class="lasttitle">
          <center>
            <h2>โดย{scholarshipForm.donator}เป็นจำนวนเงิน{num*scholarshipForm.amount}บาท</h2>
            <button className="button-confirm pink1"  onClick = {() => exportExcel(form)}>ดาวน์โหลด</button>
          </center>
        </div>
        
    </div>
  )
}

export default ReportInspect;
