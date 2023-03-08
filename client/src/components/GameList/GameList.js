// import Popup from 'reactjs-popup';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import classes from './GameList.module.css';
import { useState } from 'react';

function GameList() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={classes.gameList}>
      <br />
      <br />
      <br />
      <h3> Wishlist </h3>
      <section className={classes.card}>
        Lorem ipsum dolor sit amet.
        <Button onClick={handleShow}> Edit </Button>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Button onClick={handleClose}> Remove </Button>
          <Button onClick={handleClose}> Cancel </Button>
        </Modal>
      </section>
      <h3> In progress</h3>

      <h3> Finished </h3>

      <h3> Completed 100% Achievements </h3>

      <h3> Never Played </h3>
    </div>
  );
}

export default GameList;
