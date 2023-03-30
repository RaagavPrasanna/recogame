import { useContext } from 'react';
import Modal from '../UI/Modal/Modal';
import classes from './LoginForm.module.css';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, Navigate } from 'react-router-dom';
import UserContext from '../../store/user-context';
import { useTranslation } from 'react-i18next';


function LoginForm() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { t } = useTranslation();


  // Handle login with Google
  const handleLogin = async googleData => {
    const res = await fetch('/authentication/google-auth', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.credential
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    console.log(data);

    setUser({ ...data });

    if(data.firstLogin) {
      navigate('/firstLogin');
    } else {
      navigate('/');
    }
  };

  const handleError = err => {
    console.error(err);
  };

  // Handle login with Steam
  const handleSteam = async () => {
    // Must be changed in production
    // eslint-disable-next-line no-undef
    // window.location.replace(`${process.env.REACT_APP_HOST_URL}authentication/steam-auth/return`);
    window.location.replace(`${window.location.origin}/authentication/steam-auth/return`);
  };

  const content = () => {
    if(user !== null) {
      return (<Navigate to="/"/>);
    } else {
      return (
        <Modal>
          <form className={classes.loginForm}>
            <h2>{t('Log In')}</h2>
            <br />
            <div className={classes.loginBtn}>
              <span>
                <GoogleLogin onSuccess={handleLogin} onError={handleError} />
              </span>
              <span>
                <img
                  src="https://community.cloudflare.steamstatic.com/public/images/signinthroughsteam/sits_01.png"
                  onClick={handleSteam}
                />
              </span>
            </div>
          </form>
        </Modal>
      );
    }
  };

  return (
    <>
      {content()}
    </>
  );
}

export default LoginForm;
