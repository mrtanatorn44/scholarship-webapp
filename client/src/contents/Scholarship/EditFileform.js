import React, { useState, useContext } from 'react';
import { WebContext } from '../../App';
import Axios from 'axios';
function EditFileForm (){
  const { FileForm } = useContext(WebContext)
  const [ fileForm , setFileForm] = FileForm;
  const [files, setFiles] = useState([{ hashID : Math.random().toString(36).substr(2, 7), label : "", format :"" , isTyping : 0 , customLabel: "" }]);

  const [labelList,setLabelList] = useState([
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
  function showLabelList() {
    console.log('\n-----show-----')

    labelList.forEach((label, idx) => {
      console.log(label)
    })
    console.log('---show end---\n')

  }
  function showAll() {
    console.log('\n-----show-----')
    files.forEach((file, idx) => { 
      var x = String(idx) + '  { ' 
      Object.keys(file).forEach(function(key) {
        x += key + ': ' + file[key] + ', '
      });
      console.log(x)
      x += '}'
      setFileForm({
        ...fileForm,
        file: x
      })
    })
    console.log(files)
    console.log('---show end---\n')
  }

  function delFile(targetHashID) {
    // delete input File Requirement
    //console.log('target delete hashID :' + targetHashID)                  
    setFiles((files) => files.filter((item) => item.hashID !== targetHashID))
    setFileForm((files) => files.filter((item) => item.hashID !== targetHashID))
  }
  function addFile() {
    // add new input File Requirement
    setFiles([...files, { hashID : Math.random().toString(36).substr(2, 7), label : "", format :"" ,isTyping : 0 , customLabel: ""}])
  }

  function onSelectLabel(e, targetHashID) {
    // if it select 'label' that have value = '' 
    // do nothing
    if (e.target.value === '')
      return;

    var tempFiles = [...files];
    if (e.target.value === '0') { // Change to 'CustomLabel' mode
      tempFiles.forEach((file) => { // loop to find target object
        if (file.hashID === targetHashID) { // check if found target from hashID
          // update value
          file.isTyping    = 1;
          file.customLabel = '';
        }
      })
    } else { // Select the value from 'labelList'
      tempFiles.forEach((file) => { // loop to find target object
        if (file.hashID === targetHashID) { // check hashID of object
          // update value
          file.label = e.target.selectedOptions[0].text;
        }
      }) 
    } 
    setFiles(tempFiles) // apply value
  }
  function onSelectFormat(e, targetHashID) {
    // if it select 'label' that have value = '' 
    // do nothing
    if (e.target.value === '')
      return;

    var tempFiles = [...files]; 
    tempFiles.forEach((file) => { // loop to find target object
      if (file.hashID === targetHashID) { // check if found target from hashID
        // update value
        file.format = e.target.selectedOptions[0].text;
      }
    })
    setFiles(tempFiles) // apply value
  }

  function onChangeCustomLabel(e, targetHashID) {
    var tempFiles = [...files];
    tempFiles.forEach((file) => { // loop to find target object
      if (file.hashID === targetHashID) { // check if found target from hashID
        // update value
        file.customLabel = e.target.value;
      }
    })
    setFiles(tempFiles) // apply value
  }

  function onAddCustomLabel(targetHashID) {
    var tempFiles = [...files];
    tempFiles.forEach((file) => { // loop to find target object
      if (file.hashID === targetHashID) { // check if found target from hashID
        // update value
        file.label = file.customLabel
        file.customLabel = '';
        file.isTyping = 0;
        // add new 'customLabel' to first element of 'labelList'
        var tempTypeList = labelList;
        //tempTypeList.unshift({ label: file.label, value: file.label })
        tempTypeList.push({ label: file.label, value: file.label })
        setLabelList(tempTypeList);
      }
    })
    setFiles(tempFiles) // apply value
  }

  function onCancelCustomLabel(e, targetHashID) {
    e.preventDefault();
    var tempFiles = [...files];
    tempFiles.forEach((file) => { // loop to find target object
      if (file.hashID === targetHashID) { // check if found target from hashID
        // update value
        file.isTyping     = 0;
        file.customLabel  = '';
      }
    })
    setFiles(tempFiles) // apply value
  }

  return (
    <>
      <button type='button' onClick={() => showAll()}> SHOW ELEMENT</button>
      <button type='button' onClick={() => showLabelList()}> SHOW LABEL</button>

      <div className="heading">
        <h4>เอกสารประกอบการยื่นทุน</h4>
      </div>
      <div className="subject">
        <div className='setSubject'>
          <p className='topics' > หัวข้อ</p>
          <p className='typefile'>&nbsp;&nbsp;นามสกุลไฟล์</p>
        </div>

        {/* ----- INPUT ----- */}
        <div className="detail"> { 

          files.map((item, index) => (
            <div className="d-flex" key={index}>
              <p className="order">ลำดับ {index+1}</p>

              <div className="set-select d-flex">
                { /* ----- File Label ----- */
                  (item.isTyping === 0 || item.isTyping === undefined ) && // Input by Default
                  <select className="select-1" defaultValue={item.label} onChange={(e) => {onSelectLabel(e, item.hashID);setFileForm(files)} } required>
                    {
                      labelList.map((label, idx) => (
                        <option key={idx} value={label.value}> {label.label} </option>
                      ))
                    }
                  </select>
                } 

                { // Input by Typing
                  item.isTyping === 1 &&
                  <div className="input-1 d-flex" >
                    <input className="document" placeholder="เอกสาร"onChange={(e) => onChangeCustomLabel(e, item.hashID)} type='text'/>
                    { 
                      item.customLabel !== ''?
                      <button type='button' onClick={() => onAddCustomLabel(item.hashID) }>Add</button>:
                      <button className="button-circle  red1" type='button' onClick={(e) => onCancelCustomLabel(e, item.hashID)}>X</button>
                    }
                  </div>
                }

                { /* ----- File Format ----- */ }
                <select className="select-2" defaultValue={item.format} onChange={(e) => {onSelectFormat(e, item.hashID);setFileForm(files); }} required>
                  { formatList.map((format, idx) => (
                    <option key={idx} value={format.value}> {format.label} </option>
                  )) }
                </select>

                {/* DELETE CURRENT INPUT */}
                <button className="button-circle red1" type='button' onClick={() => delFile(item.hashID)}>
                  <i className="bi bi-dash"></i>
                </button>
              </div>
            </div>
          )) 
        } </div>

        { /* ----- ADD INPUT ----- */ }
        <div className="button-add2">
          <button className="button-circle green1" type='button' onClick={(e) => addFile()}>
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>
    </>
  );
  }

export default EditFileForm;