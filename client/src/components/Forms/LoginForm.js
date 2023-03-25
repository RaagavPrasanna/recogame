import { useContext } from 'react';
import Modal from '../UI/Modal/Modal';
import classes from './LoginForm.module.css';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../store/user-context';
import { useTranslation } from 'react-i18next';


function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { t } = useTranslation();

  // const logout = async () => {
  //   const res = await fetch('/authentication/logout');
  //   // TODO: Redirect to home page on logout
  //   if(res.status === 200) {
  //     // eslint-disable-next-line no-alert
  //     alert('Logged out');
  //   } else {
  //     // eslint-disable-next-line no-alert
  //     alert('Failed to log out');
  //   }
  // };

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
      console.log('reached here');
      navigate('/firstLogin');
    } else {
      console.log('navigate /');
      navigate('/');
    }
  };

  const handleError = err => {
    console.error(err);
  };

  const handleSteam = async () => {
    // Must be changed in production
    // eslint-disable-next-line no-undef
    // window.location.replace(`${process.env.REACT_APP_HOST_URL}authentication/steam-auth/return`);
    window.location.replace(`${window.location.origin}/authentication/steam-auth/return`);
  };

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

export default LoginForm;
