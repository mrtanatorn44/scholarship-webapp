/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import { WebContext } from '../../App.js';
import RoleList from './RoleList.js';


function RoleSetting() {

  const { Content} = useContext(WebContext)
  const [ content, setContent] = Content;

  const { Query, RoleQuery } = useContext(WebContext);
  const [query, setQuery] = Query;
  const [roleQuery, setRoleQuery] = RoleQuery;

  const [ roleList, setRoleList ] = useState([
    {label: 'สมาชิกทั้งหมด'  , value: ''},
    {label: 'นิสิต'         ,  value: 'student'},
    {label: 'กรรมการ'      , value: 'interviewer'},
    {label: 'แอดมิน'       , value: 'admin'}
  ])

  return (
    <div className="frame">
      <div className="header">
        <div className="left">
          <div className="icons">
            <i className="bi bi-three-dots"></i>
          </div>
          <div className="topic">
           <h4>กำหนดสิทธิ์การเข้าถึง</h4>
          </div>
        </div>
        <div className="right"></div>
      </div>

      <div className="contents">
        <div className="filter-bar">
              
              <div className='input-holder25-left'>
                <label>ตำแหน่งสมาชิก</label><br></br>
                <select 
                  onChange={
                    (e) => { 
                      e.preventDefault();
                      setRoleQuery(e.target.value)
                    }
                  }
                >
                  {
                    roleList.map(
                      (role, role_index) => (
                        <option key={role_index} value={role.value}>{role.label}</option>
                      )
                    )
                  }
                </select>
              </div>
              <div className='input-holder25-right'>
                <label></label><br></br>
                <input
                  type="text"
                  placeholder="Search"
                  aria-describedby="button-addon2"
                  onChange={
                    (event) => setQuery(event.target.value)
                  }
                />
            </div>

        </div>

        <div className="content5">
          <RoleList/>
        </div>
      </div>
    </div>
  )
}

export default RoleSetting;
