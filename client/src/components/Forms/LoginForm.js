import { useState, useContext } from 'react';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import classes from './LoginForm.module.css';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../store/user-context';

function LoginForm({ onCancel }) {
  const [setUsername] = useState();
  const [setPassword] = useState();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
    const tres = await fetch('/authentication/csrf-token');
    const tdata = await tres.json();
    console.log(tdata);

    setUser({ ...data });

    navigate('/');
  };

  const handleError = err => {
    console.error(err);
  };

  const handleSteam = async () => {
    // Must be changed in production
    // eslint-disable-next-line no-undef
    window.location.replace(`${process.env.REACT_APP_HOST_URL}authentication/steam-auth/return`);
  };

  return (
    <Modal onClick={onCancel}>
      <form className={classes.loginForm}>
        <h2>Login</h2>
        <label>
          Username:
          <br />
          <input
            id='username'
            type='text'
            onChange={(u) => setUsername(u.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Password:
          <br />
          <input
            id='password'
            type='password'
            onChange={(p) => setPassword(p.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <GoogleLogin onSuccess={handleLogin} onError={handleError}/>
        <br />
        <br />
        {/* eslint-disable-next-line max-len */}
        <img src='https://community.cloudflare.steamstatic.com/public/images/signinthroughsteam/sits_01.png' onClick={handleSteam}/>
        <div>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onSubmit={handleSubmit}>Sign In</Button>
        </div>
      </form>
    </Modal>
  );
}

export default LoginForm;
