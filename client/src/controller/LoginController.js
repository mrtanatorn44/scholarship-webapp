/*eslint no-unused-vars:*/
import { useContext, useEffect } from 'react'
import { WebContext } from '../context/WebContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const { User, Content, Announce } = useContext(WebContext);
  const           [ user, setUser ] = User;

  useEffect(() => { 
    /*
    // assign login sesion
    if (user.isLogin) {
      localStorage.setItem('isSignedIn', 'true');  // set isSignedIn session to true
      var today = new Date();
      var time = today.getHours() + ":" + today.getMinutes();
      var date = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
      localStorage.setItem('isSignedIn_ssTime', time+','+date);
    }

    // get user login session
    if (localStorage.getItem('isSignedIn') === 'true' && 'isSignedIn' in localStorage) {
      if ('isSignedIn_ssTime' in localStorage) {

        var today = new Date();
        var time = [today.getHours()*60, today.getMinutes()].reduce((a,b)=>a+b); // sum in minutes
        var date = [today.getDate(),  (today.getMonth()+1), today.getFullYear()];

        var sessionTime = localStorage.getItem('isSignedIn_ssTime');
        var sstime = sessionTime.split(',')[0].split(':').map(Number)[0]*60 + sessionTime.split(',')[0].split(':').map(Number)[1]  // sum in minutes
        var ssdate = sessionTime.split(',')[1].split('/').map(Number);
        //console.log('Login Session ' + sessionTime)

        // check session timeout
        if (date[0] > ssdate[0] || date[1] > ssdate[1] || date[2] > ssdate[2]) { // check if date today is over ss date
          console.log('Session Timeout - Date is Over!')
          localStorage.setItem('isSignedIn', 'false');
          localStorage.removeItem('isSignedIn_ssTime');
          navigate('/');
        } else if (time > sstime + 60) { // check if time today is over ss time
          console.log('Session Timeout - Time is Over!')
          localStorage.setItem('isSignedIn', 'false');
          localStorage.removeItem('isSignedIn_ssTime');
          navigate('/');
        }
      }

      if (window.location.pathname !== '/main') {
        navigate('/main');
      }
    } else  {
      if (window.location.pathname !== '/') {
        navigate('/');
      }
    }
    */

    // assign login sesion
    if (user.isLogin) {
      navigate('/main');
    } else {
      navigate('/');
    }

  }, [user])

  return null;
}

export default Login