// import Popup from 'reactjs-popup';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import classes from './GameList.module.css';
import { useState } from 'react';

function GameList() {
  const [show, setShow] = useState(false);
  function handleClose() {
    setShow(false);
  }
  function handleShow() {
    setShow(true);
  }

  return (
    <div className={classes.gameList}>
      <h2> Wishlist </h2>
      <section>
        Lorem ipsum dolor sit amet.
        <Button onClick={handleShow}> Edit </Button>
        {show && (
          <Modal visible={show} onClick={handleClose}>
            <Button> Remove </Button>
            <Button onClick={handleClose}> Cancel </Button>
          </Modal>
        )}
      </section>
      <h2> In progress</h2>

      <h2> Finished </h2>

      <h2> Completed 100% Achievements </h2>

      <h2> Never Played </h2>
    </div>
  );
}

export default GameList;
