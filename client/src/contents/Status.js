import React from 'react';
import StatusList from '../components/StatusList';

function Status(props) {
  return (
    <div className="schlorshipstatus">
      <div className="header d-flex">
        <div className="icon-grid">
          <i className="bi bi-grid-3x3"></i>
        </div>
        <h4>สถานะการยื่นทุน</h4>
      </div>
      <div className="scholarnews">
        <StatusList/>
      </div>
    </div>
  )
}

export default Status;
