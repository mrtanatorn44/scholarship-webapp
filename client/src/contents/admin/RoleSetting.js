import { React, useState, useEffect } from 'react';
import './Rolesetting.css';
import data from '../../data/datanews.js';
function RoleSetting() {

  function Role_list(){
    const [visible, setVisible] = useState(false);
    const Scholar = ({idScholar,title,detail,date}) => {
      return(
        <article className = "rolelist">
            <h3>{detail}</h3>              
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
    <div class="roleSetting">

        <div class="header d-flex">
            <div class="icon-three-dots">
                <i class="bi bi-three-dots"></i>
            </div>
            <h4>กำหนดสิทธิ์การเข้าถึง</h4>
        </div>

        <div class="input-group">
                <input type="text" placeholder="Search" aria-describedby="button-addon2"/>
                <button class="btn " type="button" >
                  <i class="bi bi-search"></i>
                </button>
        </div>

        <div>
          <Role_list/>
        </div>
    </div>
  );
}
export default RoleSetting;
