import React, { useState, useContext } from 'react';
import { WebContext } from '../../App';

function FileForm (){
    const { ScholarshipForm } = useContext(WebContext)
    const [scholarshipForm, setScholarshipForm] = ScholarshipForm;
    const [files, setFiles] = useState([{ id : 1, name : "", format :"" }]);
    const fileAutoFormat =[
      {
        title: 'สำเนาบัตรประชาชน',
        name: 'ID_62303xxx',
        type: 'pdf'
      },
      {
        title: 'ทะเบียนบ้าน',
        name: 'ทะเบียนบ้าน',
        type: 'pdf'
      },
      {
        title: 'เกรดเฉลี่ยสะสม',
        name: 'GPA_6230XXXX',
        type: 'pdf'
      }
    ]
    const delFile = (file) => {
      const id= file.id;
      setFiles(files.filter(file => file.id !== id));
      setFiles([...file])   
    }
    const addFile = () => {
      setFiles([...files, { id : files.length+1, name : "", format :"" }])
    }
    const handleInputChange = (e, index) => {
      let tempFiles = [...files];
      tempFiles[index][e.target.name] = e.target.value;
      setFiles(tempFiles);
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
            <p className='document'>&nbsp;&nbsp;ระบบอัตโนมัติ</p>
          </div>
  
          <div className="fileForm-detail">
            { 
              files.map((file, index) => (
                <div key={index}>
                  <p className="fileForm-order">ลำดับที่ {index+1}</p>
                  <input className="file-document"  required
                    type="text" 
                    name="name"
                    value={file.name || ""}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  <select className="file-select-1">
                    <option value="type_file1">PDF</option>
                    <option value="type_file2">JPG</option>
                  </select>
                  <select className="file-select-2">
                    {
                      fileAutoFormat.map((format, formatIdx) =>
                        <option key={formatIdx}>{format.title}</option>
                      )
                    }
                  </select>
                  <button className="btn-delete-circle" type="button" onClick={() => delFile(file)}>
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