import React from 'react';
import Reports from '../data/datanews.js';

function ReportList(props) {

  return(
    Reports.map((report, index) => (
      <div className="reportlist d-flex" key={index}>
        <div className='bottom'>
          <h3>{report.detail}</h3>
        </div>
        <div className="button-report">
          <button className="button-search d-flex" type="button" onClick={() => props.sendContent(['admin','ReportInspect'])}>
            <i className="bi bi-search"/>
            <p>ดูรายละเอียด</p>
          </button> 
        </div>
      </div>
    ))
  )
}
export default ReportList;