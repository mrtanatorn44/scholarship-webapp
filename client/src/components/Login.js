import { React, useState, useEffect, useContext } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useNavigate, Navigate } from 'react-router-dom';
import { WebContext } from '../App.js';
import Axios from 'axios';
import gmail from '../data/images/gmail.png';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;



function Login(props) {
  
  const navigate = useNavigate();
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);

  // Context
  const { User } = useContext( WebContext );
  const [user, setUser] = User;

  // HANDLE USER
  const initUser = (data) => {
    let userRole;
    let userID;
    let lName = data.familyName.charAt(0).toUpperCase() + data.familyName.slice(1).toLowerCase();
    // get Role from DB
    Axios.post("http://localhost:5000/getUser", {
      email : data.email,
    }).then(
      (response) => {
        if (response.data.length !== 0) { // if User is exist
          userRole = response.data[0].role;
          userID   = response.data[0].id;
          // set User from GAPI 
          setUser({
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
        } else { // if User is not exist
          userRole = 'student';
          Axios.post("http://localhost:5000/addUser", {
            email   : data.email, 
            fname   : data.givenName, 
            lname   : lName, 
            role    : userRole
          }).then(
            (response) => {
              console.log(response.data.insertId)
              userID = response.data.insertId;
              // set User from GAPI 
              setUser({
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
              alert('Welcome for the first time.')
            }
          );
        }
      }
    );
  }
  useEffect(() => { 
    if (user.isLogin) {
      setShowloginButton(false);
      setShowlogoutButton(true);
      navigate('/main');
    } else {
      navigate('/');
    }
    /*
    return (() => {
      setUser();
    })
    */
  }, [user])

  // HANDLE LOGIN, LOGOUT 
  var forceMyOwnLogout = (response) => {
    //cookie.remove('MyGoogleID', { path: '/' })
    if (window.gapi) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      if (auth2 != null) {
        auth2.signOut().then( auth2.disconnect().then() )
      }
    }
  }

  const onLoginSuccess = async(res) => {
    var email = res.profileObj.email;
    if (email.split('@')[1] === "ku.th") {
      if (!user.isLogin) {
        initUser(res.profileObj);
      }
    } else {
      alert("Please use KU G-mail!");
      forceMyOwnLogout(res);
    }
  };

  const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
  };

  const onSignoutSuccess = () => {
    alert("You have been logged out successfully");
    setUser({
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
    navigate('/');
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
