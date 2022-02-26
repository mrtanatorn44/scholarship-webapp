import React from 'react';
import StatusList from '../components/StatusList';

function Status(props) {
  return (
    <div className="frame-content">
      <div className="head-content d-flex">
        <div className="icons">
          <i className="bi bi-grid-3x3"></i>
        </div>
        <div class="topic">
        <h4>สถานะการยื่นทุน</h4>
        </div>
      </div>
      <div className="frame-subcontent1">
        <StatusList/>
      </div>
    </div>
  )
}

export default Status;
