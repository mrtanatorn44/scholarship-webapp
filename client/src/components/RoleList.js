import { React, useState, useEffect } from 'react';
import Axios from 'axios';
import ConfirmModal from '../modals/ConfirmModal.js'


function RoleList(){

  const [showModal ,setShowModal] = useState(false);
  const [User,setUser] = useState([]);
  const roles = [{ title: 'Student', value: 'student' }, { title: 'Interviewer', value: 'interviewer' }, { title: 'Admin', value: 'admin' }];
  const [target, setTarget] = useState();


  function getConfirm(data){
    if(data){
      if(target != null)
        onRoleChange(target);
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

  const onRoleChange = (e) => {
    alert(e.target.value);
  }
    
  return(
    User.map((user) => (
      <div className="rolelist">
        <div className="form-rolelist">
          <div className="d-flex">
            <div className="name">
              <p>Email : {user.email}</p>
            </div>
            <div className="role">
              <p>{user.role}</p>
            </div>
            <div className="right-rolesetting">
              <select id="capital" onChange={(e) => {setShowModal(true);setTarget(e);}}>
                { roles.map((role) => <option value={role.value}>{role.title}</option>) }
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