import { useState } from 'react';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import classes from './GameList.module.css';

function GameList({ onCancel }) {
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={classes.gameList}>
      <br />
      <br />
      <br />
      <h3> Wishlist </h3>
      <section className={classes.card}>
        <p>Lorem ipsum dolor sit amet.</p>
        <Button onClick={showModal}> Edit </Button>
        <Modal onClick={hideModal}>
          <Button> Remove </Button>
          <Button onClick={onCancel}> Cancel </Button>
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
