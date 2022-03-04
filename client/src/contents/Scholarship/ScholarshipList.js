import React, { useContext, useState, useEffect } from 'react';
import data from '../../data/datanews.js';
import { WebContext } from '../../App';
import Axios from 'axios';


/* eslint-disable */

import ImageModal from "../../modals/ImageModal.js";
import AlertModal from '../../modals/AlertModal.js';
import ConfirmDeleteModal from '../../modals/ConfirmModal.js';
function ScholarshipList(props) {

  const { User, Content } = useContext(WebContext)

  const [user,setUser] = User;
  const [content, setContent] = Content;

  const [Scholarna, setScholarna] = useState([{
    Type :'',
    createDate :'',
    Detail:'',
    organName :'',
    Amount:'',
    check:false
  }])

  const [Scholar, setScholar] = useState(
    data.map((x) => ({
      ...x,
      check:false
    }))
  )
  /*
  const getScholar = () => {
    Axios.get("http://localhost:5000/getAllScholarship").then((response) => { 
      var result = response.data;
      if (result.length !== 0) {
        result.forEach((res, index) => {
          var month_th      = ["", "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
          var dmy           = res.date.split("T")[0].split("-").reverse();
          var date_tranform = "วันที่ " + (parseInt(dmy[0])) + " " + month_th[parseInt(dmy[1], 10)] + " " + (parseInt(dmy[2]) + 543);
          
          Object.assign(res, {
            Type          : res.Type.data,
            createDate    : date_tranform,
            Detail        : 
            organName     : 
            Amount        : 
          });
        });
      }
        setScholarna(result);
    })
  }
   */



  const checkState = (index) => {
    let a=[...Scholar];
    a[index].check=!a[index].check;
    setScholar(a); 
  }

  //get user
  const getUser = () =>{
    Axios.get("http://localhost:5000/getUser").then(response => {
      //setUser(response.data)
      
    })
  }
  useEffect(() => {
    getUser();
  }, [])
  
  return (
    Scholar.map((scholar, index) => (
      <div className = "d-flex">
        <div className = "scholar-list">

          <div className = 'title'>
            <h2>{scholar.title}</h2>
            <h3>{scholar.date}</h3>
          </div>

          <div className='scholar-bottom'>
            <div className='admin-panel'>
              {
                user.role === 'admin' &&
                <>
                  <div className="btn-admin">
                    <button className="btn-delete" > ลบ </button>
                    <button className="btn-modify" onClick={ () => setContent('ScholarshipListEdit') } > แก้ไข </button>
                  </div>
                </>
              }
            </div> 
            <div className='user-panel'>
              <h3 onClick={() => checkState(index)}>
                {!scholar.check ? "รายละเอียดเพิ่มเติม (แสดง)" : "รายละเอียดเพิ่มเติม (ซ่อน)"}
              </h3>  
            </div>
          </div> 
          {scholar.check && <h3>{scholar.detail}</h3>} 
        </div>
        <button className = "button-big" type="button" onClick={ () => setContent('ScholarshipListRegister') }>
          ลงทะเบียน
        </button>
      </div>
    ))
  )
}   

export default ScholarshipList;