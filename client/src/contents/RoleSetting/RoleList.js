/*eslint no-unused-vars:*/

import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { WebContext } from '../../App.js';
import Swal from 'sweetalert2';

function RoleList(props){

  const { Query, RoleQuery } = useContext(WebContext);
  const [query, setQuery] = Query;
  const [roleQuery, setRoleQuery] = RoleQuery;

  const [ roleList, setRoleList ] = useState([
    {label: 'เลือกตำแหน่ง'  , value: ''},
    {label: 'นิสิต'         , value: 'student'},
    {label: 'กรรมการ'      , value: 'interviewer'},
    {label: 'แอดมิน'       , value: 'admin'}
  ])

  const [User, setUser] = useState([]);

  function onRoleChange(targetUserID, targetRole) {
    Axios.post("http://localhost:5000/editRole", { 
      id    : targetUserID,
      role  : targetRole
    }).then(
      (response) => {
        if (response.data.errno) { // Check if Backend return error
          Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
          return;
        }

        setUser([]);
        getUser();
        Swal.fire('บันทึกแล้ว!','','success')
      }
    );
  }
  const getUser = () =>{
    Axios.get("http://localhost:5000/getAllUser").then(response => {
      if (response.data.errno) { // Check if Backend return error
        Swal.fire('Error!', 'ทำงานไม่สำเร็จ errno: ' + response.data.errno, 'warning');
        return;
      }
      setUser(response.data)
    })
  }
   
  useEffect(() => {
    getUser();
  }, [])
  
  return (
    User.filter(
      user => user.fname.toLowerCase().includes(query.toLowerCase()) && (roleQuery === '' ? true : user.role === roleQuery)
    ).map((user, index) => (
      
      <div className="list2" key={index}>

        <div className="list2-left">
          <p className='text1'>{user.email}</p>
        </div>
    
        <div className="list2-right">
          <div>
            <select
              className='select-small text1'
              onChange={
                (e) => {
                  e.preventDefault();
                  
                  if (e.target.value === '') return; // do nothing if select placeholder

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
                      console.log('set to', e.target.value)
                      onRoleChange(user.id, e.target.value);
                    } else {
                      setUser([]);
                      getUser();
                    }
                  })
                }
              }
            >
              {
                roleList.map(
                  (role, idx) => 
                    <option selected={ user.role === role.value ? true : false } key={idx} value={role.value}>{role.label} </option>
                  )
                }
            </select>
          </div>
        </div>
            
      </div>
    ))
  )
  
}

export default RoleList;