// import Popup from 'reactjs-popup';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import classes from './GameList.module.css';
import { useState } from 'react';

function GameList() {
  const [show, setShow] = useState(false);
  const mockData = 'Game Name';

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
        <p> {mockData} </p>
        <Button onClick={handleShow}> Edit </Button>
        {show && (
          <Modal
            className={classes.buttonsModal}
            onClick={handleClose}
          >
            <Button> Remove </Button>
            <Button onClick={handleClose}> Cancel </Button>
          </Modal>
        )}
      </section>

      <h2> In progress</h2>

      <section>
        <p> {mockData} </p>
        <Button onClick={handleShow}> Edit </Button>
        {show && (
          <Modal
            className={classes.buttonsModal}
            onClick={handleClose}
          >
            <Button> Remove </Button>
            <Button onClick={handleClose}> Cancel </Button>
          </Modal>
        )}
      </section>

      <h2> Finished </h2>

      <section>
        <p> {mockData} </p>
        <Button onClick={handleShow}> Edit </Button>
        {show && (
          <Modal
            className={classes.buttonsModal}
            onClick={handleClose}
          >
            <Button> Remove </Button>
            <Button onClick={handleClose}> Cancel </Button>
          </Modal>
        )}
      </section>

      <h2> Completed 100% Achievements </h2>

      <section>
        <p> {mockData} </p>
        <Button onClick={handleShow}> Edit </Button>
        {show && (
          <Modal
            className={classes.buttonsModal}
            onClick={handleClose}
          >
            <Button> Remove </Button>
            <Button onClick={handleClose}> Cancel </Button>
          </Modal>
        )}
      </section>

      <h2> Never Played </h2>

      <section>
        <p> {mockData} </p>
        <Button onClick={handleShow}> Edit </Button>
        {show && (
          <Modal
            className={classes.buttonsModal}
            onClick={handleClose}
          >
            <Button> Remove </Button>
            <Button onClick={handleClose}> Cancel </Button>
          </Modal>
        )}
      </section>

    </div>
  );
}

export default GameList;
