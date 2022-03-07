import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App';
import CreatableSelect from 'react-select/creatable';

import Axios from 'axios';

// Alert
import Swal from 'sweetalert2'

function DetailForm () {
  
  const { ScholarshipForm } = useContext(WebContext)
  const [scholarshipForm, setScholarshipForm] = ScholarshipForm;
  
  // type schorlar
  const [typeList,setTypeList] = useState([
    {label: 'เลือกประเภททุน', value: ""},
    {label: 'เพิ่มทุน...',     value: '0'},
    {label: 'ทุนเรียนดี',      value: '1'},
    {label: 'ทุนกิจกรรมเด่น',  value: '2'},
    {label: 'ทุนขาดคุณทรัพย์', value: '3'}
  ])


  var dataTypeList = ['ทุนเรียนดี', 'ทุนกิจกรรมเด่น', 'ทุนขาดคุณทรัพย์']

  // type sponsor
  
  const [sponsorList,setSponsorList] = useState([]);
  
  const onHandleTypeChange = (e) => {
    if (!e) {
      e = {
        value: '',
      };
    }
    if (e.value !== null)
      setScholarshipForm({...scholarshipForm, type: e.label}) 
  }

  const onHandleSponsor = (e) => {
    if (!e) {
      e = {
        value: '',
      };
    }
    if (e.value !== null)
      setScholarshipForm({...scholarshipForm, sponsor: e.label})
       
  }

  const getTypeScholar = () =>{
    Axios.get("http://localhost:5000/getTypeScholar").then(response => {
      var tempTypeList = typeList;
      var result = response.data
      result.forEach((res, index) => {  
        var data = res.type;
        if (data !== '' && !dataTypeList.includes(data)) {
          tempTypeList.push({ label: data, value: data })
        }
      })
      setTypeList(tempTypeList);
    })
  }

  const getSponsor = () =>{
    Axios.get("http://localhost:5000/getSponsor").then(response => {
      var dummySponsorList = sponsorList;
      // [{},{},{}]
      var result = response.data
      result.forEach((res, index) => {  
        var data = res.sponsor;
        if (data !== '') {
          dummySponsorList.push({ label: data, value: data })
        }
      })
      setSponsorList(dummySponsorList);
    })
  }
  
  

  useEffect(() => {
    setScholarshipForm([]);
    getTypeScholar();
    getSponsor();
  }, [])
  
  //console.log(typeList);
  
  return (   
    <>
      <div className="announce-topic ">
        <div className="type">
          { /* ----- SELECT INPUT ----- */
            (scholarshipForm.typeInput === 0 || scholarshipForm.typeInput === undefined ) &&
            <select required onChange={(e) => {
              if (e.target.value === '0') {
                setScholarshipForm({ ...scholarshipForm , typeAdd: '', typeInput: 1 })
              } else {
                setScholarshipForm({ ...scholarshipForm , type: e.target.selectedOptions[0].text })
              } 
            }}>
              {
                typeList.map((item, index) => (
                  <option key={index} value={item.value}> {item.label} </option>
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
          <input className="academic"  type="number" min="0"  placeholder="ประจำปีการศึกษา" required onChange={(event) => {setScholarshipForm({...scholarshipForm ,on_year: event.target.value })}}></input>
        </div>
        
        <div className="term">
          <select  name="term" id="capital" required onChange={(event) => {setScholarshipForm({...scholarshipForm ,on_term: event.target.value })}}>
            <option value="">ภาคการศึกษา</option>
            <option value="ภาคต้น">ภาคต้น</option>
            <option value="ภาคปลาย">ภาคปลาย</option>
          </select>
        </div>
      </div>

      <div className="announce-center">
        <textarea className="detail" type="text" required placeholder="คุณสมบัติของผู้รับทุน" onChange={(event) => {setScholarshipForm({...scholarshipForm , detail: event.target.value })}}></textarea>
      </div>
  
      <div className="announce-bottom">
        <div className="bottom-1">
          <div className="min">
            <input type="number" min="0" placeholder="min_student_year" required onChange={(event) => {setScholarshipForm({...scholarshipForm , min_student_year: event.target.value })}}></input>
          </div>
          <div className="max">
            <input type="number" min="0" placeholder="max_student_year" required onChange={(event) => {setScholarshipForm({...scholarshipForm , max_student_year: event.target.value })}}></input>
          </div>
          <div className="sponsers" >
            <CreatableSelect required
              placeholder={"ผู้สนับสนุน"}
              isClearable
              //onChange={(opt, meta) => console.log(opt, meta)}
              onChange={(e) => onHandleSponsor(e)}
              options={sponsorList}
            />
          </div>
          <div className="amount">
            <input type="number" min="0"  placeholder="จำนวนเงิน" required onChange={(event) => {setScholarshipForm({...scholarshipForm ,amount: event.target.value })}}></input>
          </div>
        </div>
        <div className="bottom-2">
          <div className="date1">
            <label >วันที่เปิดให้ลงทะเบียน</label>
            <input type="date" placeholder="วันที่เปิดให้ลงทะเบียน" required onChange={(event) => {setScholarshipForm({...scholarshipForm ,open_date: event.target.value })}}></input>
          </div>
          <div className="date2">
            <label>วันที่ปิดการให้ลงทะเบียน</label>
            <input type="date" placeholder="วันที่ปิดการให้ลงทะเบียน" required onChange={(event) => {setScholarshipForm({...scholarshipForm ,close_date: event.target.value })}}></input>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailForm;