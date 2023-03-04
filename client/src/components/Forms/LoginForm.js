import { useState } from 'react';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import classes from './LoginForm.module.css';
import { GoogleLogin } from '@react-oauth/google';
// import { redirect } from "react-router-dom";

function LoginForm({ onCancel }) {
  const [setUsername] = useState();
  const [setPassword] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const logout = async () => {
    const res = await fetch('/authentication/logout');
    if(res.status === 200) {
      // eslint-disable-next-line no-alert
      alert('Logged out');
    } else {
      // eslint-disable-next-line no-alert
      alert('Failed to log out');
    }
  };

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
  };

  const handleError = err => {
    console.error(err);
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
        <Button onClick={logout}>Logout</Button>
        <div>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onSubmit={handleSubmit}>Sign In</Button>
        </div>
      </form>
    </Modal>
  );
}

export default LoginForm;
