import React from 'react';
import StatusList from './StatusList';

function Status(props) {
  return (
    <div className="frame">
      <div className="header d-flex">
        <div className="left">
          <div className="icons">
            <i className="bi bi-grid-3x3"></i>
          </div>
          <div className="topic">
            <h4>สถานะการยื่นทุน</h4>
          </div>
        </div>
        <div className="right"></div>
      </div>
      <div className="contents">
        <div className="content1">
          <StatusList/>
        </div>
      </div>
    </div>
  )
}

export default Status;
