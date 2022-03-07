import React, { useContext, useState} from 'react';
import { WebContext } from '../../App.js'; 
import Select from 'react-select';
import MemberList from './MemberList.js';



function Member() {
  const { Content} = useContext(WebContext)
  const [ content, setContent] = Content;
  
  

  const { Query } = useContext(WebContext);
  const [query, setQuery] = Query;

  return (
    <div className="frame">
      <div className="header">
        <div className="left">
          <div className="icons">
            <i className="bi bi-three-dots"></i>
          </div>
          <div className="topic">
          <h4>รายชื่อสมาชิก</h4>
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
      
        <div className="content4">
          <MemberList/>
        </div>
    </div>

  )
}

export default Member;