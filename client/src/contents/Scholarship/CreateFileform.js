import React, { useState, useContext } from 'react';
import { WebContext } from '../../App';

function FileForm (){
    const { FileForm } = useContext(WebContext)
    const [fileForm, setFileForm] = FileForm;
    //console.log(fileForm);
    const [files, setFiles] = useState([{ id : 1, label : "", type :"" , typeInput : 0 , typeAdd: "" }]);
    console.log(files);
    const [fileFormat,setFileFormat] = useState([
      {label: 'เลือกเอกสาร'      ,value: ''},
      {label: 'เพิ่มประเภทเอกสาร' ,value: '0'},
      {label: 'สำเนาบัตรประชาชน' ,value: '1'},
      {label: 'ทะเบียนบ้าน'      ,value: '2'},
      {label: 'เกรดเฉลี่ยสะสม'    ,value: '3'}
    ])

    const delFile = (file) => {
      const id= file.id;
      setFiles(files.filter(file => file.id !== id));
      setFiles([...files])   
    }
    const addFile = () => {
      setFiles([...files, { id : files.length+1, label : "", type :"" ,typeInput : 0 , typeAdd: ""}])
    }
    
    return (
      
      <>
       
        <div className="fileForm-head">
          <h4>เอกสารประกอบการยื่นทุน</h4>
        </div>
        <div className="fileForm-title">
          <div className='fileForm-setTopic d-flex'>
           
            <p className='topics' > หัวข้อ</p>
            <p className='typefile'>&nbsp;&nbsp;นามสกุลไฟล์</p>
          </div>
  
          <div className="fileForm-detail">
            { 
              files.map((item, index) => (
                <div key={index}>
                  <p className="fileForm-order">ลำดับที่ {index+1}</p>
                  
                  { 
                    (item.typeInput === 0 || item.typeInput === undefined ) &&
                    <select required onChange={(e) => {
                      if (e.target.value === '0') { // add option
                        
                        setFiles([...files, { typeInput : 1 , typeAdd: ""}])
                      } else { // Aselected
                        setFiles([ ...files , {label: e.target.selectedOptions[0].text} ])
                        //console('item',files)
                      } 
                    }}>
                      {
                        fileFormat.map((item, index) => (
                          <option key={index} value={item.value}> {item.label} </option>
                        ))
                      }
                    </select>
                  }
                  { 
                    item.typeInput === 1 &&
                    <div className='input-button'>
                      <input onChange={(e) => setFiles({...files , typeAdd: e.target.value })} type='text' placeholder=''/>
                      { 
                        item.typeAdd !== '' &&
                        <button onClick={() => {
                          var tempTypeList = fileFormat;
                          tempTypeList.unshift({ label: fileForm.typeAdd, value: fileForm.typeAdd })
                          setFileFormat(tempTypeList);
                          setFiles({...files , label : fileForm.typeAdd, typeAdd: '', typeInput: 0})
                      }}>
                        Add
                        </button>
                      }
                  { 
                    fileForm.typeAdd === '' &&
                    <button onClick={() => setFiles({...files, typeInput: 0 })}>
                      X
                    </button>
                  }
                  </div>
                }

                  
                  
                  <select className="item-select-1" onChange={(e) => setFiles([...files, { type : e.target.value}])}>
                    <option value="type_file1">PDF</option>
                    <option value="type_file2">JPG</option>
                  </select>
                  
                  <button className="btn-delete-circle" type="button" onClick={() => delFile(item)}>
                    <i className="bi bi-dash"></i>
                  </button>
                  
                </div>
              )) 
            }
          </div>
          <div className="btn-add-scholarCre">
            <button className="btn-add-circle" type="button" onClick={() => addFile() }>
              <i className="bi bi-plus-lg"></i>
            </button>
          </div>
        </div>
      </>
    );
  }

  export default FileForm;