import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useNavigate, Navigate } from 'react-router-dom';
import gmail from '../images/gmail.png';
import './Login.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Login() {

  
  const navigate = useNavigate();
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);

 
  var forceMyOwnLogout = ((response) => {
    //cookie.remove('MyGoogleID', { path: '/' })
    if (window.gapi) {
      const auth2 = window.gapi.auth2.getAuthInstance()
      if (auth2 != null) {
        auth2.signOut().then(
          auth2.disconnect().then(this.props.onLogoutSuccess)
        )
      }
    }
    this.forceUpdate()
  })

  const onLoginSuccess = async(res) => {
    
    var email = res.profileObj.email;
    if (email.split('@')[1] === "ku.th") {
      //console.log('Login Success:', res.profileObj);
      setShowloginButton(false);
      setShowlogoutButton(true);
      navigate('/main');
    } else {
      alert("Please use KU G-mail!");
      forceMyOwnLogout(res);
      if (res === undefined) {
        console.log('Wrong email-domain, loging out...');
      }
    }
  };

  const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
  };

  const onSignoutSuccess = () => {
    alert("You have been logged out successfully");
    console.clear();
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
