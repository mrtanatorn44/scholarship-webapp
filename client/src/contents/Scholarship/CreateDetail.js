/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App';
import CreatableSelect from 'react-select/creatable';

import Axios from 'axios';

function CreateDetail () {
  
  const { ScholarshipForm } = useContext(WebContext)
  const [scholarshipForm, setScholarshipForm] = ScholarshipForm;

  // type scholar
  const [presetTypeList,setPresetTypeList] = useState([
    {label: 'เลือกประเภททุน', value: ""},
    {label: 'เพิ่มทุน...',     value: '0'},
    {label: 'ทุนเรียนดี',      value: '1'},
    {label: 'ทุนกิจกรรมเด่น',  value: '2'},
    {label: 'ทุนขาดคุณทรัพย์', value: '3'}
  ])

  // type donator
  const [presetDonatorList,setPresetDonatorList] = useState([
    {label: 'เลือกผู้สนับสนุน',    value: ""},
    {label: 'เพิ่มผู้สนับสนุน...',  value: 0}
  ]);
  
  function getType() {
    Axios.get("http://localhost:5000/getTypeScholar").then(response => {
      var tempPresetTypeList = presetTypeList;
      var databaseTypeList = response.data;
      // loop type from database
      databaseTypeList.forEach((databaseType, databaseTypeIndex) => {
        var isDupe = false;
        // loop type form preset and compare to database
        presetTypeList.forEach((presetType, presetTypeIndex) => {  
          // if both type is equae then skip
          if (presetType.label===databaseType.type) {
            isDupe = true;
          }
        })
        // will add type that not equae and not empty
        if (databaseType.type !== '' && !isDupe) {
          tempPresetTypeList.push({ label: databaseType.type, value: databaseType.type })
        }
      })
      setPresetTypeList([...presetTypeList]);
    })
  }

  function getDonator() {
    Axios.get("http://localhost:5000/getallDonator").then(response => {
      var tempDonatorList = presetDonatorList;
      var result = response.data
      if (result.length === 0)
        return
      result.forEach((res, index) => {  
        if (res.data !== '') {
          tempDonatorList.push({ label: res.name, value: res.id })
        }
      })
      setPresetDonatorList([...presetDonatorList])
    })
  }

  useEffect(() => {
    getDonator();
    getType();
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
            !scholarshipForm.isInputType &&
            <select 
              defaultValue={scholarshipForm.type}
              onChange={(e) => {
                if (e.target.value === '0') {
                  setScholarshipForm({ ...scholarshipForm , typeAdd: '', isInputType: true })
                } else {
                  setScholarshipForm({ ...scholarshipForm , type: e.target.selectedOptions[0].text })
                } 
              }}
              required
            >
              {
                presetTypeList.map((presetType, presetTypeIndex) => (
                  <option
                    key={presetTypeIndex} 
                    value={presetType.value}
                  >
                    {presetType.label}
                  </option>
                ))
              }
            </select>
          }
          { /* ----- TEXT INPUT ----- */
            scholarshipForm.isInputType &&
            <div className='input-button'>
              <input 
                onChange={(e) => {
                  setScholarshipForm({
                    ...scholarshipForm,
                    typeAdd: e.target.value 
                  })
                }} 
                type='text' 
                placeholder='ทุนที่ต้องการ'
              />
              { 
                // [TYPE INPUT] has data
                scholarshipForm.typeAdd !== '' &&
                <button onClick={() => {
                  var tempTypeList = presetTypeList;
                  tempTypeList.push({ label: scholarshipForm.typeAdd, value: scholarshipForm.typeAdd })
                  setPresetTypeList(tempTypeList);
                  setScholarshipForm({...scholarshipForm , type : scholarshipForm.typeAdd, typeAdd: '', isInputType: false})
                }}>
                  Add
                </button>
              }
              { 
                // [TYPE INPUT] is empty
                scholarshipForm.typeAdd === '' &&
                <button 
                  onClick={() => {
                    setScholarshipForm({
                      ...scholarshipForm,
                      isInputType: false
                    })
                  }}
                >
                  X
                </button>
              }
            </div>
          }
        </div>

        <div className="year">
          <label>ทุนประจำปีการศึกษา</label>
          <input 
            className="academic"  
            type="number"  
            min={String(new Date().getFullYear() + 543 - 2)}  
            max={String(new Date().getFullYear() + 543 + 2)} 
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
          <label>ทุนประจำภาคเรียนการศึกษา</label>
          <select  name="term" id="capital" required onChange={(event) => {setScholarshipForm({...scholarshipForm ,on_term: event.target.value })}}>
            <option value="">ภาคการศึกษา</option>
            <option value="ภาคต้น">ภาคต้น</option>
            <option value="ภาคปลาย">ภาคปลาย</option>
          </select>
        </div>
      </div>
      
  
      <div className="center">
        <p className="details">
          <label>ข้อมูลเบื้องต้น</label>
          <textarea className="detail" type="text" required placeholder="ข้อมูลเบื้องต้น" onChange={(event) => {setScholarshipForm({...scholarshipForm , detail: event.target.value })}}></textarea>
        </p>
      </div>
  
      <div className="bottom">
        <div className="bottom-1"> 
          <div className="type">
            <label>ผู้สนับสนุน</label>
            { 
              /* ----- SELECT INPUT ----- */
              !scholarshipForm.isInputDonator &&
              <select 
              defaultValue={scholarshipForm.donator}
              onChange={(e) => {
                if (e.target.value === '0') {
                     setScholarshipForm({
                      ...scholarshipForm,
                      donatorAdd: '',
                      isInputDonator: true
                    })
                  } else {
                    let index = e.nativeEvent.target.selectedIndex;
                      let label = e.nativeEvent.target[index].text;
                      setScholarshipForm({
                        ...scholarshipForm,
                        donator: label
                      })
                    } 
                  }}
                  required
                >
                  {
                    presetDonatorList.map((presetDonator, index) => (
                      <option
                        key={index}
                        value={presetDonator.value}
                      >
                        {presetDonator.label}
                      </option>
                    ))
                  }
                </select>
              }
              { 
                /* ----- NORMAL INPUT ----- */
                scholarshipForm.isInputDonator &&
                <div className='input-button'>
                  <input className="add"
                    onChange={(e) => {
                      setScholarshipForm({
                        ...scholarshipForm,
                        donatorAdd: e.target.value
                      })
                    }} 
                    type='text' 
                    placeholder='ผู้สนับสนุน'
                  />
                  {  
                    // [DONATOR INPUT] has data
                    scholarshipForm.donatorAdd !== '' &&
                    <button className='button-circle green1'
                      // add 'Custom Donator' to preset
                      onClick={() => {
                        var tempTypeList = presetDonatorList;
                        tempTypeList.push({
                          label: scholarshipForm.donatorAdd,
                          value: scholarshipForm.donatorAdd
                        })
                        setPresetDonatorList(tempTypeList);
                        setScholarshipForm({
                          ...scholarshipForm,
                          donator    : scholarshipForm.donatorAdd,
                          donatorAdd : '',
                          isInputDonator : false
                        })
                      }}
                    ><i className="bi bi-plus-lg"></i></button>
                  }
                  { 
                    // [DONATOR INPUT] is empty
                    scholarshipForm.donatorAdd === '' &&
                    <button className='button-circle red1'
                      // back to 'Select Donator'
                      onClick={() => {
                        setScholarshipForm({
                          ...scholarshipForm,
                        isInputDonator: false 
                      })
                    }}
                  >X</button>
                }
              </div>
            }
          </div>

          <div className="amount">
            <label>จำนวนเงิน</label>
            <input type="number" min="0"  placeholder="จำนวนเงิน" required onChange={(event) => {setScholarshipForm({...scholarshipForm ,amount: event.target.value })}}></input>
          </div>   
        </div>

        <div className="bottom-2">
          <div className="date-1">
            <label >วันที่เปิดให้ลงทะเบียน</label>
            <input 
              type="date"
              placeholder="วันที่เปิดให้ลงทะเบียน"
              required
              onChange={
                (event) => {
                  setScholarshipForm({
                    ...scholarshipForm,
                    open_date : event.target.value
                    }
                  )
                }
              }
            />
          </div>

          <div className="date-2">
            <label>วันที่ปิดการให้ลงทะเบียน</label>
            <input 
              type="date"
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

export default CreateDetail;