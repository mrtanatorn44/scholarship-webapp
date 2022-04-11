import React, { useState, useContext, useEffect } from 'react';
import { WebContext } from '../../App';
import Axios from 'axios';
import Swal from 'sweetalert2'

function InterviewerChoose (){
  const [ itvList, setItvList ] = useState([]);
  const [ itvSelected, setItvSelected ] = useState([]);
  const { Content} = useContext(WebContext);
  const [content, setContent] = Content;

  function getInterviewer() {
    Axios.post("http://localhost:5000/getUserRole",{
      role : "interviewer"
    }).then((response) => { 
      if (response.data.errno) { // Check if Backend return error
        Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
        return;
      }
      // console.log(response.data);
      if(response.data !== undefined || response.data.length !== 0) {
        response.data.unshift({id:'', email:'กรุณาเลือกกรรมการที่ต้องการ'})
        setItvList(response.data)
      }
    })
  }
  
  function onSubmit(e) {
    e.preventDefault();

    // Remove BLANK input
    var tempItvSelected = [...itvSelected];
    tempItvSelected = tempItvSelected.filter((interview) => {
      return interview.email !== '';
    });
    setItvSelected(tempItvSelected)

    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: 'ที่จะบันทึกประกาศนี้!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#03A96B',
      confirmButtonText: 'Save',
      cancelButtonColor: '#A62639',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post("http://localhost:5000/editScholarshipInterviewer",{
          id : localStorage.getItem('ScholarshipID_target'),
          interviewer : JSON.stringify(itvSelected)
        }).then((response) => { 
          if (response.data.errno) { // Check if Backend return error
            //console.log(response.data)
            Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
            return;
          }
          Swal.fire('บันทึกแล้ว!','','success')
          setContent('Interview');
        })

      }
    })
  }

  function uploadInterviewer() {
    Axios.post("http://localhost:5000/editScholarshipInterviewer",{
      id : localStorage.getItem('ScholarshipID_target'),
      interviewer : JSON.stringify(itvSelected)
    }).then((response) => { 
      if (response.data.errno) { // Check if Backend return error
        //console.log(response.data)
        Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
        return;
      }
      Swal.fire('กรรมบางคนถูกลบ!','เนื่องจากยูสเซอร์นั้นไม่ใช่กรรมการอีกต่อไป','warning')
      getExistInterviewer();

    })
  }

  function getExistInterviewer() {
    Axios.post("http://localhost:5000/getScholarshipInterviewer",{
      id : localStorage.getItem('ScholarshipID_target'),
    }).then((response) => {
      if (response.data.errno) { // Check if Backend return error
        Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
        return;
      } 
      // console.log(response.data[0].interviewer);
      if(response.data[0].interviewer !== null) {

        var result = JSON.parse(response.data[0].interviewer);
        var resultLenght = result.length - 1;
        var someoneIsNotInterviewer = false;

        // find & delete Interviewer in SCH that not Interviewer anymore
        result.forEach((element, index, object) => {
          
          Axios.post("http://localhost:5000/getUser",{
            email : element.email
          }).then((response2) => { 
            if (response.data.errno) { // Check if Backend return error
              Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
              return;
            }
            if (response2.data.lenght === 0) return;
            var result2 = response2.data[0]
            if (result2.role !== 'interviewer') {
              // console.log('not interviewr ', element.email)
              object.splice(index, 1);
              someoneIsNotInterviewer = true;
            }
            if (resultLenght === index) {

              // console.log(result)
              setItvSelected(result);

              // If find who is not Interviewer call func to delte him
              if (someoneIsNotInterviewer)
                uploadInterviewer();

            }
          })

        });
        // var target = itvList.filter(obj => {
        //   return obj.email === targetEmail
        // })
      } else {
        setItvSelected([
          {
            hashID    : Math.random().toString(36).substr(2, 7),
            id    : "",
            email : "",
          }
        ]);
      }
    })
  }

  useEffect(() => {
    getInterviewer();
    getExistInterviewer();
  }, [])

  return (
    <div className="frame"> 
      <div className="header">
        <div  className="left">
            <div className="icons">  
              <i className="bi bi-plus-lg"></i>
            </div>
            <div className="topic">
              <h4>ตั้งคณะกรรมการ</h4>
            </div>
        </div>

        <div className="right">
          <button className='button-add d-flex' onClick={ () => {setContent('Interview')}}>
            <i className='bi bi-arrow-left-circle sky'></i>
            <p>ย้อนกลับ</p>
            </button>
        </div>
      </div>
      <div className='contents'> 
        <div className='content1'>  
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="itvList" >
              {/* <button onClick={(e) => {e.preventDefault();console.log(itvSelected)}}>xxx</button> */}

              <div className="heading">
                <br></br><center><h4>รายชื่อกรรมการที่จะทำการสัมภาษณ์</h4></center>
              </div>

              <div className="subject">
                {/* HEADER */}
                <div className='w100 d-flex'>
                  <div className='w10'></div>
                  <div className='w80'>กรรมการ</div>
                  <div className='w10'></div>
                </div>

                {/* ----- INTERVIEWER OPTION ----- */}
                { 
                  itvSelected.map((itv, index) => (
                    // EACH itv
                    <div className="w100 d-flex" key={index}>
                      { /* ----- ORDER ----- */ }
                      <div className="w10 text1 fs07"><b>ลำดับ {index+1}</b></div>

                      { /* ----- itv Name ----- */ }
                      <div className="w80 mgb1 select2">
                        <select
                          value={itv.email}
                          onChange={(e) => {
                            var targetEmail = e.target.value
                            var tempItvSelected = [...itvSelected];
                            var handleSelect = tempItvSelected.filter(
                              (obj) => {
                                var target = itvList.filter(obj => {
                                  return obj.email === targetEmail
                                })
                                // console.log(target[0].id, target[0].email)
                                if (obj.hashID === itv.hashID) {
                                  obj.email = target[0].email;
                                  obj.id    = target[0].id;
                                }
                              }
                            )
                            setItvSelected(tempItvSelected) // apply value
                          }}
                          required
                        >
                          {
                            itvList.map((aItv, idx) => (
                              <option
                                key={idx}
                                value={aItv.email}
                              >
                                {aItv.email} ({aItv.fname} {aItv.lname})
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
                            setItvSelected((itvSelected) => itvSelected.filter((obj) => obj.hashID !== itv.hashID))
                          }}>
                          <i className="bi bi-dash"></i>
                        </button>
                      </div>
                    </div>
                  )) 
                } 

                { /* ----- ADD NEW OPTION ----- */ }
                <div className='w100 d-flex'>
                  <div className='w10'></div>
                  <div className='w80'></div>
                  <div className='w10'>
                    <button 
                      className="button-circle green1" 
                      type='button' 
                      onClick={() => {
                        setItvSelected([
                          ...itvSelected, 
                          { 
                            hashID  : Math.random().toString(36).substr(2, 7),
                            id      : "",
                            email    : "",
                          }
                        ])
                      }}>
                      <i className="bi bi-plus-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
              
            </div>

            {/* ----- FOOTER ------ */}
            <div className="footer2">
              <div className="confirm">
                <button className="button-confirm green1" type="submit">
                  ตกลง 
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>  
    </div>
  );
}

export default InterviewerChoose;