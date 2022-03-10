import React, { useContext, useState, useEffect } from 'react';
import Reports from '../../data/datanews.js';
import { WebContext } from '../../App';

function ReportList(props) {

  const { Content } = useContext(WebContext)
  const [content, setContent] = Content;

  return(
    Reports.map((report, index) => (  
      <div className="container1" key={index}>
        <div className='title'>
          <h2>{report.title}</h2>
        </div>
        <div className='information'>
          <div className='left'>
            <h3>{report.title}</h3>
          </div>    
          <div className="right">
            <button className="button-2 d-flex" type="button" onClick={() => setContent('ReportInspect')}>
              <i className="bi bi-search"/>
              <p>ดูรายละเอียด</p>
            </button> 
          </div>
        </div> 
      </div>
    ))
  )
}
export default ReportList;