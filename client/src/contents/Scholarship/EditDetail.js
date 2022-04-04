/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App';
import Axios from 'axios';

// Alert
import Swal from 'sweetalert2'


function EditDetailForm () {
  
  const { Content,ScholarshipForm, EditScholarshipID, FileForm, ScoringFormat } = useContext(WebContext)
  const [ content, setContent] = Content;
  const [scholarshipForm, setScholarshipForm] = ScholarshipForm;
  const [editScholarshipID, setEditScholarshipID]= EditScholarshipID;
  const [ fileForm , setFileForm]             = FileForm;
  const [scoringFormat, setScoringFormat] = ScoringFormat;

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

  const {type,detail, amount , min_student_year,max_student_year,on_year,on_term,open_date, close_date, donator_id,donator_name}=scholarshipForm;
  const [Scholar, setScholar] = useState({
    id              :'',
    is_public       : false,
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
    donator_name    :''
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
          is_public         : result.is_public,
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
          donator_name      : donator.data[0].name,
          required          : JSON.parse(result.required),
          rating            : JSON.parse(result.rating)
        })
        setFileForm(JSON.parse(result.required))
        setScoringFormat(JSON.parse(result.rating))
      })   
    });
  }
  
  const getAllDonator = () =>{
    Axios.get("http://localhost:5000/getallDonator").then(response => {
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
  
  const changeValue = (value,valueOp) => {
    if (value === '0') {
        setScholarshipForm({ ...scholarshipForm , typeAdd: '', typeInput: 1 })
    } else {
        setScholarshipForm({ ...scholarshipForm , type: valueOp })
      } 
  };
  
  //getType
  const getTypeScholar = () =>{
    Axios.get("http://localhost:5000/getTypeScholar").then(response => {
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
    //getScholarLabel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <select required 
              onChange={(e) => {
                if (e.target.value === '0') {
                  setScholarshipForm({ ...scholarshipForm , typeAdd: '', typeInput: 1 })
                } else {
                  setScholarshipForm({ ...scholarshipForm , type: e.target.selectedOptions[0].text })
                } 
              }}
            >
              {
                typeList.map((item, index) => (
                  <option selected={scholarshipForm.type===item.label? 'select':''} key={index} value={item.value}> {item.label} </option>
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
          <input className="academic"  type="number" min="0" value = {scholarshipForm.on_year} placeholder="ประจำปีการศึกษา" required onChange={(event) => {setScholarshipForm({...scholarshipForm ,on_year: event.target.value })}}></input>
        </div>
        
        <div className="term">
          <label>ทุนประจำภาคเรียนการศึกษา</label>
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
        <div className="bottom-1">
          <div className="min">
            <label>min_student_year</label>
            <input type="number" min="1"  value={scholarshipForm.min_student_year} placeholder="min_student_year" required onChange={(event) => {setScholarshipForm({...scholarshipForm , min_student_year: event.target.value })}}></input>
          </div>
          <div className="max">
            <label>max_student_year</label>
            <input type="number" max="6" value={scholarshipForm.max_student_year} placeholder="max_student_year" required onChange={(event) => {setScholarshipForm({...scholarshipForm , max_student_year: event.target.value })}}></input>
          </div>
          <div className="type">
            <label>ผู้สนับสนุน</label>
          { /* ----- SELECT INPUT ----- */
            (scholarshipForm.sponsorInput === 0 || scholarshipForm.sponsorInput === undefined ) &&
            <select onChange={(e) => {
              if (e.target.value === '0') {
                setScholarshipForm({ ...scholarshipForm , sponsorAdd: '', sponsorInput: 1 })
              } else {
                let index = e.nativeEvent.target.selectedIndex;
                let label = e.nativeEvent.target[index].text;
                setScholarshipForm({ ...scholarshipForm , donator: label })
              } 
            }}>
              {
                donatorList.map((item, index) => (
                  <option selected={scholarshipForm.donator_name===item.label? 'select':''} key={index} value={item.value}> {item.label} </option>
                ))
              }
            </select>
          }
          { /* ----- NORMAL INPUT ----- */
            scholarshipForm.sponsorInput === 1 &&
            <div className='input-button'>
              <input onChange={(e) => setScholarshipForm({...scholarshipForm , sponsorAdd: e.target.value })} type='text' placeholder='ผู้สนับสนุน'/>
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
          <div className="amount">
            <label>จำนวนเงิน</label>
            <input type="number" min="0" value={scholarshipForm.amount} placeholder="จำนวนเงิน" required onChange={(event) => {setScholarshipForm({...scholarshipForm ,amount: event.target.value })}}></input>
          </div>
        </div>
        <div className="bottom-2">
          <div className="date-1">
            <label >วันที่เปิดให้ลงทะเบียน</label>
            <input type="date" value={scholarshipForm.open_date} placeholder="วันที่เปิดให้ลงทะเบียน" required onChange={(event) => {setScholarshipForm({...scholarshipForm ,open_date: event.target.value })}}></input>
          </div>
          <div className="date-2">
            <label>วันที่ปิดการให้ลงทะเบียน</label>
            <input type="date" value={scholarshipForm.close_date} placeholder="วันที่ปิดการให้ลงทะเบียน" required onChange={(event) => {setScholarshipForm({...scholarshipForm ,close_date: event.target.value })}}></input>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditDetailForm;