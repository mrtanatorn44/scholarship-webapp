import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App';
import CreatableSelect from 'react-select/creatable';
import Axios from 'axios';

// Alert
import Swal from 'sweetalert2';
import Lightbox from 'react-image-lightbox';


import ConfirmSaveModal from '../../modals/ConfirmModal.js';


function EditDetailForm () {
  
  const { Content,ScholarshipForm, EditScholarshipID } = useContext(WebContext)
  const [ content, setContent] = Content;
  const [scholarshipForm, setScholarshipForm] = ScholarshipForm;
  const [editScholarshipID, setEditScholarshipID]= EditScholarshipID;

  const [showModalSave, setShowModalSave] = useState(false);
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);
  
  // type schorlar
  const [typeList,setTypeList] = useState([
    {label: 'ทุนเรียนดี', value: 1},
    {label: 'ทุนกิจกรรมเด่น', value: 2},
    {label: 'ทุนขาดคุณทรัพย์', value: 3},
  ])

  const [Scholar, setScholar] = useState({
    id:'',
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
  })

  console.log(editScholarshipID);

  var dataTypeList = ['ทุนเรียนดี', 'ทุนกิจกรรมเด่น', 'ทุนขาดคุณทรัพย์']

  // type sponsor
  
  const [sponsorList,setSponsorList] = useState([]);
  
  function getScholar() {
    Axios.post("http://localhost:5000/getScholarship", {
        id : editScholarshipID
      }).then((response)=> {       
        var result =  response.data[0];
        setScholar({...Scholar,
          id: result.id,
          is_public : result.is_public,
          type: result.type,
          detail :result.detail
          }) 
      }
    )
    
  }
  
  const onChangescholar = (Scholar,id) => {
    Axios.post("http://localhost:5000/editScholar", { 
      detail : Scholar.detail,
      id: id
    }).then((response)=>{
      console.log("OK");
    })
  }
  
  function getConfirmSave(isConfirm) {
    if (isConfirm) {
      onChangescholar(Scholar,editScholarshipID);
      setContent('Announcement');
    }
    setShowModalSave(false);
  }
  
  
  
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
    getTypeScholar();
    getSponsor();
    getScholar();
  }, [])
  
  return ( 
      <div>  

        <form>
        <div className="announce-topic ">
            <div className="type">
            <CreatableSelect 
                //placeholder={"ประเภททุน"} 
                isClearable
                //onChange={(opt, meta) => console.log(opt, meta)}
                options={typeList}
            />
            </div>

            
            <div className="year">
            <input className="academic"  type="number" min="0"  placeholder="ประจำปีการศึกษา"  required onChange={(event) => {setScholarshipForm({...scholarshipForm ,on_year: event.target.value })}}></input>
            </div>
            
            <div className="term">
            <select  name="term" id="capital" required >
                <option value="">ภาคการศึกษา</option>
                <option value="ภาคต้น">ภาคต้น</option>
                <option value="ภาคปลาย">ภาคปลาย</option>
            </select>
            </div>
        </div>
            
        <div className="announce-center">
            <textarea className="detail" type="text" required placeholder="คุณสมบัติของผู้รับทุน" value={Scholar.detail} onChange={(e) => {setScholar({...Scholar, detail: e.target.value })}}>  </textarea>
            {/*
              <button className="save-button" onClick={() => (setShowModalSave(true))}>
                <i className="bi bi-save"/><p>บันทึก</p>
              </button>
            */}

        </div>
    
        <div className="announce-bottom">
            <div className="bottom-1">
            <div className="min">
                <input type="number" min="0" placeholder="min_student_year" required ></input>
            </div>
            <div className="max">
                <input type="number" min="0" placeholder="max_student_year" required ></input>
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
                <input type="number" min="0" placeholder="จำนวนเงิน" required ></input>
            </div>
            </div>
            <div className="bottom-2">
            <div className="date1">
                <label >วันที่เปิดให้ลงทะเบียน</label>
                <input type="date" placeholder="วันที่เปิดให้ลงทะเบียน" required ></input>
            </div>
            <div className="date2">
                <label>วันที่ปิดการให้ลงทะเบียน</label>
                <input type="date" placeholder="วันที่ปิดการให้ลงทะเบียน" required ></input>
            </div>
            </div>
        </div>
        </form>
        
        
    </div>

  )
}

export default EditDetailForm;