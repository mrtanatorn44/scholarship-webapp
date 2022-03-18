/*eslint no-unused-vars:*/

import { React, useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { WebContext } from '../App.js';
import Axios from 'axios';

import gmail from '../data/images/gmail.png';

import Swal from 'sweetalert2' // Alert & Image Modal

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Login(props) {
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);

  // Context
  const { User } = useContext( WebContext );
  const [user, setUser] = User;

  // HANDLE USER
  const defineUser = (data) => {
    let userRole;
    let userID;
    let lName = data.familyName.charAt(0).toUpperCase() + data.familyName.slice(1).toLowerCase();
    Axios.post("http://localhost:5000/getUser", { // get Role from DB
      email : data.email,
    }).then((response) => {
      if (response.data.length !== 0) { // if User is exist
        userRole = response.data[0].role;
        userID   = response.data[0].id;
        setUser({ // set User from GAPI 
          ...user,
          id      : response.data[0].id,
          role    : response.data[0].role,
          imgUrl  : data.imageUrl,
          email   : data.email,
          name    : data.givenName + ' ' + lName,
          fname   : data.givenName,
          lname   : lName,
          isLogin : true
        });
        Swal.fire(`Welcome Back ${data.givenName}!`, '', 'success')
      } else { // if User is not exist
        userRole = 'student';
        Axios.post("http://localhost:5000/addUser", {
          email   : data.email, 
          fname   : data.givenName, 
          lname   : lName, 
          role    : userRole
        }).then((response) => {
          userID = response.data.insertId;
          setUser({ // set User from GAPI 
            ...user,
            id      : userID,
            role    : userRole,
            imgUrl  : data.imageUrl,
            email   : data.email,
            name    : data.givenName + ' ' + lName,
            fname   : data.givenName,
            lname   : lName,
            isLogin : true
          });
          Swal.fire('Welcome for the first time!', '', 'success')
        });
      }
      console.log('Gmail Sign-in done!')
    });
  }
  
  var forceMyOwnLogout = (response) => { // Force Logout 
    if (window.gapi) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      if (auth2 != null) 
        auth2.signOut().then( auth2.disconnect().then() )
    }
  }

  const onLoginSuccess = async(res) => {
    if (res.profileObj.email.split('@')[1] === "ku.th") {
      if (!user.isLogin) { // If not login initialize User
        console.log('Gmail Sign-in...')
        defineUser(res.profileObj);
      }
      if (localStorage.getItem('isSignedIn') === 'true') { // If isSignedIn session hide login btn 
        setShowlogoutButton(true);
        setShowloginButton(false);
      }
    } else {
      console.log('Gmail Sign-in fail!')
      Swal.fire('Wrong Email Domain!', 'กรุณาใช้ E-mail ที่ลงท้ายด้วย @ku.th', 'warning')
      forceMyOwnLogout(res);
    }
  };

  const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
  };

  const onSignoutSuccess = () => {
    alert("You have been logged out successfully");
    localStorage.setItem('isSignedIn', 'false');  // set isSignedIn session to false
    localStorage.removeItem('isSignedIn_ssTime');
    setUser({ // set User to null to make controller know that logout
      ...user,
      role    : '',
      imgUrl  : '',
      email   : '',
      name    : '',
      fname   : '',
      lname   : '',
      isLogin : false
    });                                
    setShowloginButton(true);
    setShowlogoutButton(false);
  };

  return (
    <div>
      { showloginButton ?
        <GoogleLogin
          render={renderProps => (
            <button 
              onClick={renderProps.onClick} 
              className='login-button'
            >
              <img className='logo-button' src={gmail} alt="gmail logo"/>
              &nbsp;&nbsp;&nbsp;&nbsp;Sign In with Google&nbsp;&nbsp;&nbsp;&nbsp;
            </button>
          )}
          clientId={clientId}
          buttonText="Sign In with Google"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        /> : null}
    

      { showlogoutButton ?
        <GoogleLogout
          render={renderProps => (
            <button 
              onClick={renderProps.onClick} 
              className='logout-button'
            >
              <i className="bi bi-box-arrow-right"></i>
            </button>
          )}
          clientId={clientId}
          buttonText="Sign Out"
          onLogoutSuccess={onSignoutSuccess}
        >
        </GoogleLogout> : null
      }
    </div>
  );
}
export default Login;
