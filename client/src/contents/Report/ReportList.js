import React, { useContext, useState, useEffect } from 'react';
import Reports from '../../data/datanews.js';
import { WebContext } from '../../App';

function ReportList(props) {

  const { Content } = useContext(WebContext)
  const [content, setContent] = Content;

  return(
    Reports.map((report, index) => (
      <div className="reportList" key={index}>
        <div className='reportList-bottom'>
          <h3>{report.title}</h3>
        </div>
        <div className="reportList-right">
          <button className="button-search d-flex" type="button" onClick={() => setContent('ReportInspect')}>
            <i className="bi bi-search"/>
            <p>ดูรายละเอียด</p>
          </button> 
        </div>
      </div>
    ))
  )
}
export default ReportList;