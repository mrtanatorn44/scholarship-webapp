import { React, useState, useEffect } from 'react';
import './Rolesetting.css';
import data from '../data/datanews.js';
function RoleSetting() {

  function Role_list(){
    const [visible, setVisible] = useState(false);
    const Scholar = ({idScholar,title,detail,date}) => {
      return(
        <article className = "rolelist">
          <div className="form-rolelist">
            <div className="d-flex">
              <div className ="name">
                <h5>{detail}</h5>  
              </div>
              <div className="right-rolesetting">
                  <select  name="capital" id="capital">
                    <option value="study">user</option>
                    <option value="activity">student</option>
                    <option value="property">admin</option>
                  </select>
              </div>
            </div>
          </div>
          
           
        </article>
      );

    }
      return(
        <section>{
          data.map((scholar,index) => {
            const {title,detail,date} = scholar;
            return(
              <div>
                <Scholar
                  date = {date}
                  title={title}
                  detail={detail}
                />
              </div>
            );
          })
        }</section> 
      );
    }
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
            <Role_list/>
        </div>

       
    </div>
  );
}
export default RoleSetting;
