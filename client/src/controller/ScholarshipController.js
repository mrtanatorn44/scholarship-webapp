/*eslint no-unused-vars:*/
import { useContext, useEffect } from 'react'
import { WebContext } from '../context/WebContext';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function ScholarshipController() {
  const     { AllScholarship } = useContext(WebContext);
  const   [ allScholarship, setAllScholarship ] = AllScholarship;
  
  function getScholarshipList () {
    Axios.get("http://localhost:5000/getAllScholarship").then((response) => { 
      var result = response.data;
      if (result.length !== 0) {
        result.forEach((res, index) => {
          Axios.post("http://localhost:5000/getDonator",{ 
            id: res.donator_id 
          }).then((donator) => {
            Object.assign(res, {
              id                : res.id,
              status            : res.status,
              type              : res.type,
              detail            : res.detail,
              amount            : res.amount,
              on_year           : res.on_year,
              on_term           : res.on_term,
              open_date         : res.open_date.split("T")[0],
              close_date        : res.close_date.split("T")[0],
              donator_id        : res.donator_id,
              donator           : donator.data[0].name,
              attr_requirement  : JSON.parse(res.attribute_requirement),
              file_requirement  : JSON.parse(res.file_requirement),
              interview_requirement   : JSON.parse(res.interview_requirement),
              appointment       : JSON.parse(res.appointment),
              interviewer       : JSON.parse(res.interviewer),
              toggleContent     : false,
            });
          })
        });
      }
      setAllScholarship(result);
    })
  }

  useEffect(() => { 
    getScholarshipList();

  }, [])

  return null;
}

export default ScholarshipController