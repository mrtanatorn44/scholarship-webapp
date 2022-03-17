/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { WebContext } from '../../App.js';
import Swal from 'sweetalert2';

function RoleList(props){

  const { Query } = useContext(WebContext);
  const [query, setQuery] = Query;
  const [User,setUser] = useState([]);
  const roles = [{ title: 'Plese Choose Role', value: '-' },{ title: 'Student', value: 'student' }, { title: 'Interviewer', value: 'interviewer' }, { title: 'Admin', value: 'admin' }];
  const [target, setTarget] = useState();
  const [account, setAccount] = useState([]);


  const getUser = () =>{
    Axios.get("http://localhost:5000/getUser").then(response => {
      setUser(response.data)
    })
  }
  
  function onHandleSubmitBtn(e) {
    e.preventDefault();
    
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: 'ที่จะบันทึกประกาศนี้!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#03A96B',
      confirmButtonText: 'Save',
      cancelButtonColor: '#A62639',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        if(target.target.value === account.role){
          alert("You have this role")
        }else{
          onRoleChange(account,target);
          Swal.fire('บันทึกแล้ว!','','success')
        }
      }
    })
  }
  
  useEffect(() => {
    getUser();
  }, [])

  const onRoleChange = (account,role) => {
    Axios.post("http://localhost:5000/editRole", { 
        email:account.email,
        role:role.target.value
      }).then(() => { setUser([]);getUser();});
  }

  return(
    User.filter((user) => {
      return user.email.toLowerCase().includes(query.toLowerCase())
    }).map((user, index) => (
      <div className="container1 list2 d-flex" key={index}>
        
          
            <div className="name">
              <p>Email : {user.email}</p>
            </div>
            <div className="role">
              <p>{user.role}</p>
            </div>
            
            <div className="roleList">
              <select id="capital" onChange={(e) => {onHandleSubmitBtn(e);setTarget(e);setAccount(user)}}>
                { roles.map((role, idx) => <option key={idx} value={role.value}>{role.title} </option>) }
              </select>
              { /*showModal && <ConfirmModal sendConfirm={getConfirm}/>*/}
            </div>
          
       
      </div>
    ))
  )
}

export default RoleList;