/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App';
import Axios from 'axios';

// Alert
import Swal from 'sweetalert2'
import RateForm from './CreateRateform';


function EditDetail() {
  
  const { Content,ScholarshipForm, EditScholarshipID, FileForm, RateForm, AttrForm } = useContext(WebContext)
  const [ content, setContent] = Content;
  const [scholarshipForm, setScholarshipForm] = ScholarshipForm;
  const [editScholarshipID, setEditScholarshipID]= EditScholarshipID;
  const [attrForm, setAttrForm] = AttrForm;
  
  
  const [ fileForm, setFileForm ] = FileForm;
  const [ rateForm, setRateForm ] = RateForm;

  // type sponsor
  const [donatorList,setDonatorList] = useState([
    {label: 'เลือกผู้สนับสนุน',    value: ""},
    {label: 'เพิ่มผู้สนับสนุน...',  value: 0}
  ]);
  // type schorlar
  const [typeList,setTypeList] = useState([
    {label: 'เพิ่มทุน...',     value: '0'},
    {label: 'ทุนเรียนดี',      value: '1'},
    {label: 'ทุนกิจกรรมเด่น',  value: '2'},
    {label: 'ทุนขาดคุณทรัพย์', value: '3'}
  ])

  var dataTypeList = ['ทุนเรียนดี', 'ทุนกิจกรรมเด่น', 'ทุนขาดคุณทรัพย์']

  const {type,detail, amount , min_student_year,max_student_year,on_year,on_term,open_date, close_date, donator_id,donator}=scholarshipForm;
  const [Scholar, setScholar] = useState({
    id              : '',
    status          : '',
    type            : '',
    detail          : '',
    amount          : '',
    min_student_year: '',
    max_student_year: '',
    on_year         : '',
    on_term         : '',
    open_date       : '',
    close_date      : '',
    donator_id      :'',
    donator      :''
  })
  

    function checkKey(){

    if ("scholarshipEditID_target" in localStorage) {
      if (localStorage.getItem('scholarshipEditID_target') == '')
        setContent('Scholarship');
      else
        console.log("not have id");
    } else {
      console.log("not have id");
    }
  }
  
 
  //getScholar
  function getScholarshipForm() {
    Axios.post("http://localhost:5000/getScholarship", {
      id : localStorage.getItem('scholarshipEditID_target')
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
          max_student_year  : result.max_student_year,
          min_student_year  : result.min_student_year,
          open_date         : result.open_date.split("T")[0],
          close_date        : result.close_date.split("T")[0],
          donator_id        : result.donator_id,
          donator           : donator.data[0].name
        })
        var tempfileForm = JSON.parse(result.file_requirement)
        tempfileForm.forEach((item, idx) => {
          console.log(item)
          item.isTyping = false;
        })
        setFileForm(tempfileForm);
        setRateForm(JSON.parse(result.interview_requirement));
        setAttrForm(JSON.parse(result.attribute_requirement));
      })   
    });
  }
  
  const getAllDonator = () =>{
    Axios.get("http://localhost:5000/getallDonator").then(response => {
      if (response.data.errno) { // Check if Backend return error
        Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
        return;
      }
      var tempDonatorList = donatorList;
      var result = response.data
      if (result.length === 0)
        return
      result.forEach((res, index) => {  
        if (res.data !== '') {
          tempDonatorList.push({ label: res.name, value: res.id })
        }
      })
      setDonatorList([...donatorList])
    })
  }
  
  //getType
  const getTypeScholar = () =>{
    Axios.get("http://localhost:5000/getTypeScholar").then(response => {
      if (response.data.errno) { // Check if Backend return error
        Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
        return;
      }
      var tempTypeList = typeList;
      var result = response.data;
      result.forEach((res, index) => {  
        var data = res.type;
        if (data !== '' && !dataTypeList.includes(data)) {
          tempTypeList.push({ label: data, value: data })
        }
      })
      setTypeList([...typeList]);
    })
  }

  
  useEffect(() => {
    getScholarshipForm();
    getTypeScholar();
    getAllDonator()
  }, [])

  return (   
    <>
      <div className="heading">
        <h4>ข้อมูลทุนการศึกษา</h4>
      </div>

      <div className="top">
        <div className="type">
          <label>ประเภททุนการศึกษา</label>
          { /* ----- SELECT INPUT ----- */
            (scholarshipForm.typeInput === 0 || scholarshipForm.typeInput === undefined ) &&
            <select 
              value={scholarshipForm.type}
              required 
              onChange={(e) => {
                if (e.target.value === 'เพิ่มทุน...') {
                  setScholarshipForm({ ...scholarshipForm , typeAdd: '', typeInput: 1 })
                } else {
                  setScholarshipForm({ ...scholarshipForm , type: e.target.value })
                } 
              }}
            >
              {
                typeList.map((item, index) => (
                  <option key={index} value={item.label}> {item.label} </option>
                ))
              }
            </select>
          }
          { /* ----- NORMAL INPUT ----- */
            scholarshipForm.typeInput === 1 &&
            <div className='input-button'>
              <input onChange={(e) => setScholarshipForm({...scholarshipForm , typeAdd: e.target.value })} type='text' placeholder='ทุนที่ต้องการ'/>
              { 
                scholarshipForm.typeAdd !== '' &&
                <button onClick={() => {
                  var tempTypeList = typeList;
                  tempTypeList.unshift({ label: scholarshipForm.typeAdd, value: scholarshipForm.typeAdd })
                  setTypeList(tempTypeList);
                  setScholarshipForm({...scholarshipForm , type : scholarshipForm.typeAdd, typeAdd: '', typeInput: 0})
                }}>
                  Add
                </button>
              }
              { 
                scholarshipForm.typeAdd === '' &&
                <button onClick={() => setScholarshipForm({...scholarshipForm , typeInput: 0 })}>
                  X
                </button>
              }
            </div>
          }
        </div>

        <div className="year">
          <label>ทุนประจำปีการศึกษา</label>
          <input className="academic"  type="number" 
            min={String(new Date().getFullYear() + 543 - 2)}  
            max={String(new Date().getFullYear() + 543 + 2)}
            defaultValue = {scholarshipForm.on_year}
            placeholder="ประจำปีการศึกษา"
            required
            onChange={
              (event) => {
                setScholarshipForm({
                  ...scholarshipForm,
                  on_year : event.target.value
                })
              }
            }
          />
        </div>
        
        <div className="term">
          <label>ทุนประจำภาคเรียน</label>
          <select  name="term" id="capital" value = {scholarshipForm.on_term} required onChange={(event) => {setScholarshipForm({...scholarshipForm ,on_term: event.target.value })}}>
            <option value="">ภาคการศึกษา</option>
            <option value="ภาคต้น">ภาคต้น</option>
            <option value="ภาคปลาย">ภาคปลาย</option>
          </select>
        </div>
      </div>
      
  
      <div className="center">
        <p className="details">
          <label>ข้อมูลเบื้องต้น</label>
          <textarea className="detail" type="text" required value = {scholarshipForm.detail} placeholder="ข้อมูลเบื้องต้น" onChange={(event) => {setScholarshipForm({...scholarshipForm , detail: event.target.value })}}></textarea>
        </p>
      </div>
  
      <div className="bottom">
        <div className="top">
          <div className="type">
            <label>ผู้สนับสนุน</label>
            { /* ----- SELECT INPUT ----- */
              (scholarshipForm.sponsorInput === 0 || scholarshipForm.sponsorInput === undefined ) &&
              <select 
                value={scholarshipForm.donator}
                onChange={(e) => {
                  if (e.target.value === 'เพิ่มผู้สนับสนุน...') {
                    setScholarshipForm({ ...scholarshipForm , sponsorAdd: '', sponsorInput: 1 })
                  } else {
                    setScholarshipForm({ ...scholarshipForm , donator: e.target.value })
                  } 
                }}
              >
                {
                  donatorList.map((item, index) => (
                    <option key={index} value={item.label}> {item.label} </option>
                  ))
                }
              </select>
            }
            { /* ----- NORMAL INPUT ----- */
              scholarshipForm.sponsorInput === 1 &&
              <div className='input-button'>
                <input 
                  onChange={(e) => setScholarshipForm({...scholarshipForm , sponsorAdd: e.target.value })} 
                  type='text' 
                  placeholder='ผู้สนับสนุน'
                />
               { 
                  scholarshipForm.sponsorAdd !== '' &&
                  <button onClick={() => {
                    var tempTypeList = donatorList;
                    tempTypeList.unshift({ label: scholarshipForm.sponsorAdd, value: scholarshipForm.sponsorAdd })
                    setDonatorList(tempTypeList);
                    setScholarshipForm({...scholarshipForm , donator : scholarshipForm.sponsorAdd, sponsorAdd: '', sponsorInput: 0})
                  }}>
                    Add
                  </button>
                }
                { 
                  scholarshipForm.sponsorAdd === '' &&
                  <button onClick={() => setScholarshipForm({...scholarshipForm , sponsorInput: 0 })}>
                    X
                  </button>
                }
              </div>
              
            }
            </div>
           <div className="year">
            <label>จำนวนเงิน</label>
            <input
              type="number"
              min="0"
              defaultValue={scholarshipForm.amount}
              placeholder="จำนวนเงิน"
              required
              onChange={(event) => {setScholarshipForm({...scholarshipForm ,amount: event.target.value })}}
            />
          </div>
        </div>
        <div className="bottom-2">
          <div className="date-1">
            <label >วันที่เปิดให้ลงทะเบียน</label>
            <input 
              type="date"
              defaultValue={scholarshipForm.open_date}
              placeholder="วันที่เปิดให้ลงทะเบียน"
              required
              onChange={
                (event) => {
                  setScholarshipForm({
                    ...scholarshipForm,
                    open_date : event.target.value
                  })
                }
              }
            />
          </div>
          <div className="date-2">
            <label>วันที่ปิดการให้ลงทะเบียน</label>
            <input
              type="date"
              defaultValue={scholarshipForm.close_date}
              placeholder="วันที่ปิดการให้ลงทะเบียน"
              required
              onChange={
                (event) => {
                  setScholarshipForm({
                    ...scholarshipForm,
                    close_date : event.target.value
                  })
                }
              }
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default EditDetail;