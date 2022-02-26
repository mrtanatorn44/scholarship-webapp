import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import ConfirmModal from '../modals/ConfirmModal.js'
import { WebContext } from '../App.js';


function RoleList(props){

  const { Query } = useContext(WebContext);
  const [query, setQuery] = Query;
  const [showModal ,setShowModal] = useState(false);
  const [User,setUser] = useState([]);
  const roles = [{ title: 'Plese Choose Role', value: '-' },{ title: 'Student', value: 'student' }, { title: 'Interviewer', value: 'interviewer' }, { title: 'Admin', value: 'admin' }];
  const [target, setTarget] = useState();
  const [account, setAccount] = useState([]);


  function getConfirm(data){
    if(data){
      if(target.target.value === account.role){
        alert("You have this role")
      }else{
        onRoleChange(account,target);
      }
    }
    else{

    }
    setShowModal(false);
  }


  const getUser = () =>{
    Axios.get("http://localhost:5000/getUser").then(response => {
      setUser(response.data)
      
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
    
    User.filter( user => {
      if(query === ''){
        return user;
      }else if(user.email.toLowerCase().includes(query.toLowerCase())){
        return user;
      }
    }).map((user) => (
      <div className="roleList">
        <div className="roleList-form">
          <div className="d-flex">
            <div className="name">
              <p>Email : {user.email}</p>
            </div>
            <div className="role">
              <p>{user.role}</p>
            </div>
            <div className="role">
            </div>
            <div className="roleList-right">
              <select id="capital" onChange={(e) => {setShowModal(true);setTarget(e);setAccount(user)}}>
                { roles.map((role) => <option value={role.value}>{role.title} </option>) }
              </select>
              { showModal && <ConfirmModal sendConfirm={getConfirm}/>}
            </div>
          </div>
        </div>
      </div>
    ))
  )
}

export default RoleList;