import { useRef, useState } from 'react';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import classes from './LoginForm.module.css';

function LoginForm({ onCancel, isValid }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername('');
    setPassword('');
  };


  return (
    <Modal onClick={onCancel}>
      <form className={classes.loginForm} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>
          Username:
          <br />
          <input
            id="username"
            type="text"
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
            id="password"
            type="password"
            onChange={(p) => setUsername(p.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <div>
          {/* <div>{isValid || 'Username must contain at least 4 characters.'}</div> */}
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit">Sign In</Button>
        </div>
      </form>
    </Modal>
  );
}

export default LoginForm;
