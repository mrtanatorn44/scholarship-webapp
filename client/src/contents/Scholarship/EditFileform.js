import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App';
import Axios from 'axios';

function EditFileForm (){
  const { FileForm , ScholarshipForm, ScoringFormat } = useContext(WebContext)
  //const [ fileForm , setFileForm] = FileForm;
  const [scholarshipForm, setScholarshipForm] = ScholarshipForm;
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
        <div className='setSubject'>
          <p className='topics' > หัวข้อ</p>
          <p className='typefile'>&nbsp;&nbsp;นามสกุลไฟล์</p>
        </div>

        {/* ----- FILE OPTION ----- */}
        <div className="detail"> 
          { 
            fileForm.map((file, index) => (
              // EACH FILE
              <div className="file d-flex" key={index}>
                <p className="order">ลำดับ {index+1}</p>

                <div className="set-select d-flex">
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
                          Add
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

                  { /* ----- File Format ----- */ }
                  <select 
                    className="select-1" 
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

                  {/* DELETE CURRENT INPUT */}
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
        </div>

        { /* ----- ADD NEW FILE OPTION ----- */ }
        <div className="button-add2">
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
    </>
  );
}

export default EditFileForm;