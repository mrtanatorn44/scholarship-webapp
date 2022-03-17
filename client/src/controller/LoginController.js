/*eslint no-unused-vars:*/
import { useContext, useEffect } from 'react'
import { WebContext } from '../context/WebContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const { User, Content, Announce } = useContext(WebContext);
  const           [ user, setUser ] = User;

  useEffect(() => { 
    if (localStorage.getItem('isSignedIn') === 'true') {
      navigate('/main');
      // console.log(user.isLogin)
    } else  {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return null;
}

export default Login