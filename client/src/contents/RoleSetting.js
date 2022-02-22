import { React, useState, useEffect } from 'react';
import './Rolesetting.css';
import RoleList from '../components/RoleList.js';

function RoleSetting(props) {

  return (
    <div className="roleSetting">
      <div className="header d-flex">
        <div className="icon-three-dots">
          <i className="bi bi-three-dots"></i>
        </div>
        <h4>กำหนดสิทธิ์การเข้าถึง</h4>
      </div>
      <div className="search-group">
        <div className="search">
          <input type="text" placeholder="Search" aria-describedby="button-addon2"/>
          <button className="btn " type="button" >
            <i className="bi bi-search"></i>
          </button>
        </div>
      </div>
      <div className="center-list">
        <div class="role-setting">
          <RoleList/>
        </div>
      </div>
    </div>
  )
}

export default RoleSetting;
