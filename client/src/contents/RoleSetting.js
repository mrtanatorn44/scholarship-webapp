import { React, useState, useEffect } from 'react';
import './Rolesetting.css';
import Axios from 'axios';

function RoleSetting(props) {

  const [User,setUser] = useState([]);
  const roles =[
    {
      title: 'Student',
      value: 'student'
    },
    {
      title: 'Interviewer',
      value: 'interviewer'
    },
    {
      title: 'Admin',
      value: 'admin'
    }
  ]
 
  const getUser = () =>{
    Axios.get("http://localhost:5000/getUser").then((response)=>{
      var result = response.data;
      setUser(result)
    })
  }
  useEffect(() => {
    getUser();
  }, [])

  const onRoleChange = (e) => {
    // MODAL CONFIRM
    alert(e.target.value);
  }

  function Role_list(){
    return(
      User.map((user)=>(
      <article className = "rolelist">
        <div className="form-rolelist">
          <div className="d-flex">

            <div className ="name">
              <p>Email : {user.email}</p> 
            </div>

            <div className ="role">
              <p> {user.role}</p> 
            </div>

            <div className="right-rolesetting">
              <select id="capital" onChange={(e) => onRoleChange(e)}>
                {
                  roles.map((role) =>
                    <option value={role.value}>{role.title}</option>
                  )
                }
              </select>
            </div>

          </div>
        </div>  
      </article>
      ))
    )
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
          <div class="role-setting">
            <Role_list/>
          </div>
        </div>
 
       
    </div>
  );
}
export default RoleSetting;
