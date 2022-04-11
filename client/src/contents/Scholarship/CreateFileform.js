import React, { useState, useContext, useEffect } from 'react';
import { WebContext } from '../../App';
import Axios from 'axios';

function CreateFileForm (){
  const {FileForm} = useContext(WebContext)
  const [fileForm, setFileForm] = FileForm;
  const [titleList,setTitleList] = useState([
    {label: 'เลือกเอกสาร'      ,value: ''},
    {label: 'เพิ่มเอกสาร...'    ,value: '0'},
    {label: 'สำเนาบัตรประชาชน' ,value: '1'},
    {label: 'ทะเบียนบ้าน'      ,value: '2'},
    {label: 'เกรดเฉลี่ยสะสม'    ,value: '3'}
  ])
  const [formatList, setFormatList] = useState([
    {label: 'เลือกนามสกุลไฟล์' ,value: ''},
    {label: 'JPG, PNG'       ,value: '1'},
    {label: 'DOCX, DOC'      ,value: '2'},
    {label: 'PDF'           ,value: '3'}
  ])
  

  useEffect(() => {
    setFileForm([
      {
        hashID : Math.random().toString(36).substr(2, 7),
        title : "",
        format :"",
        isTyping : false,
        customTitle: ""
      }
    ]);
  }, [])
  return (
    <>
      <div className="heading">
        <h4>เอกสารประกอบการยื่นทุน</h4>
      </div>

      <div className="subject">
        <div className='w100 d-flex'>
          <div className='w10'></div>
          <div className='w40'>หัวข้อ</div>
          <div className='w40'>นามสกุลไฟล์</div>
          <div className='w10'></div>
        </div>

        {/* ----- FILE OPTION ----- */}
        { 
          fileForm.map((file, index) => (
            // EACH FILE
            <div className="w100 mgb1 d-flex" key={index}>
              { /* ----- ORDER ----- */ }
              <div className="w10 text1 fs07"><b>ลำดับ {index+1}</b></div>

              { /* ----- File Name ----- */ }
              <div className="w40 select2">
                { 
                  // SELECT OPTION
                  !file.isTyping && 
                  <select 
                    className="select-1" 
                    value={file.title}
                    onChange={
                      (e) => {
                        var tempfileForm = [...fileForm];
                        var handleSelect = tempfileForm.filter(
                          (obj) => {
                            if (obj.hashID === file.hashID) {
                              if (e.target.value === 'เพิ่มเอกสาร...') { // Change to 'customTitle' mode
                                obj.isTyping = true;
                                obj.customTitle = '';
                              } else { // update value
                                obj.title = e.target.selectedOptions[0].text;
                              }
                            }
                          }
                        )
                        setFileForm(tempfileForm) // apply value
                      }
                    }
                    required
                  >
                    {
                      titleList.map((title, idx) => (
                        <option 
                          key={idx}
                          value={title.label}
                        >
                          {title.label}
                        </option>
                      ))
                    }
                  </select>
                } 
                
                { 
                  // INPUT OPTION
                  file.isTyping &&
                  <div className="input-1 d-flex" >
                    <input 
                      className="document" 
                      type='text'
                      placeholder="เอกสาร"
                      onChange={(e) => {
                        file.customTitle = e.target.value;
                        setFileForm([...fileForm]);
                      }} 
                    />
                    { 
                      file.customTitle !== ''?
                      <button className='button-circle green1'
                        type='button' 
                        onClick={() => {
                          // update value
                          file.title = file.customTitle
                          file.customTitle = '';
                          file.isTyping = false;
                          setFileForm([...fileForm]) // apply value
                          // add new 'customTitle' to first element of 'titleList'
                          var tempTypeList = [...titleList];
                          tempTypeList.push({ label: file.title, value: file.title })
                          setTitleList(tempTypeList);
                        }}
                      >
                        <i className="bi bi-plus-lg"></i>
                      </button>:
                      <button 
                        className="button-circle red1"
                        type='button'
                        onClick={(e) => {
                          e.preventDefault();
                          var tempfileForm = [...fileForm];
                          var handleSelect = tempfileForm.filter(obj => {
                            if (obj.hashID === file.hashID) { // check if found target from hashID
                                obj.isTyping = false;
                                obj.customTitle = '';
                            }
                          })
                          setFileForm(tempfileForm) // apply value
                        }}
                      >
                        X
                      </button>
                    }
                  </div>
                }
              </div>

              { /* ----- File Format ----- */ }
              <div className="w40 select2">
                <select 
                  value={file.format}
                  onChange={(e) => {
                    if (e.target.value === '')
                      return;
                    file.format = e.target.selectedOptions[0].text; // update value
                    setFileForm([...fileForm]) // apply value
                  }} 
                  required
                >
                  { 
                    formatList.map((format, idx) => (
                      <option 
                        key={idx}
                        value={format.label}
                      >
                        {format.label}
                      </option>
                    )) 
                  }
                </select>
              </div>

              {/* DELETE CURRENT INPUT */}
              <div className="w10">
                <button 
                  className="button-circle red1" 
                  type='button' 
                  onClick={() => {
                    setFileForm((fileForm) => fileForm.filter((obj) => obj.hashID !== file.hashID))
                  }}>
                  <i className="bi bi-dash"></i>
                </button>
              </div>
            </div>
          )) 
        } 

        { /* ----- ADD NEW FILE OPTION ----- */ }
        <div className='w100  d-flex'>
          <div className='w10'></div>
          <div className='w40'></div>
          <div className='w40'></div>
          <div className='w10'>
            <button 
              className="button-circle green1" 
              type='button' 
              onClick={() => {
                setFileForm([
                  ...fileForm, 
                  { 
                    hashID      : Math.random().toString(36).substr(2, 7),
                    title       : "", 
                    format      : "",
                    isTyping    : false,
                    customTitle : ""
                  }
                ])
              }}>
              <i className="bi bi-plus-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateFileForm;