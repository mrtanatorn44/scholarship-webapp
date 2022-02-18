import { React, useState, useEffect } from 'react';
import './Rolesetting.css';
import data from '../data/datanews.js';
import Axios from 'axios';

function RoleSetting(props) {

  const [User,setUser] = useState([]);

  const getUser = () =>{
      Axios.get("http://localhost:5000/getUser").then((response)=>{
        var result = response.data;
        setUser(result)
      })
  }
  useEffect(() => {
    getUser();
  }, [])

  function drawStuff(x){
      alert(x);
      if(x === "1"){
        alert("1");
      }else if(x == "2"){
        alert("2");
      }else if(x == "3"){
        alert("3");
      }
  }

  function Role_list(){
    return(
        User.map((user)=>(
        <article className = "rolelist">
          <div className="form-rolelist">
            <div className="d-flex">
              <div className ="name">
                <h5>{user.email}</h5> 
                
              </div><div className ="name">
                <h5> {user.role}</h5> 
                
              </div>
              <div className="right-rolesetting">
                  <select id="capital" onChange = {() => alert(this.value)}>
                    <option  value="1">1</option>
                    <option  value="2">2</option>
                    <option  value="3">3</option>
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
          <Role_list/>
        </div>

       
    </div>
  );
}
export default RoleSetting;
