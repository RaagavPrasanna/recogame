import {useState } from 'react';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import classes from './RegisterForm.module.css';

function RegisterForm({ onCancel, isValid }) {
  const [setUsername] = useState();
  const [setPassword] = useState();
  const [setEmail] = useState();
  const [setGameTags] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Modal onClick={onCancel}>
      <form className={classes.registerForm}>
        <Button> Log in with Steam</Button>
        <h2> Register </h2>
        <label> Username </label>
        <br />
        <input
          id="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <br />
        <label> Password </label>
        <br />
        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />
        <label> Email </label>
        <br />
        <input
          id="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <br />
        <label> Game Tags </label>
        <br />
        <input
          id="gameTags"
          type="text"
          onChange={(e) => setGameTags(e.target.value)}
          required
        />
        <br />
        <br />
        <label> Profile Picture </label>
        <br />
        <input
          id="profilePicture"
          type="file"
          accept="image/*"
          multiple="false"
        />
        <br />
        <br />
        <div>
          <Button onClick={() => handleSubmit()}> Register </Button>
          <Button onClick={() => onCancel()}>Cancel</Button>
        </div>
      </form>
      {/* <div>{isValid || 'Username must contain at least 4 characters.'}</div> */}
    </Modal>
  );
}

export default RegisterForm;
