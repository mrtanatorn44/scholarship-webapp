import React, { useState, useContext } from 'react';
import { WebContext } from '../../App';
import CreatableSelect from 'react-select/creatable';

// Alert
import Swal from 'sweetalert2'

function DetailForm () {
  
  const { Scholar } = useContext(WebContext)
  const [scholar, setScholar] = Scholar;
  
  const typeList = [
    { label: 'ทุนเรียนดี', value: 1 },
    { label: 'ทุนเรียนควย', value: 2 },
    { label: 'ทุนเรียนสัส', value: 3 },
  ];
  const onHandleTypeChange = (e) => {
    if (e.value !== null)
      setScholar({...scholar, type: e.label})
   
      
    
    
  }
  return (   
    <form>
      <div className="announce-topic ">
        <div className="type">
          <CreatableSelect
            placeholder={"ทุน"}
            isClearable
            //onChange={(opt, meta) => console.log(opt, meta)}
            onChange={(e) => onHandleTypeChange(e)}
            options={typeList}
          />
  
        
        </div>

          
        <div className="year">
          <input className="academic"  type="number" min="0"  placeholder="ประจำปีการศึกษา" onChange={(event) => {setScholar({...scholar ,on_year: event.target.value })}}></input>
        </div>
        
        <div className="term">
          <select  name="term" id="capital" onChange={(event) => {setScholar({...scholar ,on_term: event.target.value })}}>
            <option value="">ภาคการศึกษา</option>
            <option value="ภาคต้น">ภาคต้น</option>
            <option value="ภาคปลาย">ภาคปลาย</option>
          </select>
        </div>
      </div>
          
      <div className="announce-center">
        <textarea className="detail" type="text" placeholder="คุณสมบัติของผู้รับทุน" onChange={(event) => {setScholar({...scholar , detail: event.target.value })}}></textarea>
      </div>
  
      <div className="announce-bottom">
        <div className="bottom-1">
          <div className="min">
            <input type="number" min="0" placeholder="min_student_year" onChange={(event) => {setScholar({...scholar , min_student_year: event.target.value })}}></input>
          </div>
          <div className="max">
            <input type="number" min="0" placeholder="max_student_year" onChange={(event) => {setScholar({...scholar , max_student_year: event.target.value })}}></input>
          </div>
          <div className="sponsers">
            <input  type="text" placeholder="ผู้สนับสนุน" ></input>
          </div>
          <div className="amount">
            <input type="number" min="0"  placeholder="จำนวนเงิน" onChange={(event) => {setScholar({...scholar ,amount: event.target.value })}}></input>
          </div>
        </div>
        <div className="bottom-2">
          <div className="date1">
            <label >วันที่เปิดให้ลงทะเบียน</label>
            <input type="date" placeholder="วันที่เปิดให้ลงทะเบียน" onChange={(event) => {setScholar({...scholar ,open_date: event.target.value })}}></input>
          </div>
          <div className="date2">
            <label>วันที่ปิดการให้ลงทะเบียน</label>
            <input type="date" placeholder="วันที่ปิดการให้ลงทะเบียน" onChange={(event) => {setScholar({...scholar ,close_date: event.target.value })}}></input>
          </div>
        </div>
      </div>
    </form>
  )
}

export default DetailForm;