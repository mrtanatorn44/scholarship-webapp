import React, { useContext, useState, useEffect } from 'react';
import RoleList from './RoleList.js';
import { WebContext } from '../../App.js';



function RoleSetting() {

  const { Query } = useContext(WebContext);
  const [query, setQuery] = Query;

  return (
    <div className="frame">
      <div className="header">
        <div className="left">
          <div className="icons">
            <i className="bi bi-three-dots"></i>
          </div>
          <div class="topic">
          <h4>กำหนดสิทธิ์การเข้าถึง</h4>
          </div>
        </div>
        <div className="right"></div>
      </div>
      <div className="rolesSetting-search">
        <div className="search-role">
          <input type="text" placeholder="Search" aria-describedby="button-addon2" onChange={event => setQuery(event.target.value)}/>
          <button className="btn " type="button" >
            <i className="bi bi-search"></i>
          </button>
        </div>
      </div>
      <div className="line-gray"></div>
      
        <div class="content4">
          <RoleList/>
        </div>
    </div>

  )
}

export default RoleSetting;
